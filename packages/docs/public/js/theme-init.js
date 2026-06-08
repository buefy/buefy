/**
 * Theme Initialization Script
 *
 * Runs synchronously before the browser paints the first frame to apply the
 * correct theme without a flash of unstyled content (FOUC).
 *
 * IMPORTANT: This file must be loaded as a plain blocking <script> — no
 * `defer`, no `async`, no `type="module"`. Those attributes delay execution
 * until after the first paint, which defeats the purpose.
 *
 * How it works
 * ------------
 * Priority order when deciding which theme to apply:
 *   1. User's stored preference  — localStorage key "theme" ("light" | "dark")
 *   2. OS / browser preference   — window.matchMedia('prefers-color-scheme')
 *   3. Default                   — no attribute set; CSS :root light tokens apply
 *
 * The theme is communicated to CSS by setting a `data-theme` attribute on
 * <html> (e.g. <html data-theme="dark">). The CSS custom properties in
 * src/assets/scss/_tokens.scss use the [data-theme="dark"] selector.
 *
 * The full interactive theme management (toggle button, localStorage writes,
 * reactive Vue state) lives in src/composables/useTheme.ts. This script is
 * intentionally kept dependency-free and minimal — its only job is to set
 * the attribute as early as possible.
 *
 * Maintenance notes
 * -----------------
 * - localStorage key:  "theme"  (must match useTheme.ts)
 * - Attribute name:    "data-theme"  (must match _tokens.scss selectors)
 * - Valid values:      "light" | "dark"
 */
(function () {
    var stored = localStorage.getItem('theme');

    // Fall back to OS/browser color-scheme preference when no stored choice exists
    if (!stored) {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            stored = 'dark';
        }
    }

    // Apply the attribute immediately so CSS sees the right theme at first paint
    if (stored === 'dark' || stored === 'light') {
        document.documentElement.setAttribute('data-theme', stored);
    }
    // If stored is null/unknown we leave the attribute unset — CSS defaults to light
}());
