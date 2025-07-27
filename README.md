# horse-racing-game

This project is a simple horse-racing-game written in Vue.js 3 and TypeScript. It display a list of 20 horses and allows you to generate a race schedule with 6 rounds and 10 random horses in each round . A race schedule consisting of 6 rounds is created upon clicking the "Generate Program" button. When the Start button is clicked, the race starts, and the horses move based on their conditions. The results for each round are displayed on the right side of the screen. The race ends when all horses have finished their races.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
