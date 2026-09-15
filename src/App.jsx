import { useEffect, useRef, useState } from 'react';
import CardNav from './components/CardNav';
import CardSwap, { Card } from './components/CardSwap';
import PixelBlast from './components/PixelBlast';
import logo from './logo.png';
import FaultyTerminal from './components/FaultyTerminal';

const items = [
  {
    label: 'Om eventet',
    href: '#om-eventet',
    bgColor: '#082b68',
    textColor: '#f1efe4',
    links: [
      { label: 'Vad händer?', ariaLabel: 'Vad händer på eventet?', href: '#vad-hander' },
      { label: 'Tid och plats', ariaLabel: 'Tid och plats för eventet', href: '#tid-plats' }
    ]
  },
  {
    label: 'Aktiviteter',
    href: '#aktiviteter',
    bgColor: '#cbd9f1',
    textColor: '#082b68',
    links: [
      { label: 'Gaming', ariaLabel: 'Gaming på eventet', href: '#gaming' },
      { label: 'Board Games', ariaLabel: 'Board Games på eventet', href: '#board-games' }
    ]
  },
  {
    label: 'Biljetter',
    href: '#biljetter',
    bgColor: '#ffdf68',
    textColor: '#082b68',
    links: [
      { label: 'Köp biljett', ariaLabel: 'Köp biljett till NTI Lanet', href: '#kop-biljett' },
      { label: 'Vanliga frågor', ariaLabel: 'Vanliga frågor om biljetter', href: '#vanliga-fragor' }
    ]
  }
];

const getTimeLeft = () => {
  const difference = new Date(2027, 1, 12) - new Date();

  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

const useRevealOnScroll = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    const targets = rootRef.current?.querySelectorAll('[data-reveal]');
    if (!targets?.length) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return rootRef;
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="countdown" aria-label="Nedräkning till 12 februari 2027">
      <span><strong>{timeLeft.days}</strong><small>dagar</small></span>
      <span><strong>{String(timeLeft.hours).padStart(2, '0')}</strong><small>tim</small></span>
      <span><strong>{String(timeLeft.minutes).padStart(2, '0')}</strong><small>min</small></span>
      <span><strong>{String(timeLeft.seconds).padStart(2, '0')}</strong><small>sek</small></span>
    </div>
  );
};

const App = () => {
  const rootRef = useRevealOnScroll();

  return (
    <main className="app-shell" ref={rootRef}>
    <PixelBlast
      className="nti-pixel-blast"
      variant="square"
      pixelSize={5}
      color="#041b4f"
      patternScale={3}
      patternDensity={1.05}
      pixelSizeJitter={0.35}
      enableRipples
      rippleSpeed={0.4}
      rippleThickness={0.12}
      rippleIntensityScale={1.5}
      liquid
      liquidStrength={0.12}
      liquidRadius={1.2}
      liquidWobbleSpeed={5}
      speed={0.85}
      edgeFade={0}
      transparent
    />
    <CardNav
      logo={logo}
      logoAlt="NTI Gymnasiet logo"
      items={items}
      baseColor="#f1efe4"
      menuColor="#082b68"
      buttonBgColor="#082b68"
      buttonTextColor="#f1efe4"
      ease="power3.out"
    />

    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="eyebrow">NTI Gymnasiet presenterar</p>
        <div className="hero-title-wrap">
          <h1 id="hero-title">NTI<br /><span>Lanet</span></h1>
          <div className="title-stars" aria-hidden="true">
            <span>✦</span><span>✦</span><span>✦</span><span>✦</span>
            <span>✦</span><span>✦</span><span>✦</span><span>✦</span>
          </div>
        </div>
        <p className="hero-meta">Fredag 12 februari 2027 · skolans lokaler</p>
        <p className="hero-copy">En kväll på skolan fylld med gaming, biljard, tävlingar och skönt häng. Ta med kompisarna och kom och ha kul.</p>
        <div className="hero-actions">
          <a className="button ticket-button primary-button" href="#kop-biljett" data-tooltip="40/40">
            <div className="button-wrapper">
              <div className="text">Köp biljett</div>
              <span className="icon icon--cart" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" />
                  <path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" />
                  <circle cx="18" cy="20" r="2" />
                  <circle cx="8" cy="20" r="2" />
                </svg>
              </span>
            </div>
          </a>
            <a className="secondary-button" href="#vad-hander">Läs mer</a>
        </div>
      </div>
      <div className="card-swap-stage" aria-label="Aktiviteter på NTI Lanet">
        <CardSwap width={560} height={420} cardDistance={60} verticalDistance={70} delay={7500}>
          <Card customClass="swap-card swap-card--navy">
            <span className="swap-card-kicker">NTI LANET</span>
            <span className="pixel-game-icon" aria-label="Gaming och biljard">8</span>
            <span className="swap-card-date">12 februari 2027 · NTI Gymnasiet Eskilstuna</span>
            <h2>En kväll att minnas.</h2>
            <p>Gaming, biljard och aktiviteter tillsammans med hela skolan.</p>
            <a className="swap-card-link" href="#aktiviteter">Läs mer <span aria-hidden="true">→</span></a>
          </Card>
          <Card customClass="swap-card swap-card--yellow">
            <span className="swap-card-kicker">AKTIVITETER</span>
            <div className="game-preview" aria-label="Spel som går att rösta på">
              <span>FORTNITE</span>
              <span>BRAWLHALLA</span>
              <span>FC</span>
              <span>MARVEL RIVALS</span>
              <span>CS</span>
            </div>
            <p>Rösta på vilket spel som ska köras i tävlingen. Röstningen stänger fredag 18:00.</p>
            <div className="vote-status" aria-label="Aktuell röstningsstatus">
              <span>1204 röster hittills</span>
              <span>Leder just nu: Fortnite</span>
            </div>
            <div className="vote-breakdown" aria-label="Ungefärlig fördelning mellan spelen">
              <div className="vote-breakdown-bar" aria-hidden="true">
                <span className="vote-breakdown-segment vote-breakdown-segment--fortnite" />
                <span className="vote-breakdown-segment vote-breakdown-segment--brawlhalla" />
                <span className="vote-breakdown-segment vote-breakdown-segment--fc" />
                <span className="vote-breakdown-segment vote-breakdown-segment--marvel" />
                <span className="vote-breakdown-segment vote-breakdown-segment--cs" />
              </div>
              <div className="vote-breakdown-legend">
                <span>FORTNITE 42%</span>
                <span>BRAWLHALLA 22%</span>
                <span>FC 16%</span>
                <span>MARVEL 12%</span>
                <span>CS 8%</span>
              </div>
            </div>
            <a className="vote-now-button" href="#aktiviteter" aria-label="Visa aktiviteter på eventet">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36" aria-hidden="true">
                <rect width="36" height="36" x="0" y="0" fill="#fdd835" />
                <path fill="#e53935" d="M38.67 42H11.52C11.27 40.62 11 38.57 11 36c0-5 0-11 0-11s1.44-7.39 3.22-9.59c1.67-2.06 2.76-3.48 6.78-4.41 3-.7 7.13-.23 9 1 2.15 1.42 3.37 6.67 3.81 11.29 1.49-.3 5.21.2 5.5 1.28C40.89 30.29 39.48 38.31 38.67 42z" />
                <path fill="#b71c1c" d="M39.02 42H11.99c-.22-2.67-.48-7.05-.49-12.72.83 4.18 1.63 9.59 6.98 9.79 3.48.12 8.27.55 9.83-2.45 1.57-3 3.72-8.95 3.51-15.62-.19-5.84-1.75-8.2-2.13-8.7.59.66 3.74 4.49 4.01 11.7.03.83.06 1.72.08 2.66 4.21-.15 5.93 1.5 6.07 2.35C40.68 33.85 39.8 38.9 39.02 42z" />
                <path fill="#212121" d="M35 27.17c0 3.67-.28 11.2-.42 14.83h-2c.14-3.58.42-11.17.42-14.83 0-5.54-1.46-12.65-3.55-14.02-1.65-1.08-5.49-1.48-8.23-.85-3.62.83-4.57 1.99-6.14 3.92L15 16.32c-1.31 1.6-2.59 6.92-3 8.96v10.8c0 2.58.28 4.61.54 5.92H10.5c-.25-1.41-.5-3.42-.5-5.92l.02-11.09c.15-.77 1.55-7.63 3.43-9.94l.08-.09c1.65-2.03 2.96-3.63 7.25-4.61 3.28-.76 7.67-.25 9.77 1.13C33.79 13.6 35 22.23 35 27.17z" />
                <path fill="#01579b" d="M17.165 17.283c5.217-.055 9.391.283 9 6.011-.391 5.728-8.478 5.533-9.391 5.337-.913-.196-7.826-.043-7.696-5.337.131-5.294 4.567-5.974 8.087-6.011z" />
                <path fill="#212121" d="M40.739 37.38c-.28 1.99-.69 3.53-1.22 4.62h-2.43c.25-.19 1.13-1.11 1.67-4.9.57-4-.23-11.79-.93-12.78-.4-.4-2.63-.8-4.37-.89l.1-1.99c1.04.05 4.53.31 5.71 1.49.82 1.43 1.42 10.6.87 14.45z" />
                <path fill="#81d4fa" d="M10.154 20.201c.261 2.059-.196 3.351 2.543 3.546s8.076 1.022 9.402-.554c1.326-1.576 1.75-4.365-.891-5.267-1.872-.639-8.249-1.675-11.054 2.275z" />
                <path fill="#212121" d="M17.615 29.677c-.502 0-.873-.03-1.052-.069-.086-.019-.236-.035-.434-.06-5.344-.679-8.053-2.784-8.052-6.255.001-2.698 1.17-7.238 8.986-7.32l.181-.002c3.444-.038 6.414-.068 8.272 1.818 1.173 1.191 1.712 3 1.647 5.53-.044 1.688-.785 3.147-2.144 4.217-2.234 1.76-5.631 2.141-7.404 2.141zM17.086 17.973c-7.006.074-7.008 4.023-7.008 5.321-.001 3.109 3.598 3.926 6.305 4.27.273.035.48.063.601.089.563.101 4.68.035 6.855-1.732.865-.702 1.299-1.57 1.326-2.653.051-1.958-.301-3.291-1.073-4.075-1.262-1.281-3.834-1.255-6.825-1.222l-.181.002z" />
                <path fill="#e1f5fe" d="M15.078 19.043c1.957-.326 5.122-.529 4.435 1.304-.489 1.304-7.185 2.185-7.185.652 0-1.532 2.75-1.956 2.75-1.956z" />
              </svg>
              <span className="now">NU!!</span>
              <span className="play">Gå till röstningen →</span>
            </a>
          </Card>
          <Card customClass="swap-card swap-card--light">
            <span className="swap-card-kicker">BILJETTER</span>
            <a className="vote-now-button" href="#aktiviteter" aria-label="Visa aktiviteter på eventet">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36" aria-hidden="true">
                <rect width="36" height="36" x="0" y="0" fill="#fdd835" />
                <path fill="#e53935" d="M38.67 42H11.52C11.27 40.62 11 38.57 11 36c0-5 0-11 0-11s1.44-7.39 3.22-9.59c1.67-2.06 2.76-3.48 6.78-4.41 3-.7 7.13-.23 9 1 2.15 1.42 3.37 6.67 3.81 11.29 1.49-.3 5.21.2 5.5 1.28C40.89 30.29 39.48 38.31 38.67 42z" />
                <path fill="#b71c1c" d="M39.02 42H11.99c-.22-2.67-.48-7.05-.49-12.72.83 4.18 1.63 9.59 6.98 9.79 3.48.12 8.27.55 9.83-2.45 1.57-3 3.72-8.95 3.51-15.62-.19-5.84-1.75-8.2-2.13-8.7.59.66 3.74 4.49 4.01 11.7.03.83.06 1.72.08 2.66 4.21-.15 5.93 1.5 6.07 2.35C40.68 33.85 39.8 38.9 39.02 42z" />
                <path fill="#212121" d="M35 27.17c0 3.67-.28 11.2-.42 14.83h-2c.14-3.58.42-11.17.42-14.83 0-5.54-1.46-12.65-3.55-14.02-1.65-1.08-5.49-1.48-8.23-.85-3.62.83-4.57 1.99-6.14 3.92L15 16.32c-1.31 1.6-2.59 6.92-3 8.96v10.8c0 2.58.28 4.61.54 5.92H10.5c-.25-1.41-.5-3.42-.5-5.92l.02-11.09c.15-.77 1.55-7.63 3.43-9.94l.08-.09c1.65-2.03 2.96-3.63 7.25-4.61 3.28-.76 7.67-.25 9.77 1.13C33.79 13.6 35 22.23 35 27.17z" />
                <path fill="#01579b" d="M17.165 17.283c5.217-.055 9.391.283 9 6.011-.391 5.728-8.478 5.533-9.391 5.337-.913-.196-7.826-.043-7.696-5.337.131-5.294 4.567-5.974 8.087-6.011z" />
                <path fill="#212121" d="M40.739 37.38c-.28 1.99-.69 3.53-1.22 4.62h-2.43c.25-.19 1.13-1.11 1.67-4.9.57-4-.23-11.79-.93-12.78-.4-.4-2.63-.8-4.37-.89l.1-1.99c1.04.05 4.53.31 5.71 1.49.82 1.43 1.42 10.6.87 14.45z" />
                <path fill="#81d4fa" d="M10.154 20.201c.261 2.059-.196 3.351 2.543 3.546s8.076 1.022 9.402-.554c1.326-1.576 1.75-4.365-.891-5.267-1.872-.639-8.249-1.675-11.054 2.275z" />
                <path fill="#212121" d="M17.615 29.677c-.502 0-.873-.03-1.052-.069-.086-.019-.236-.035-.434-.06-5.344-.679-8.053-2.784-8.052-6.255.001-2.698 1.17-7.238 8.986-7.32l.181-.002c3.444-.038 6.414-.068 8.272 1.818 1.173 1.191 1.712 3 1.647 5.53-.044 1.688-.785 3.147-2.144 4.217-2.234 1.76-5.631 2.141-7.404 2.141zM17.086 17.973c-7.006.074-7.008 4.023-7.008 5.321-.001 3.109 3.598 3.926 6.305 4.27.273.035.48.063.601.089.563.101 4.68.035 6.855-1.732.865-.702 1.299-1.57 1.326-2.653.051-1.958-.301-3.291-1.073-4.075-1.262-1.281-3.834-1.255-6.825-1.222l-.181.002z" />
                <path fill="#e1f5fe" d="M15.078 19.043c1.957-.326 5.122-.529 4.435 1.304-.489 1.304-7.185 2.185-7.185.652 0-1.532 2.75-1.956 2.75-1.956z" />
              </svg>
              <span className="now">NU!!</span>
              <span className="play">RÖSTA</span>
            </a>
            <h2>Din biljett väntar.</h2>
            <Countdown />
            <p>Köp din biljett idag och säkra din plats på skolans roligaste kväll.</p>
            <a className="swap-card-link swap-card-link--light" href="#kop-biljett">Köp biljett <span aria-hidden="true">→</span></a>
          </Card>
        </CardSwap>
      </div>
    </section>
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map(copy => (
          <div className="marquee-chunk" key={copy}>
            {['NTI LANET', '12 FEB 2027', 'GAMING', 'BILJARD', 'TÄVLINGAR', 'BOARD GAMES', 'SNACKS', 'HÄNG'].map(word => (
              <span className="marquee-word" key={word}>{word} <i aria-hidden="true">✦</i></span>
            ))}
          </div>
        ))}
      </div>
    </div>
    <section id="om-eventet" className="event-info" aria-labelledby="event-info-title">
      <FaultyTerminal
        className="faulty-terminal-background"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        tint="#ffdf68"
        brightness={1.6}
        scanlineIntensity={0.22}
        digitSize={1.5}
        timeScale={0.3}
        mouseReact
        mouseStrength={0.14}
        curvature={0.12}
        dither={0.4}
      />
      <div className="event-info-inner">
        <p className="event-info-label">OM EVENTET</p>
        <h2 id="event-info-title">Allt om NTI Lanet.</h2>
        <p className="event-info-intro">Skrolla mellan sektionerna för att läsa om eventet, aktiviteterna och biljetterna.</p>
        <div id="aktiviteter" className="event-info-grid">
          <article id="vad-hander" className="event-info-card event-info-card--cream" data-reveal>
            <span className="event-info-number">01</span>
            <span className="event-info-icon" aria-hidden="true">✦</span>
            <h3>Vad händer?</h3>
            <p>Ta med kompisarna till en kväll fylld med gaming, biljard, tävlingar och skönt häng.</p>
            <ul>
              <li>Gaming och turneringar</li>
              <li>Biljard och andra aktiviteter</li>
              <li>Musik, snacks och gemenskap</li>
            </ul>
          </article>
          <article id="tid-plats" className="event-info-card event-info-card--yellow" data-reveal>
            <span className="event-info-number">02</span>
            <span className="event-info-icon" aria-hidden="true">◷</span>
            <h3>Tid och plats</h3>
            <dl className="event-info-details">
              <div><dt>DATUM</dt><dd>Fredag 12 februari 2027</dd></div>
              <div><dt>PLATS</dt><dd>skolans lokaler</dd></div>
              <div><dt>TID</dt><dd>18:00 tills kvällen är slut</dd></div>
            </dl>
            <p>Glöm inte biljett och ta gärna med en kompis.</p>
          </article>
          <article id="gaming" className="event-info-card event-info-card--cream" data-reveal>
            <span className="event-info-number">03</span>
            <span className="event-info-icon" aria-hidden="true">▣</span>
            <h3>Gaming</h3>
            <p>Ta plats vid skärmen och tävla i turneringar tillsammans med andra under LAN-kvällen.</p>
          </article>
          <article id="board-games" className="event-info-card event-info-card--yellow" data-reveal>
            <span className="event-info-number">04</span>
            <span className="event-info-icon" aria-hidden="true">◆</span>
            <h3>Board Games</h3>
            <p>Utmana dina kompisar i pingis, biljard, schack, brädspel, Uno och kortspel.</p>
          </article>
        </div>
      </div>
    </section>
    <section id="biljetter" className="ticket-section" aria-labelledby="tickets-title">
      <div id="kop-biljett" className="ticket-section-inner">
        <p className="event-info-label">BILJETTER</p>
        <h2 id="tickets-title">Säkra din plats.</h2>
        <p>Biljetten kostar 40 kr och ger dig tillgång till hela LAN-kvällen.</p>
        <button className="primary-button" type="button">Köp biljett för 40 kr</button>
      </div>
    </section>
    <section id="vanliga-fragor" className="faq-section" aria-labelledby="faq-title">
      <div className="ticket-section-inner">
        <p className="event-info-label">VANLIGA FRÅGOR</p>
        <h2 id="faq-title">Bra att veta.</h2>
        <dl className="faq-list">
          <div><dt><span className="faq-question-icon" aria-hidden="true">+</span><span>När är eventet?</span></dt><dd>Fredag 12 februari 2027 från klockan 18:00.</dd></div>
          <div><dt><span className="faq-question-icon" aria-hidden="true">+</span><span>Var hålls det?</span></dt><dd>På skolans lokaler.</dd></div>
          <div><dt><span className="faq-question-icon" aria-hidden="true">+</span><span>Vad kostar biljetten?</span></dt><dd>Biljetten kostar 40 kr.</dd></div>
          <div><dt><span className="faq-question-icon" aria-hidden="true">+</span><span>Hur anmäler jag mig till turneringarna?</span></dt><dd>Efter att du köpt din biljett kan du rösta på vilket spel som ska ha turnering. Två veckor innan eventet öppnar anmälan till turneringen i det spel som vann röstningen.</dd></div>
          <div><dt><span className="faq-question-icon" aria-hidden="true">+</span><span>Finns det priser att vinna?</span></dt><dd>Ja, det kommer finnas priser till vinnarna i turneringarna.</dd></div>
          <div><dt><span className="faq-question-icon" aria-hidden="true">+</span><span>Vilka regler gäller under kvällen?</span></dt><dd>Fair play gäller alltid – var rädd om skolans lokaler och utrustning, och lämna platsen som du hittade den.</dd></div>
          <div><dt><span className="faq-question-icon" aria-hidden="true">+</span><span>Får jag ta med mat och dryck?</span></dt><dd>Egen mat och dryck är okej, men vi bjuder också på snacks under kvällen.</dd></div>
          <div><dt><span className="faq-question-icon" aria-hidden="true">+</span><span>Vad händer om jag inte kan komma?</span></dt><dd>Biljetten är personlig och går tyvärr inte att återbetala, men du får gärna ge den till en kompis.</dd></div>
        </dl>
      </div>
    </section>
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <img src={logo} alt="NTI Gymnasiet logo" className="site-footer-logo" />
          <span className="site-footer-name">NTI Gymnasiet Eskilstuna</span>
        </div>
        <p className="site-footer-tagline">En kväll med gaming, biljard och skönt häng – vi ses på LAN-et!</p>
        <nav className="site-footer-nav" aria-label="Sidfotsnavigering">
          <a href="#om-eventet">Om eventet</a>
          <a href="#aktiviteter">Aktiviteter</a>
          <a href="#biljetter">Biljetter</a>
          <a href="#vanliga-fragor">Vanliga frågor</a>
        </nav>
        <p className="site-footer-copy">© 2027 NTI Lanet · Alla rättigheter förbehållna</p>
        <a
          className="site-footer-top"
          href="#topp"
          aria-label="Till toppen av sidan"
          onClick={event => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Till toppen ↑
        </a>
      </div>
    </footer>
    </main>
  );
};

export default App;
