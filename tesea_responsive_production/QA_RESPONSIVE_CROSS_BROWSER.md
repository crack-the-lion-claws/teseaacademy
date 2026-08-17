# TESEA Responsive & Cross-Browser QA

## Supported production targets
- Chrome: current + previous major release
- Microsoft Edge: current + previous major release
- Firefox: current + previous major release
- Safari macOS: current + previous major release
- Safari iOS: current + previous major release
- Chrome Android: current + previous major release

Internet Explorer is intentionally excluded because the application uses modern CSS Grid, custom properties and ES modules/tooling in the server stack.

## Repairs completed
- Added missing shared CSS token aliases (`--surface`, `--border`, `--text`, `--soft`, `--brand`, etc.).
- Added solid top-bar fallback plus Safari-prefixed backdrop filtering.
- Added dynamic viewport (`dvh`) and safe-area handling.
- Prevented grid/flex children and long text from forcing horizontal page overflow.
- Added touch scrolling to tables, tabs, PDF/document panes and sidebar.
- Added mobile-safe modals and sticky modal header/footer.
- Added `aspect-ratio` fallback for video/media stages.
- Reworked tablet/mobile grids at 1200, 1024, 820, 640, 480 and 360 px breakpoints.
- Hardened public landing and authentication pages for narrow screens.
- Added visible keyboard focus, reduced-motion and forced-colors support.
- Replaced `String.replaceAll()` in app runtime metadata for broader Safari compatibility.

## Release smoke-test matrix
1. 1440×900 desktop: landing, learner, tutor, Super Admin and CRM.
2. 1024×768 tablet landscape: sidebar, tables, content/assessment studios.
3. 820×1180 tablet portrait: mobile sidebar transition and top bar.
4. 390×844 iPhone-class viewport: learner lesson, assessment, community and billing.
5. 360×800 Android compact viewport: CRM, moderation, class management and auth.
6. Browser Back/Forward after opening dashboard modules.
7. Dark/light theme toggle on each role.
8. Modal open/close with keyboard and touch.
9. Horizontal table scrolling without page-level horizontal overflow.
10. Print lesson/PDF-note view.
