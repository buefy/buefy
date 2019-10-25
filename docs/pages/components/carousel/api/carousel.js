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
            },
            {
                name: '<code>animate</code>',
                description: 'Transition effect',
                type: 'String',
                values: '—',
                default: '<code>slide</code>'
            },
            {
                name: '<code>interval</code>',
                description: 'Interval of the <code>autoplay</code>, in milliseconds',
                type: 'Number',
                values: '—',
                default: '<code>3000</code>'
            },
            {
                name: '<code>autoplay</code>',
                description: 'Whether automatically loop the slides',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>pause-hover</code>',
                description: 'pause <code>autoplay</code> if the mouse enters the slide.',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            }
        ],
        slots: [
            {
                name: '<code>Indicators</code>',
                description: 'Custom indicators',
                props: '<code>i: Number</code>'
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
        ]
    }
]
