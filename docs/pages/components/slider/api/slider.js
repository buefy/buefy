export default [
    {
        title: "Slider",
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'Number, Array',
                values: '—',
                default: '—'
            },
            {
                name: '<code>min</code>',
                description: 'Minimum value',
                type: 'Number',
                values: '—',
                default: '<code>0</code>'
            },
            {
                name: '<code>max</code>',
                description: 'Maximum value',
                type: 'Number',
                values: '—',
                default: '<code>100</code>'
            },
            {
                name: '<code>step</code>',
                description: 'Step interval of ticks',
                type: 'Number',
                values: '—',
                default: '<code>1</code>'
            },
            {
                name: '<code>type</code>',
                description: 'Type (color) of the slider, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                <code>is-warning</code>, <code>is-danger</code>,
                and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: 'is-primary'
            },
            {
                name: '<code>size</code>',
                description: 'Thickness of the slider, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>ticks</code>',
                description: 'Show tick marks',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>tooltip</code>',
                description: 'Show tooltip when thumb is being dragged',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>tooltip-type</code>',
                description: 'The type (color) of the tooltip. Defaults to <code>type</code>',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                <code>is-warning</code>, <code>is-danger</code>,
                and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '<code>type</code>'
            },
            {
                name: '<code>rounded</code>',
                description: 'Rounded thumb',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>disabled</code>',
                description: 'Disable the slider',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>custom-formatter</code>',
                description: 'Function to format the tooltip label for display',
                type: 'Function',
                values: '—',
                default: '—'
            },
            {
                name: '<code>aria-label</code>',
                description: 'Accessibility label for the thumbs',
                type: 'String, Array',
                values: '—',
                default: '—'
            },
            {
                name: '<code>bigger-slider-focus</code>',
                description: 'Increase the clickable area',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Use SliderTick for custom ticks and labels',
                props: ''
            },
        ],
        events: [
            {
                name: '<code>input</code>',
                description: 'Triggers when value is changed',
                parameters: '<code>value: Number|Array</code>'
            },
            {
                name: '<code>change</code>',
                description: 'Triggers when value is changed after user interaction',
                parameters: '<code>value: Number|Array</code>'
            },
            {
                name: '<code>dragstart</code>',
                description: 'Triggers when thumb is pressed',
                parameters: '—'
            },
            {
                name: '<code>dragend</code>',
                description: 'Triggers when thumb is released',
                parameters: '—'
            },
            {
                name: '<code>dragging</code>',
                description: 'Triggers when thumb is being dragged',
                parameters: '<code>value: Number|Array</code>'
            }
        ]
    },
    {
        title: 'SliderTick',
        props: [
            {
                name: '<code>value</code>',
                description: 'The value that the tick represents',
                type: 'Number',
                values: '—',
                default: '—'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Label',
                props: ''
            }
        ]
    }
]
