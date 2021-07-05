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
                name: '<code>group-field</code>',
                description: 'Property of the object (if <code>data</code> is array of objects) to use as display text of group',
                type: 'String',
                values: '—',
                default: ''
            },
            {
                name: '<code>group-options</code>',
                description: 'Property of the object (if <code>data</code> is array of objects) to use as key to get items array of each group, optional',
                type: 'String',
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
                name: '<code>confirm-keys</code>',
                description: 'Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will select an option when typing (default tab and enter)',
                type: 'Array',
                values: '—',
                default: '<code>["Tab", "Enter"]</code>'
            },
            {
                name: '<code>clearable</code>',
                description: 'Add a button to clear the inputed text',
                type: 'Boolean',
                values: '—',
                default: 'false'
            },
            {
                name: '<code>icon-right</code>',
                description: 'Icon name to be added on the right side',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>maxlength</code>',
                description: 'Same as native <code>maxlength</code>, plus character counter',
                type: 'String, Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>check-infinite-scroll</code>',
                description: 'Makes the component check if list reached scroll end and emit <code>infinite-scroll</code> event.',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>max-height</code>',
                description: 'Max height of dropdown content',
                type: 'String, Number',
                values: '—',
                default: '<code>200px</code>'
            },
            {
                name: '<code>dropdown-position</code>',
                description: 'Position of dropdown',
                type: 'String',
                values: '<code>top</code>, <code>bottom</code>, <code>auto</code>',
                default: '<code>auto</code>'
            },
            {
                name: '<code>append-to-body</code>',
                description: 'Append autocomplete content to body (prevents event bubbling)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>select-on-click-outside</code>',
                description: 'Trigger the <code>@select</code> event for the first pre-selected option when clicking outside and <code>keep-first</code> is enabled',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
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
            },
            {
                name: '<code>group</code>',
                description: 'Control how the group header is output',
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
                parameters: '<code>option: String|Number|Object, event: $event</code>'
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
            },
            {
                name: '<code>infinite-scroll</code>',
                description: 'Triggers when <code>.dropdown-list</code> has reached scroll end',
                parameters: '—'
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
