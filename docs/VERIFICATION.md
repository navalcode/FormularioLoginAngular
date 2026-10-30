# Verification

Checked on 30 October 2026 on macOS, with an isolated Node 14.21.3 x64/npm 6 toolchain and a real browser attached to Karma. The original lockfile and dependency versions are unchanged.

```sh
npm ci
npm test -- --watch=false --karma-config karma.manual.conf.js
# Attach a browser to http://127.0.0.1:9878/ when Karma prints its address.
npm run build -- --configuration production
```

The final **20 Jasmine tests pass**: 18 integrated form cases and two language-control cases. They cover empty/malformed input, correction, first-error focus, password visibility and clearing, language changes with drafts/errors/results, repeated checks, English fallback and absence of console/storage writes during submission. The runner prints a browser disconnect while shutting down after TOTAL: 20 SUCCESS; the command exits 0. No hosted CI is configured or claimed.

The original build produced 554.19 kB of initial chunks and warned against its 500 kB budget. The final production build is **203.30 kB**, without budget warnings. It no longer imports the unused broad Material module/theme; package versions and budgets were not changed. The original four-test suite had one obsolete scaffold-title failure; it was replaced with checks against the actual form behavior.

The production bundle was served over loopback. All ten generated files were read back and matched the build bytes. Browser review covered **1366×768, 360×800 and 800×360**, Spanish/English, empty and malformed input, correction links, Enter to submit, show/hide, password clearing, draft retention across languages and a fresh empty Spanish form after reload. No horizontal document overflow was found. The small-screen page scrolls normally; its actions are not restricted by a fixed-height container.

Native Tab/Return verified the skip link, email, password, visibility toggle and action order. A landscape error state allowed reaching Clear by Tab and activating it with Return, after which email regained focus. Inputs are labelled; errors use links and aria-describedby/aria-invalid, and results use a live status region. Buttons were measured at least 48 px high in all 16 recorded browser states. Outfit loaded from the local asset. Calculated contrast is 14.1 or greater for body text and above 4.5 for copper text/button pairs; exact calculated values are retained in the coordination evidence. No console warnings/errors were observed.

During the desktop interaction interval, local request count remained unchanged: no extra loopback request, POST or query was observed. Source uses no HTTP service or application persistence; tests spy on console.log and Storage.setItem during a valid submission. This evidence does not validate browser password managers or autofill.

The reduced-motion media query is checked in source; no operating-system preference emulation, browser zoom, screen reader, physical mobile device or formal accessibility/security certification is claimed. Angular 12.2 is listed as unsupported in the [official compatibility table](https://angular.dev/reference/versions), checked in the browser. Reproduction here does not establish current production suitability.

The [desktop](screenshots/form-desktop.png) and [mobile](screenshots/form-mobile.png) images are unedited captures of the built application. A full-page capture showing a previously focused skip link was rejected for the initial-state illustration and replaced after a fresh load.
