// Code snippets used in the `CssVariables` component.

export const sassComparisonExample = `/* ── Approach A: Sass variables (requires recompilation) ──────────────────── */

// main.scss
@use "bulma/sass" with (
  $primary: #8A2BE2,      // BlueViolet
  $family-sans-serif: "Inter", sans-serif
);
@use "buefy/src/scss/buefy";

/* Pros: type-safe overrides, compile-time errors, no extra HTTP round-trips  */
/* Cons: must rebuild after every change; cannot change at runtime             */


/* ── Approach B: CSS Variables (no recompilation needed) ─────────────────── */

/* custom.css  — load this after buefy.css */
:root {
  /* Override Bulma's CSS custom properties directly in the browser */
  --bulma-primary-h: 271deg;    /* hue for BlueViolet */
  --bulma-primary-s: 76%;
  --bulma-primary-l: 53%;
  --bulma-family-sans-serif: "Inter", sans-serif;
}

/* Pros: no build step; swap themes at runtime with one line of JavaScript    */
/* Cons: only works in browsers that support CSS custom properties (all modern)*/`

export const howVariablesWorkExample = `/* Under the hood, Buefy's SCSS registers component variables like this: */

/* packages/buefy/src/scss/components/_checkbox.scss (simplified) */
.b-checkbox {
  --bulma-checkbox-active-background-color: var(--bulma-primary);
  --bulma-checkbox-size: 1.25em;
  --bulma-checkbox-border-color: var(--bulma-primary);
  /* … more vars … */
}

/* Then uses them internally: */
.b-checkbox input[type="checkbox"] + .check {
  width:  var(--bulma-checkbox-size);
  height: var(--bulma-checkbox-size);
  border-color: var(--bulma-checkbox-border-color);
}


/* ── How to override ─────────────────────────────────────────────────────── */

/* 1. Global override — affects ALL checkboxes everywhere */
:root {
  --bulma-checkbox-size: 1.5em;
  --bulma-checkbox-active-background-color: #8A2BE2;
}

/* 2. Scoped override — only checkboxes inside .my-form */
.my-form {
  --bulma-checkbox-size: 2em;
}

/* 3. Inline override — only this one element (use sparingly) */
/* <b-checkbox style="--bulma-checkbox-size: 3em">Big checkbox</b-checkbox> */`

export const colorSystemExample = `/* Bulma uses HSL (Hue · Saturation · Lightness) split across three variables.
   This lets Bulma auto-generate tinted/shaded variants from a single color. */

:root {
  /* ── Primary color ────────────────────────────────────── */
  --bulma-primary-h: 171deg;    /* hue: 0–360 — controls "which color" */
  --bulma-primary-s: 100%;      /* saturation: 0–100% */
  --bulma-primary-l: 41%;       /* lightness: 0–100% */

  /* Bulma then derives these automatically: */
  /* --bulma-primary       → hsl(171, 100%, 41%)   (the base color)    */
  /* --bulma-primary-light → hsl(171, 100%, 96%)   (light background)  */
  /* --bulma-primary-dark  → hsl(171, 100%, 29%)   (dark shade)        */
  /* --bulma-primary-soft  → hsl(171, 100%, 96%)   (soft tint)         */
  /* --bulma-primary-bold  → hsl(171, 100%, 29%)   (bold shade)        */
  /* --bulma-primary-on-scheme → computed for text on colored backgrounds */
}

/* Tip: To shift primary from teal → purple, only change the hue: */
:root {
  --bulma-primary-h: 271deg;   /* purple, keeps the same saturation/lightness */
}`

export const completeThemeExample = `/* ── Complete custom theme ───────────────────────────────────────────────── */
/* Drop this in your global CSS (after buefy.css) to apply a brand theme.    */

:root {
  /* Brand colors */
  --bulma-primary-h: 271deg;
  --bulma-primary-s: 76%;
  --bulma-primary-l: 53%;

  --bulma-link-h: 213deg;
  --bulma-link-s: 95%;
  --bulma-link-l: 55%;

  --bulma-info-h: 207deg;
  --bulma-info-s: 61%;
  --bulma-info-l: 53%;

  --bulma-success-h: 141deg;
  --bulma-success-s: 53%;
  --bulma-success-l: 53%;

  --bulma-warning-h: 44deg;
  --bulma-warning-s: 100%;
  --bulma-warning-l: 50%;

  --bulma-danger-h: 348deg;
  --bulma-danger-s: 100%;
  --bulma-danger-l: 61%;

  /* Typography */
  --bulma-family-sans-serif: "Inter", "Segoe UI", system-ui, sans-serif;
  --bulma-family-monospace: "JetBrains Mono", "Fira Code", monospace;
  --bulma-size-6: 1rem;          /* base font size */
  --bulma-weight-semibold: 600;

  /* Shape */
  --bulma-radius-small: 4px;
  --bulma-radius:       8px;
  --bulma-radius-large: 12px;

  /* Elevation */
  --bulma-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.08);
}`

export const basicExample = `
/* Override Bulma CSS variables to customize Buefy themes */
:root {
  /* Primary color */
  --bulma-primary-h: 171deg;
  --bulma-primary-s: 100%;
  --bulma-primary-l: 41%;
  
  /* Link color */
  --bulma-link-h: 233deg;
  --bulma-link-s: 100%;
  --bulma-link-l: 63%;
  
  /* Success color */
  --bulma-success-h: 153deg;
  --bulma-success-s: 53%;
  --bulma-success-l: 53%;
  
  /* Warning color */
  --bulma-warning-h: 42deg;
  --bulma-warning-s: 100%;
  --bulma-warning-l: 53%;
  
  /* Danger color */
  --bulma-danger-h: 348deg;
  --bulma-danger-s: 100%;
  --bulma-danger-l: 70%;
}`

export const advancedExample = `
/* Advanced CSS Variables customization */
:root {
  /* Typography */
  --bulma-family-sans-serif: "Helvetica Neue", Arial, sans-serif;
  --bulma-size-1: 3rem;
  --bulma-size-2: 2.5rem;
  --bulma-size-3: 2rem;
  --bulma-size-4: 1.5rem;
  --bulma-size-5: 1.25rem;
  --bulma-size-6: 1rem;
  --bulma-size-7: 0.75rem;
  
  /* Spacing */
  --bulma-block-spacing: 1.5rem;
  --bulma-control-height: 2.5em;
  --bulma-control-padding-vertical: calc(0.5em - 1px);
  --bulma-control-padding-horizontal: calc(0.75em - 1px);
  
  /* Border radius */
  --bulma-radius-small: 2px;
  --bulma-radius: 4px;
  --bulma-radius-large: 6px;
  --bulma-radius-rounded: 9999px;
  
  /* Shadows */
  --bulma-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
}`

export const componentExample = `
/* Component-specific customization */
.button {
  /* Override button variables locally */
  --bulma-button-border-width: 2px;
  --bulma-button-padding-vertical: 0.75em;
  --bulma-button-padding-horizontal: 1.5em;
}

.input, .textarea, .select select {
  /* Override input variables locally */
  --bulma-input-border-width: 2px;
  --bulma-input-focus-box-shadow-size: 0 0 0 0.125em;
}

.card {
  /* Override card variables locally */
  --bulma-card-shadow: 0 0.25em 0.5em rgba(10, 10, 10, 0.1);
  --bulma-card-radius: 0.5rem;
}`

export const darkModeExample = `
/* Dark mode with CSS variables */
:root {
  /* Light mode (default) */
  --bulma-scheme-main: white;
  --bulma-scheme-main-bis: #fafafa;
  --bulma-scheme-main-ter: #f5f5f5;
  --bulma-text: #4a4a4a;
  --bulma-text-strong: #363636;
}

[data-theme="dark"] {
  /* Dark mode overrides */
  --bulma-scheme-main: #0a0a0a;
  --bulma-scheme-main-bis: #121212;
  --bulma-scheme-main-ter: #242424;
  --bulma-text: #dbdbdb;
  --bulma-text-strong: #ffffff;
  
  /* Adjust other colors for dark mode */
  --bulma-background: #121212;
  --bulma-border: #5a5a5a;
  --bulma-border-hover: #b5b5b5;
}`

export const jsToggle = `
// JavaScript to toggle dark mode
function toggleDarkMode() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
});`

export const vueUsage = `
import { createApp } from 'vue'
import Buefy from 'buefy'

const app = createApp(App)
app.use(Buefy)
app.mount('#app')`
