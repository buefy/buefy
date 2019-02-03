export default [
    {
        props: [
            {
                name: '<code>open</code>',
                description: 'Whether collapse is open or not, use the .sync modifier to make it two-way binding',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>animation</code>',
                description: 'Custom animation (transition name)',
                type: 'String',
                values: '—',
                default: '<code>fade</code>'
            },
            {
                name: '<code>aria-id</code>',
                description: 'Id for the container div. Should be used with aria-controls on trigger for better accessibility.',
                type: 'String',
                values: '—',
                default: ''
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Content to show/hide',
                props: '—'
            },
            {
                name: '<code>trigger</code>',
                description: 'Trigger content',
                props: '<code>open: Boolean</code>'
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
                description: 'Toggle activation'
            }
        ]
    }
]
