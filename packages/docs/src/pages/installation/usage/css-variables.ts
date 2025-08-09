// Code snippets used in the `CssVariables` component.

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
