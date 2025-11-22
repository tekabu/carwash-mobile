# Repository Guidelines

## Project Structure & Module Organization
- The Expo entry point is `App.js` at the repository root; keep it lightweight and import navigation/form modules from `modules`.
- Feature folders live under `modules/<feature>` (e.g., `modules/home/HomeScreen.js` or `modules/cart/CartScreen.js`). Each folder should own its screen component plus helpers and use PascalCase filenames.
- Designs originate from `/html_template`, such as `html_template/cart.html`; translate those layouts into screens, copy any referenced assets into `assets`, and ensure guest users from `modules/customer-type` land in the new `modules/cart` flow.
- Native directories like `android` are Orleans-managed outputs—avoid manual edits unless the project ejects from Expo.

## Build, Test, and Development Commands
- `npm install`: (re)installs dependencies after `package.json` changes or when bootstrapping a clone.
- `npm start`: launches the Expo Metro bundler and QR code for device testing.
- `npm run android` / `npm run ios`: build and deploy the current bundle to connected devices/emulators through Expo.
- `npm run web`: runs the Expo web build via Webpack for browser checks.
- Re-run the relevant command after each change to refresh the bundle and spot bundler warnings.

## Coding Style & Naming Conventions
- Use two-space indentation and trailing commas on multi-line objects for compact diffs.
- Screen components and their files stay in PascalCase (e.g., `HomeScreen.js`), while helper functions use camelCase and constants use uppercase snake (e.g., `BUTTON_COLOR`).
- Keep per-component styles near the component (e.g., `StyleSheet.create` at the bottom) and group shared assets inside `assets` or module folders.

## Testing Guidelines
- There is no automated test suite yet; rely on `npm start` plus manual walkthroughs of each module.
- Should tests be introduced later, follow the `<Feature>Screen.test.js` naming pattern, co-locate with the component, and run them through the chosen framework (e.g., `jest`).

## Commit & Pull Request Guidelines
- Prefer imperative commit messages such as `Add customer-type screen` and include issue references when available; the current history shows brief entries like `ok home page`, so aim for slightly more descriptive text.
- PRs should include a short summary, steps to reproduce or verify changes, and screenshots or recordings when UI updates are involved.
