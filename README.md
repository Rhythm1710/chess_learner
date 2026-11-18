# Chess Learner

A mobile chess study app. Review a game, keep a weekly plan on this phone, and practice moves on a board that fits the screen.

Names and figures in the sample screens are example data.

## Requirements

- Node.js 22 or newer

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The layout is designed for a 390px-wide phone. `viewport-fit=cover` is set, and the shell pads with `env(safe-area-inset-*)`. The draft status bar and home indicator are not drawn.

## Checks

```bash
npm run lint
npm test
npm run build
```

GitHub Actions runs lint, Vitest, and `next build` on pull requests and on pushes to `main`.

## Install

```bash
npm run build
npm start
```

The production build serves a web app manifest, home-screen icons, and a small service worker. Add Chess Learner from the browser’s install menu.

## Credits

Rules come from [chess.js](https://github.com/jhlywa/chess.js), which is BSD-2-Clause. The piece artwork is the CBurnett Staunton set, public domain, recolored for this app.

## Type

Instrument Sans is loaded as a variable font, so the theme tag can use the approved weight 550. No approved mobile style uses 650. IBM Plex Mono is loaded at 400, 500, and 600. Instrument Serif is 400.
