export default [
    {
        title: 'Badge',
        props: [
            {
                name: '<code>value</code>',
                description: 'Badge content (number or text), optional',
                type: 'String, Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>type</code>',
                description: 'Type (color) of the badge, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'Size of the badge, optional',
                type: 'String',
                values: '<code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>rounded</code>',
                description: 'Badge border rounded',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>position</code>',
                description: 'Position of the badge relative to the wrapped content',
                type: 'String',
                values: '<code>is-top-right</code>, <code>is-top-left</code>, <code>is-bottom-right</code>, <code>is-bottom-left</code>',
                default: '<code>is-top-right</code>'
            },
            {
                name: '<code>dot</code>',
                description: 'Renders a plain dot indicator instead of the <code>value</code> content',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>max</code>',
                description: 'Caps a numeric <code>value</code>, showing e.g. <code>99+</code> when exceeded',
                type: 'Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>visible</code>',
                description: 'Controls whether the badge is shown',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>tag</code>',
                description: 'Element to render as the wrapping container',
                type: 'String',
                values: '—',
                default: '<code>div</code>'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Anchor content the badge is overlaid on',
                props: '—'
            },
            {
                name: 'badge',
                description: 'Custom badge content, overrides <code>value</code>',
                props: '—'
            }
        ]
    }
]
