export const typeScaleVariables = [
    { css: '<code>--bulma-size-1</code>', name: 'Display / largest heading', default: '3rem' },
    { css: '<code>--bulma-size-2</code>', name: 'Hero heading', default: '2.5rem' },
    { css: '<code>--bulma-size-3</code>', name: 'Section heading', default: '2rem' },
    { css: '<code>--bulma-size-4</code>', name: 'Subsection heading', default: '1.5rem' },
    { css: '<code>--bulma-size-5</code>', name: 'Large body', default: '1.25rem' },
    { css: '<code>--bulma-size-6</code>', name: 'Body (base size)', default: '1rem' },
    { css: '<code>--bulma-size-7</code>', name: 'Small / caption', default: '0.75rem' },
    { css: '<code>--bulma-size-small</code>', name: 'Alias → size-7', default: '0.75rem' },
    { css: '<code>--bulma-size-normal</code>', name: 'Alias → size-6', default: '1rem' },
    { css: '<code>--bulma-size-medium</code>', name: 'Alias → size-5', default: '1.25rem' },
    { css: '<code>--bulma-size-large</code>', name: 'Alias → size-4', default: '1.5rem' },
]

export const fontWeightVariables = [
    { css: '<code>--bulma-weight-light</code>', name: 'Light weight', default: '300' },
    { css: '<code>--bulma-weight-normal</code>', name: 'Normal / body weight', default: '400' },
    { css: '<code>--bulma-weight-medium</code>', name: 'Medium weight', default: '500' },
    { css: '<code>--bulma-weight-semibold</code>', name: 'Semibold weight', default: '600' },
    { css: '<code>--bulma-weight-bold</code>', name: 'Bold weight', default: '700' },
    { css: '<code>--bulma-weight-extrabold</code>', name: 'Extra bold weight', default: '800' },
]

export const fontFamilyVariables = [
    { css: '<code>--bulma-family-sans-serif</code>', name: 'Body / UI sans-serif stack', default: 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", …' },
    { css: '<code>--bulma-family-monospace</code>', name: 'Code / mono stack', default: 'monospace' },
    { css: '<code>--bulma-family-primary</code>', name: 'Primary font (same as sans-serif)', default: 'var(--bulma-family-sans-serif)' },
    { css: '<code>--bulma-family-code</code>', name: 'Code font (same as monospace)', default: 'var(--bulma-family-monospace)' },
]

export const lineHeightVariables = [
    { css: '<code>--bulma-line-height</code>', name: 'Default body line-height', default: '1.5' },
    { css: '<code>--bulma-body-line-height</code>', name: 'Explicit body line-height', default: '1.5' },
    { css: '<code>--bulma-title-line-height</code>', name: 'Title / heading line-height', default: '1.125' },
    { css: '<code>--bulma-subtitle-line-height</code>', name: 'Subtitle line-height', default: '1.25' },
    { css: '<code>--bulma-content-line-height</code>', name: 'Long-form content line-height', default: '1.5' },
]
