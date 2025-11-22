# Repository Guidelines

## Project Structure & Module Organization
- Entry is `App.js`, which wires the `SelectionProvider` context and the native stack shown under `modules/`.
- Screens live in `modules/<feature>/<Feature>Screen.js` (e.g., `modules/cart/CartScreen.js`). Keep any helper components, data loaders, or styles co-located so each feature folder can be reasoned about on its own.
- Design specs come from `html_template/` (e.g., `html_template/cart.html` or `html_template/tap_card.html`). Translate those layouts into the screens, copy referenced assets into `assets/`, and wire navigation from customer-type → tap-card/guest flows to cart or selection flows.
- Shared data such as vehicles and soap options live in `config/vehicle-soap.json` with static assets resolved via `config/vehicle-soap.config.js`; always import through that layer so screens receive `assetSource`, `title`, and `subtitle` values ready for rendering.

## Build, Test, and Development Commands
- `npm install`: refresh dependencies after cloning or editing `package.json` / lock files.
- `npm start`: launches Expo’s Metro bundler plus QR code for device or emulator testing.
- `npm run android` / `npm run ios`: builds and deploys the experience to a connected device or simulator through Expo CLI.
- `npm run web`: spins up the Expo web target for quick browser verification of responsive tweaks.
- Rerun the relevant command after JavaScript or asset pushes to spot bundler warnings before committing.

## Coding Style & Naming Conventions
- Use two-space indentation, trailing commas on multi-line literals, and keep per-component `StyleSheet.create` definitions at the bottom of the same file.
- Screen components and their files use PascalCase (e.g., `SelectVehicleScreen.js`), while hooks/utilities use camelCase. Prefer descriptive names for styles, handlers, and constants, and hoist shared values (colors, spacing) when they reoccur.
- Keep the React Navigation stack inside `App.js` minimal; expose logics such as `SelectionProvider` from `modules/select-base/SelectionContext.js`.
- Assets referenced in config should live under `assets/` and be required through `config/vehicle-soap.config.js` so bundling stays static.

## Testing Guidelines
- No automated test suite yet; rely on `npm start` for manual validation on device/simulator and follow the story from customer type → tap card → cart → selection screens.
- If tests are later added, name them `<Feature>Screen.test.js` next to their component and run them through the chosen test runner (e.g., `jest` with `npm test` once configured).

## Commit & Pull Request Guidelines
- Favor imperative commit messages like `Add select vehicle flow` or `Align cart cards’ spacing` and link tickets when available.
- PRs should summarize the UI changes, list the key screens touched, mention manual test steps (Expo run command + navigation path), and include screenshots for any layout updates.
