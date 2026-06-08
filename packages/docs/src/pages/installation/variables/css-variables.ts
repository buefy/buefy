// Bulma base CSS variable reference data used in the CssVariables doc page.
// Each row uses { name, css, default } so VariablesView renders "Name | CSS | Default".

export const colorVariables = [
    // Primary
    {
        name: 'Primary color hue (0–360°)',
        css: '<code>--bulma-primary-h</code>',
        default: '<code>171deg</code>'
    },
    {
        name: 'Primary color saturation',
        css: '<code>--bulma-primary-s</code>',
        default: '<code>100%</code>'
    },
    {
        name: 'Primary color lightness',
        css: '<code>--bulma-primary-l</code>',
        default: '<code>41%</code>'
    },
    // Link
    {
        name: 'Link color hue',
        css: '<code>--bulma-link-h</code>',
        default: '<code>233deg</code>'
    },
    {
        name: 'Link color saturation',
        css: '<code>--bulma-link-s</code>',
        default: '<code>100%</code>'
    },
    {
        name: 'Link color lightness',
        css: '<code>--bulma-link-l</code>',
        default: '<code>63%</code>'
    },
    // Info
    {
        name: 'Info color hue',
        css: '<code>--bulma-info-h</code>',
        default: '<code>207deg</code>'
    },
    {
        name: 'Info color saturation',
        css: '<code>--bulma-info-s</code>',
        default: '<code>61%</code>'
    },
    {
        name: 'Info color lightness',
        css: '<code>--bulma-info-l</code>',
        default: '<code>53%</code>'
    },
    // Success
    {
        name: 'Success color hue',
        css: '<code>--bulma-success-h</code>',
        default: '<code>153deg</code>'
    },
    {
        name: 'Success color saturation',
        css: '<code>--bulma-success-s</code>',
        default: '<code>53%</code>'
    },
    {
        name: 'Success color lightness',
        css: '<code>--bulma-success-l</code>',
        default: '<code>53%</code>'
    },
    // Warning
    {
        name: 'Warning color hue',
        css: '<code>--bulma-warning-h</code>',
        default: '<code>42deg</code>'
    },
    {
        name: 'Warning color saturation',
        css: '<code>--bulma-warning-s</code>',
        default: '<code>100%</code>'
    },
    {
        name: 'Warning color lightness',
        css: '<code>--bulma-warning-l</code>',
        default: '<code>53%</code>'
    },
    // Danger
    {
        name: 'Danger color hue',
        css: '<code>--bulma-danger-h</code>',
        default: '<code>348deg</code>'
    },
    {
        name: 'Danger color saturation',
        css: '<code>--bulma-danger-s</code>',
        default: '<code>100%</code>'
    },
    {
        name: 'Danger color lightness',
        css: '<code>--bulma-danger-l</code>',
        default: '<code>70%</code>'
    },
    // White / Black
    {
        name: 'White color hue',
        css: '<code>--bulma-white-h</code>',
        default: '<code>0deg</code>'
    },
    {
        name: 'White color saturation',
        css: '<code>--bulma-white-s</code>',
        default: '<code>0%</code>'
    },
    {
        name: 'White color lightness',
        css: '<code>--bulma-white-l</code>',
        default: '<code>100%</code>'
    },
    {
        name: 'Black color hue',
        css: '<code>--bulma-black-h</code>',
        default: '<code>0deg</code>'
    },
    {
        name: 'Black color saturation',
        css: '<code>--bulma-black-s</code>',
        default: '<code>0%</code>'
    },
    {
        name: 'Black color lightness',
        css: '<code>--bulma-black-l</code>',
        default: '<code>4%</code>'
    },
    // Scheme surfaces
    {
        name: 'Main background surface',
        css: '<code>--bulma-scheme-main</code>',
        default: '<code>white</code>'
    },
    {
        name: 'Secondary background surface',
        css: '<code>--bulma-scheme-main-bis</code>',
        default: '<code>#fafafa</code>'
    },
    {
        name: 'Tertiary background surface',
        css: '<code>--bulma-scheme-main-ter</code>',
        default: '<code>#f5f5f5</code>'
    },
    {
        name: 'Inverse surface (overlays)',
        css: '<code>--bulma-scheme-invert</code>',
        default: '<code>#0a0a0a</code>'
    },
    // Text
    {
        name: 'Default body text color',
        css: '<code>--bulma-text</code>',
        default: '<code>#4a4a4a</code>'
    },
    {
        name: 'Strong/emphasis text',
        css: '<code>--bulma-text-strong</code>',
        default: '<code>#363636</code>'
    },
    {
        name: 'Muted/light text',
        css: '<code>--bulma-text-light</code>',
        default: '<code>#b5b5b5</code>'
    },
    // Background & Border
    {
        name: 'Generic background color',
        css: '<code>--bulma-background</code>',
        default: '<code>#f5f5f5</code>'
    },
    {
        name: 'Default border color',
        css: '<code>--bulma-border</code>',
        default: '<code>#dbdbdb</code>'
    },
    {
        name: 'Border color on hover/focus',
        css: '<code>--bulma-border-hover</code>',
        default: '<code>#b5b5b5</code>'
    },
    {
        name: 'Light border variant',
        css: '<code>--bulma-border-light</code>',
        default: '<code>#ededed</code>'
    },
]

export const typographyVariables = [
    {
        name: 'Default sans-serif font stack',
        css: '<code>--bulma-family-sans-serif</code>',
        default: '<code>BlinkMacSystemFont, "Segoe UI", ...</code>'
    },
    {
        name: 'Monospace font stack',
        css: '<code>--bulma-family-monospace</code>',
        default: '<code>monospace</code>'
    },
    {
        name: 'Largest type scale step',
        css: '<code>--bulma-size-1</code>',
        default: '<code>3rem</code>'
    },
    {
        name: 'Type scale step 2',
        css: '<code>--bulma-size-2</code>',
        default: '<code>2.5rem</code>'
    },
    {
        name: 'Type scale step 3',
        css: '<code>--bulma-size-3</code>',
        default: '<code>2rem</code>'
    },
    {
        name: 'Type scale step 4',
        css: '<code>--bulma-size-4</code>',
        default: '<code>1.5rem</code>'
    },
    {
        name: 'Type scale step 5',
        css: '<code>--bulma-size-5</code>',
        default: '<code>1.25rem</code>'
    },
    {
        name: 'Base / default font size',
        css: '<code>--bulma-size-6</code>',
        default: '<code>1rem</code>'
    },
    {
        name: 'Smallest type scale step',
        css: '<code>--bulma-size-7</code>',
        default: '<code>0.75rem</code>'
    },
    {
        name: 'Light font weight',
        css: '<code>--bulma-weight-light</code>',
        default: '<code>300</code>'
    },
    {
        name: 'Normal font weight',
        css: '<code>--bulma-weight-normal</code>',
        default: '<code>400</code>'
    },
    {
        name: 'Medium font weight',
        css: '<code>--bulma-weight-medium</code>',
        default: '<code>500</code>'
    },
    {
        name: 'Semibold font weight',
        css: '<code>--bulma-weight-semibold</code>',
        default: '<code>600</code>'
    },
    {
        name: 'Bold font weight',
        css: '<code>--bulma-weight-bold</code>',
        default: '<code>700</code>'
    },
    {
        name: 'Extra bold font weight',
        css: '<code>--bulma-weight-extrabold</code>',
        default: '<code>800</code>'
    },
    {
        name: 'Default line height',
        css: '<code>--bulma-line-height</code>',
        default: '<code>1.5</code>'
    },
]

export const spacingVariables = [
    {
        name: 'Vertical spacing between block elements',
        css: '<code>--bulma-block-spacing</code>',
        default: '<code>1.5rem</code>'
    },
    {
        name: 'Height of form controls',
        css: '<code>--bulma-control-height</code>',
        default: '<code>2.5em</code>'
    },
    {
        name: 'Vertical padding inside controls',
        css: '<code>--bulma-control-padding-vertical</code>',
        default: '<code>calc(0.5em - 1px)</code>'
    },
    {
        name: 'Horizontal padding inside controls',
        css: '<code>--bulma-control-padding-horizontal</code>',
        default: '<code>calc(0.75em - 1px)</code>'
    },
    {
        name: 'Gap between grid columns',
        css: '<code>--bulma-column-gap</code>',
        default: '<code>0.75rem</code>'
    },
    {
        name: 'Base gap unit',
        css: '<code>--bulma-gap</code>',
        default: '<code>32px</code>'
    },
]

export const borderVariables = [
    {
        name: 'Small border radius (tags, badges)',
        css: '<code>--bulma-radius-small</code>',
        default: '<code>2px</code>'
    },
    {
        name: 'Default border radius',
        css: '<code>--bulma-radius</code>',
        default: '<code>4px</code>'
    },
    {
        name: 'Large border radius (cards, modals)',
        css: '<code>--bulma-radius-large</code>',
        default: '<code>6px</code>'
    },
    {
        name: 'Fully rounded / pill shape',
        css: '<code>--bulma-radius-rounded</code>',
        default: '<code>9999px</code>'
    },
    {
        name: 'Default border color',
        css: '<code>--bulma-border</code>',
        default: '<code>#dbdbdb</code>'
    },
    {
        name: 'Border color on hover/focus',
        css: '<code>--bulma-border-hover</code>',
        default: '<code>#b5b5b5</code>'
    },
    {
        name: 'Light border variant',
        css: '<code>--bulma-border-light</code>',
        default: '<code>#ededed</code>'
    },
]

export const shadowVariables = [
    {
        name: 'Default box shadow (cards, dropdowns)',
        css: '<code>--bulma-shadow</code>',
        default: '<code>0 0.5em 1em -0.125em rgba(10,10,10,.1), ...</code>'
    },
    {
        name: 'Horizontal shadow offset',
        css: '<code>--bulma-shadow-x</code>',
        default: '<code>0</code>'
    },
    {
        name: 'Vertical shadow offset',
        css: '<code>--bulma-shadow-y</code>',
        default: '<code>0.5em</code>'
    },
    {
        name: 'Shadow blur radius',
        css: '<code>--bulma-shadow-blur</code>',
        default: '<code>1em</code>'
    },
    {
        name: 'Shadow base color',
        css: '<code>--bulma-shadow-color</code>',
        default: '<code>rgba(10, 10, 10, 0.1)</code>'
    },
]
