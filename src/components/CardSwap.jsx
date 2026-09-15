import { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (index, distanceX, distanceY, total) => ({
  x: index * distanceX,
  y: -index * distanceY,
  z: -index * distanceX * 1.5,
  zIndex: total - index
});

const placeNow = (element, slot, skew) => {
  gsap.set(element, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });
};

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config = easing === 'elastic'
    ? { ease: 'elastic.out(0.6,0.9)', durDrop: 2, durMove: 2, durReturn: 2, promoteOverlap: 0.9, returnDelay: 0.05 }
    : { ease: 'power1.inOut', durDrop: 0.8, durMove: 0.8, durReturn: 0.8, promoteOverlap: 0.45, returnDelay: 0.2 };
  const childArr = useMemo(() => Children.toArray(children), [children]);
  const stableRefs = useRef([]);
  const order = useRef(Array.from({ length: childArr.length }, (_, index) => index));
  const timeline = useRef(null);
  const interval = useRef(null);
  const container = useRef(null);

  if (stableRefs.current.length !== childArr.length) {
    stableRefs.current = childArr.map((_, index) => stableRefs.current[index] || { current: null });
  }

  useEffect(() => {
    const total = stableRefs.current.length;
    stableRefs.current.forEach((ref, index) => placeNow(ref.current, makeSlot(index, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const frontElement = stableRefs.current[front].current;
      const animation = gsap.timeline();
      timeline.current = animation;

      animation.to(frontElement, { y: '+=500', duration: config.durDrop, ease: config.ease });
      animation.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((index, position) => {
        const element = stableRefs.current[index].current;
        const slot = makeSlot(position, cardDistance, verticalDistance, total);
        animation.set(element, { zIndex: slot.zIndex }, 'promote');
        animation.to(element, { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease }, `promote+=${position * 0.15}`);
      });

      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
      animation.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      animation.call(() => gsap.set(frontElement, { zIndex: backSlot.zIndex }), undefined, 'return');
      animation.to(frontElement, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: config.durReturn, ease: config.ease }, 'return');
      animation.call(() => { order.current = [...rest, front]; });
    };

    swap();
    interval.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => { timeline.current?.pause(); window.clearInterval(interval.current); };
      const resume = () => { timeline.current?.play(); interval.current = window.setInterval(swap, delay); };
      node?.addEventListener('mouseenter', pause);
      node?.addEventListener('mouseleave', resume);
      return () => {
        node?.removeEventListener('mouseenter', pause);
        node?.removeEventListener('mouseleave', resume);
        window.clearInterval(interval.current);
      };
    }

    return () => {
      window.clearInterval(interval.current);
      timeline.current?.kill();
    };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, index) => isValidElement(child)
    ? cloneElement(child, {
        key: index,
        ref: stableRefs.current[index],
        style: { width, height, ...(child.props.style ?? {}) },
        onClick: event => {
          child.props.onClick?.(event);
          onCardClick?.(index);
        }
      })
    : child);

  return <div ref={container} className="card-swap-container" style={{ width, height }}>{rendered}</div>;
};

export default CardSwap;
