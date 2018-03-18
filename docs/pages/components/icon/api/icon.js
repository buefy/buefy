export default [
    {
        props: [
            {
                name: '<code>type</code>',
                description: 'Type (color) of the icon, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '—'
            },
            {
                name: '<code>pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fad</code>, <code>fal</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>icon</code>',
                description: 'Icon name',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'Icon size, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>custom-size</code>',
                description: 'Overrides icon font size, optional',
                type: 'String',
                values: `Depends on library: <code>null</code> (smallest), <code>fa-lg</code>, <code>fa-2x</code>, <code>fa-3x</code>,
                <code>fa-4x</code>, <code>fa-5x</code>,
                    <code>mdi-18px</code>, <code>mdi-24px</code>, <code>mdi-36px</code>, <code>mdi-48px</code>`,
                default: 'Depends on <code>size</code> prop'
            },
            {
                name: '<code>custom-class</code>',
                description: `Add class to icon font (<code>&lt;i&gt;</code> tag), optional.
                    See <a href="https://materialdesignicons.com/getting-started" target="_blank">here for MDI</a>,
                    <a href="http://fontawesome.io/examples/" target="_blank">here for FontAwesome 4</a> and
                    <a href="https://fontawesome.com/how-to-use/web-fonts-with-css#additional-styling" target="_blank">here for FontAwesome 5</a> custom classes`,
                type: 'String',
                values: '—',
                default: '—'
            }
        ]
    }
]
