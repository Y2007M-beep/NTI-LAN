# NTI Lanet — run doc

Vite + React 18 landing page for the NTI Lanet school LAN event. No backend, no env files.

## Reproduce artifacts

Nothing to copy — there are no `.env*` files or generated secrets in this project.

Install dependencies with npm (plain `npm` project, has `package-lock.json`):

```bash
npm install
```

## Run the dev server

Default Vite port is **5173** (use `--strictPort` so a stale server is noticed instead of silently shifting ports):

```bash
npm run dev -- --port 5173 --strictPort
```

- URL: http://localhost:5173/
- Production check (optional): `npm run build && npm run preview`

## Notes

- WebGL is used by two background components (`PixelBlast` on the hero, `FaultyTerminal` in the "Om eventet" section) — view in a normal browser window, not headless without GPU.
- Preview registration on Windows uses the PowerShell `Start-Process` detach recipe; stdout/stderr must go to separate log files (`.log` and `.log.err`).
