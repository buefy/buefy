export default [
    {
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'Array<String>, Array<Number>, Array<Object>',
                values: '—',
                default: '—'
            },
            {
                name: '<code>maxlength</code>',
                description: 'Limits the length of each tag, plus character counter',
                type: 'String, Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>maxtags</code>',
                description: 'Limits the number of tags, plus tag counter',
                type: 'String, Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>type</code>',
                description: 'Type (color) of the tags, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '<code>is-light</code>'
            },
            {
                name: '<code>size</code>',
                description: 'Tag and input size, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '<code>is-medium</code>'
            },
            {
                name: '<code>rounded</code>',
                description: 'Makes the tags rounded, optional',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>attached</code>',
                description: 'Makes the tags attached instead of having an appended delete button, optional',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>field</code>',
                description: 'Property of the object (if <code>data</code> is array of objects) to use as display text',
                type: 'String',
                values: '—',
                default: '<code>value</code>'
            },
            {
                name: '<code>autocomplete</code>',
                description: 'Add autocomplete feature',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>allow-new</code>',
                description: 'When <code>autocomplete</code>, it allow to add new tags',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>remove-on-keys</code>',
                description: 'Allow removing last tag when pressing given keys, if input is empty',
                type: 'Array',
                values: '—',
                default: '<code>[8]</code>'
            },
            {
                name: '<code>confirm-key-codes</code>',
                description: 'Array of key codes which will add a tag when typing (default comma and enter)',
                type: 'Array',
                values: '—',
                default: '<code>[13, 188]</code>'
            },
            {
                name: 'Any other native attribute or Autocomplete prop',
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
            }
        ],
        events: [
            {
                name: '<code>input</code>',
                description: 'Triggers when tags are added/removed',
                parameters: '<code>value: Array</code>'
            },
            {
                name: '<code>typing</code>',
                description: 'User started typing a tag',
                parameters: '<code>value: String</code>'
            },
            {
                name: '<code>add</code>',
                description: 'Triggers when a tag has been added',
                parameters: '<code>value: String|Object</code>'
            },
            {
                name: '<code>remove</code>',
                description: 'Triggers when a tag has been removed',
                parameters: '<code>value: String|Object</code>'
            }
        ]
    }
]
