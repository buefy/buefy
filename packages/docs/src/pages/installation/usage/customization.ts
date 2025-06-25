// Code snippets used in the `Customization` component.
//
// Vite may confuse these examples with the legitimate code and try to compile
// them, if they are in the component (.vue) file.

export const sass = `
// Modern Sass with @use directive (Dart Sass 1.23.0+)
@use "bulma/sass" with (
  // Set your custom colors
  $primary: #8c67ef,
  $link: #8c67ef,
  $info: #3e8ed0,
  $success: #48c78e,
  $warning: #ffe08a,
  $danger: #f14668,
  
  // Custom typography
  $family-sans-serif: ("Nunito", BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif),
  
  // Custom spacing and sizing
  $size-1: 3rem,
  $size-2: 2.5rem,
  $size-3: 2rem,
  $size-4: 1.5rem,
  $size-5: 1.25rem,
  $size-6: 1rem,
  $size-7: 0.75rem,
  
  // Border radius
  $radius-small: 2px,
  $radius: 4px,
  $radius-large: 6px,
  $radius-rounded: 9999px,
  
  // Buefy specific variables
  $speed-slow: 150ms,
  $speed-slower: 250ms
);

// Import Buefy styles
@use "buefy/src/scss/buefy";
`

export const sassLegacy = `
// Legacy Sass with @import (deprecated but still supported)
// Import Bulma's core utilities first
@import "~bulma/sass/utilities/_all";

// Set your custom variables
$primary: #8c67ef;
$primary-light: findLightColor($primary);
$primary-dark: findDarkColor($primary);
$primary-invert: findColorInvert($primary);

// Custom colors
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Typography
$family-sans-serif: "Nunito", BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;

// Buefy specific variables
$speed-slow: 150ms !default;
$speed-slower: 250ms !default;

// Setup custom colors map
$custom-colors: (
  "twitter": ($twitter, $twitter-invert)
);

$colors: mergeColorMaps(
    (
        "white": ($white, $black),
        "black": ($black, $white),
        "light": ($light, $light-invert),
        "dark": ($dark, $dark-invert),
        "primary": ($primary, $primary-invert, $primary-light, $primary-dark),
        "link": ($link, $link-invert, $link-light, $link-dark),
        "info": ($info, $info-invert, $info-light, $info-dark),
        "success": ($success, $success-invert, $success-light, $success-dark),
        "warning": ($warning, $warning-invert, $warning-light, $warning-dark),
        "danger": ($danger, $danger-invert, $danger-light, $danger-dark),
    ),
    $custom-colors
);

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
`

export const importing = `
import { createApp } from 'vue'
import Buefy from 'buefy'

const app = createApp({})
app.use(Buefy)
app.mount('#app')`

export const packageJsonSetup = `
{
  "devDependencies": {
    "sass": "^1.70.0",
    "sass-loader": "^13.3.0"
  }
}`

export const viteConfig = `
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // Dart Sass options
        api: 'modern-compiler'
      }
    }
  }
})`

export const webpackConfig = `
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'), // Dart Sass
              sassOptions: {
                fiber: false, // Removed in Dart Sass 2.0
              },
            },
          },
        ],
      },
    ],
  },
};`
