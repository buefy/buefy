export default [
    {
        title: 'Carousel',
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'Number',
                values: '—',
                default: '<code>0</code>'
            }
        ],
        events: [ 
            {
                name: '<code>change</code>',
                description: 'Triggers when carousel item value is changed',
                parameters: '<code>value: Boolean</code>'
            }
        ]
    },
    {
        title: 'Carousel Item',
        props: [
            {
                name: '<code>is-active</code>',
                description: '—',
                type: 'Boolean',
                values: '—',
                default: '—'
            }
        ],
        slots: [
            {
                name: '<code>Indicators</code>',
                description: 'Custom indicators',
                props: '—'
            }
        ]
    }
]