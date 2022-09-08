export default [
    {
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'String, Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>type</code>',
                description: 'Type (color) of the control, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '<code>is-primary</code>'
            },
            {
                name: '<code>size</code>',
                description: 'Vertical size of input, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>expanded</code>',
                description: 'Makes input full width when inside a grouped or addon field',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>loading</code>',
                description: 'Add the loading state to the input',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>editable</code>',
                description: 'Editable input',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: 'mdi, fa, fas, far, fab, fad, fal',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>min</code>',
                description: 'Minimum allowed value',
                type: 'Number, String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>max</code>',
                description: 'Maximum allowed value',
                type: 'Number, String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>step</code>',
                description: 'Incremental number step',
                type: 'Number, String',
                values: '—',
                default: '1'
            },
            {
                name: '<code>min-step</code>',
                description: 'Minimum step-size allowed. Input value is validated to be integer multiple of <code>min-step</code>',
                type: 'Number, String',
                values: '—',
                default: 'Defaults to value of <code>step</code>'
            },
            {
                name: '<code>exponential</code>',
                description: 'The factor of incrementation on long press',
                type: 'Boolean, Number',
                values: 'Between <code>0</code> excluded and <code>10</code>, setting to <code>true</code> is equivalent to passing <code>true</code>',
                default: 'false'
            },
            {
                name: '<code>controls</code>',
                description: 'Show controls (+/-)',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>controls-rounded</code>',
                description: 'Show rounded controls',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>controls-position</code>',
                description: 'Position of controls',
                type: 'String',
                values: '<code>compact</code>',
                default: '—'
            },
            {
                name: '<code>controls-alignment</code>',
                description: 'Alignment of controls',
                type: 'String',
                values: '<code>left</code>, <code>right</code>, <code>center</code>',
                default: '<code>center</code>'
            },
            {
                name: '<code>aria-minus-label</code>',
                description: 'Accessibility label for the minus button.',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>aria-plus-label</code>',
                description: 'Accessibility label for the plus button.',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>long-press</code>',
                description: 'Long press on the plus or minus button will increment/decrement the input value.',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: 'Any native attribute',
                description: '—',
                type: '—',
                values: '—',
                default: '—'
            }
        ],
        events: [
            {
                name: '<code>input</code>',
                description: 'Triggers when value is changed',
                parameters: '<code>value: String|Number</code>'
            },
            {
                name: '<code>focus</code>',
                description: 'Triggers when input has received focus',
                parameters: '<code>event: $event</code>'
            },
            {
                name: '<code>blur</code>',
                description: 'Triggers when input has lost focus',
                parameters: '<code>event: $event</code>'
            },
            {
                name: '<code>[any].native</code>',
                description: 'Listen to any native event, e.g. <code>click.native</code>',
                parameters: '<code>event: $event</code>'
            }
        ],
        methods: [
            {
                name: '<code>checkHtml5Validity</code>',
                description: 'Check validation of HTML5 (add the message and type/color), also updates the <code>isValid</code> property',
                return: '<code>isValid: Boolean</code>'
            },
            {
                name: '<code>focus</code>',
                description: 'Set focus (internally uses the native <code>.select()</code> method)',
                return: '—'
            }
        ]
    }
]
