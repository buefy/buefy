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
                name: '<code>min</code>',
                description: 'Minimum allowed value',
                type: 'Number, String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>max</code>',
                description: 'Maxinimum allowed value',
                type: 'Number, String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>step</code>',
                description: 'Incremental number step',
                type: 'Number, String',
                values: '—',
                default: '—'
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
                values: '<code>compact<compact>',
                default: '—'
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
