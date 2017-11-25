export default [
    {
        props: [
            {
                name: '<code>collapsible</code>',
                description: 'Panel will be collapsible',
                type: 'Boolean',
                values: '',
                default: '<code>false</code>'
            },
            {
                name: '<code>open</code>',
                description: 'Whether panel is open or not, use the .sync modifier to make it two-way binding',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>has-custom-template</code>',
                description: 'If your panel content has custom template (see Bulma docs), add this prop',
                type: 'String',
                values: '-',
                default: '<code>false</code>'
            },
            {
                name: '<code>header</code>',
                description: 'Simple text or HTML content',
                type: 'String',
                values: '—',
                default: '<code></code>'
            },
            {
                name: '<code>content</code>',
                description: 'Simple text or HTML content',
                type: 'String',
                values: '—',
                default: '<code></code>'
            },
            {
                name: '<code>animation</code>',
                description: 'Custom animation (transition name)',
                type: 'String',
                values: '—',
                default: '<code>fade</code>'
            }
        ],
        slots: [
            {
                name: 'default',
                description: '',
                props: '—'
            },
            {
                name: 'header',
                description: '',
                props: '—'
            }
        ],
        events: [
            {
                name: '<code>open</code>',
                description: 'Triggers when user opened',
                parameters: '—'
            },
            {
                name: '<code>close</code>',
                description: 'Triggers when user closed',
                parameters: '—'
            }
        ],
        methods: [
            {
                name: '<code>toggle</code>',
                description: 'Toggle activation (if collapsible)'
            }
        ]
    }
]
