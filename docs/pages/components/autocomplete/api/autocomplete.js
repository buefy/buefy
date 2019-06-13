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
                name: '<code>data</code>',
                description: 'Options / suggestions',
                type: 'Array<String>, Array<Number>, Array<Object>',
                values: '—',
                default: '—'
            },
            {
                name: '<code>field</code>',
                description: 'Property of the object (if <code>data</code> is array of objects) to use as display text, and to keep track of selected option',
                type: 'String',
                values: '—',
                default: '<code>value</code>'
            },
            {
                name: '<code>custom-formatter</code>',
                description: 'Function to format an option to a string for display in the input as alternative to <code>field</code> prop)',
                type: 'Function',
                values: '—',
                default: ''
            },
            {
                name: '<code>clear-on-select</code>',
                description: 'Clear input text on select',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>open-on-focus</code>',
                description: 'Open dropdown list on focus',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>keep-first</code>',
                description: 'The first option will always be pre-selected (easier to just hit enter or tab)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
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
                name: '<code>icon</code>',
                description: 'Icon name to be added',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fad</code>, <code>fal</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>maxlength</code>',
                description: 'Same as native <code>maxlength</code>, plus character counter',
                type: 'String, Number',
                values: '—',
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
        slots: [
            {
                name: 'default',
                description: '',
                props: '<code>option: String|Object</code>, <code>index: Number</code>'
            },
            {
                name: '<code>empty</code>',
                description: 'Show like an option if <code>data</code> array prop is empty',
                props: '—'
            },
            {
                name: '<code>header</code>',
                description: 'Show a custom header as first option',
                props: '—'
            },
            {
                name: '<code>footer</code>',
                description: 'Show a custom footer as last option',
                props: '—'
            }
        ],
        events: [
            {
                name: '<code>input</code>',
                description: 'Triggers when value is changed',
                parameters: '<code>value: String|Number</code>'
            },
            {
                name: '<code>select</code>',
                description: 'Triggers when an option is selected or unset',
                parameters: '<code>option: String|Number|Object</code>'
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
                name: '<code>typing</code>',
                description: 'Triggers when user is typing',
                parameters: '<code>value: String</code>'
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
            },
            {
                name: '<code>setSelected(selected: Any)</code>',
                description: 'Select an option by an object (same type of <code>data</code> property)',
                return: '—'
            }
        ]
    }
]
