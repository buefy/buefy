export default [
    {
        props: [
            {
                name: '<code>value</code>',
                description: 'Progress value. This value is automatically synced',
                type: 'Number',
                values: '0.0 - 1.0',
                default: '<code>0.0</code>'
            },
            {
                name: '<code>size</code>',
                description: 'Size of the progressbar (see Bulma docs)',
                type: 'String',
                values:  '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '<code>null</code>'
            },
            {
                name: '<code>type</code>',
                description: 'Basically the color of the progressbar (see Bulma docs)',
                type: 'String',
                values:  '<code>is-primary</code>, <code>is-link</code>, <code>is-info</code>, <code>is-success</code>, <code>is-warning</code>, <code>is-danger</code>',
                default: '<code>is-primary</code>'
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
