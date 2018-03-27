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
                description: 'Input type, like native',
                type: 'String',
                values: 'Any native input type, and <code>textarea</code>',
                default: '<code>text</code>'
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
                name: '<code>password-reveal</code>',
                description: 'Add the reveal password functionality',
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
                name: '<code>has-counter</code>',
                description: 'Show character counter when <code>maxlength</code> prop is passed',
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
