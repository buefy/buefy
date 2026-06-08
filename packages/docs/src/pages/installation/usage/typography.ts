export const titleSubtitleExample = `
<!-- Semantic heading levels -->
<h1 class="title is-1">Page Title</h1>
<h2 class="title is-2">Section Header</h2>
<h3 class="title is-3">Subsection</h3>

<!-- Paired title + subtitle (spaced correctly out of the box) -->
<p class="title is-3">My Component</p>
<p class="subtitle is-5">A brief description of what it does</p>

<!-- Spaced pairs: add is-spaced to prevent margin collapse -->
<p class="title is-3 is-spaced">With is-spaced</p>
<p class="subtitle is-5">Subtitle won't overlap</p>
`

export const fontFamilyExample = `
/* In your global CSS / _tokens.scss */
:root {
  --font-body:    'DM Sans', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', 'Fira Code', monospace;
  --font-display: 'DM Sans', system-ui, sans-serif;
}

/* Apply globally */
body       { font-family: var(--font-body); }
code, pre  { font-family: var(--font-mono); }
`

export const fontFaceLocalExample = `
/* @font-face using locally-hosted woff2 files */
@font-face {
  font-family: 'DM Sans';
  font-style:  normal;
  font-weight: 400 700;       /* covers all weights 400–700 (variable font) */
  font-display: swap;
  src: url('/fonts/dm-sans-normal-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+2000-206F;
}

@font-face {
  font-family: 'JetBrains Mono';
  font-style:  normal;
  font-weight: 400 500;
  font-display: swap;
  src: url('/fonts/jetbrains-mono-latin.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+2000-206F;
}
`

export const sizeHelpersExample = `
<!-- Bulma size helpers apply directly to any element -->
<p class="is-size-1">Largest — 3rem</p>
<p class="is-size-3">Section header — 2rem</p>
<p class="is-size-6">Body copy — 1rem (Bulma default)</p>
<p class="is-size-7">Caption / label — 0.75rem</p>

<!-- Responsive sizes: apply different size at each breakpoint -->
<p class="is-size-4-mobile is-size-2-tablet is-size-1-widescreen">
  Fluid-ish heading
</p>
`

export const weightExample = `
<p class="has-text-weight-light">Light — 300</p>
<p class="has-text-weight-normal">Normal — 400</p>
<p class="has-text-weight-medium">Medium — 500</p>
<p class="has-text-weight-semibold">Semibold — 600</p>
<p class="has-text-weight-bold">Bold — 700</p>
`

export const alignmentExample = `
<!-- Alignment -->
<p class="has-text-left">Left aligned</p>
<p class="has-text-centered">Centered</p>
<p class="has-text-right">Right aligned</p>
<p class="has-text-justified">Justified — spreads across full width</p>

<!-- Responsive alignment -->
<p class="has-text-centered-mobile has-text-left-tablet">
  Centered on mobile, left on tablet+
</p>

<!-- Transform & decoration -->
<p class="is-uppercase">uppercased via CSS</p>
<p class="is-lowercase">LOWERCASED VIA CSS</p>
<p class="is-capitalized">capitalized first letter per word</p>
<p class="is-italic">italic</p>
<p class="is-underlined">underlined</p>
`

export const fluidTypographyExample = `
/* clamp(min, preferred, max) — fluid between breakpoints */
:root {
  --text-display: clamp(2.75rem, 6vw, 4.5rem);
  --text-h1:      clamp(2rem,    4vw, 3rem);
  --text-h2:      clamp(1.5rem,  3vw, 2rem);
}

.hero-headline {
  font-size: var(--text-display);
  line-height: 1.1;
  font-weight: 700;
}

/* Bulma's title classes use fixed rem values.
   Override them with clamp() for fluid scaling: */
.title.is-1 { font-size: clamp(2rem, 5vw, 3rem); }
.title.is-2 { font-size: clamp(1.75rem, 4vw, 2.5rem); }
`

export const darkModeTypographyExample = `
/* Light mode defaults */
:root {
  --color-text:         #1A1523;
  --color-text-muted:   #6B6880;
  --color-text-on-dark: #F0EDFF;
}

/* Dark mode override via data attribute */
[data-theme="dark"] {
  --color-text:       #F0EDFF;
  --color-text-muted: #9D9AAD;
}

/* Apply in component */
.body-copy {
  color: var(--color-text);
}

.caption {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}
`

export const vueComponentExample = `
<template>
  <article class="post-card">
    <h2 class="title is-4">{{ title }}</h2>
    <p class="subtitle is-6 has-text-grey">{{ date }}</p>
    <p class="content has-text-weight-normal">{{ excerpt }}</p>
    <a class="has-text-primary has-text-weight-semibold">Read more →</a>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  date:  string
  excerpt: string
}>()
</script>

<style scoped>
.post-card {
  font-family: var(--font-body);
}

/* Override Bulma title margin for tighter card layout */
.post-card .title {
  margin-bottom: 0.25rem;
}
</style>
`

export const lineHeightExample = `
/* Bulma's content class adds comfortable reading line-height automatically */
<div class="content">
  <p>Long-form body copy gets line-height: 1.5 and sensible
     paragraph spacing automatically from the .content class.</p>
  <ul>
    <li>Lists are also styled</li>
    <li>No extra CSS needed</li>
  </ul>
</div>

/* For custom headings outside .content, set explicitly: */
.hero-headline { line-height: 1.1; }   /* tight — good for large display text */
.body-copy     { line-height: 1.6; }   /* relaxed — good for readable paragraphs */
.caption       { line-height: 1.4; }
`
