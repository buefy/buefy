export default [
    {
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'File, Array<File>',
                values: '—',
                default: '[]'
            },
            {
                name: '<code>drag-drop</code>',
                description: 'Accepts drag & drop and change its style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>type</code>',
                description: 'Type (color) of the drag area when hovered',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '<code>is-primary</code>'
            },
            {
                name: '<code>disabled</code>',
                description: 'Same as native <code>disabled</code>',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>name</code>',
                description: 'Same as native <code>name</code>',
                type: 'String',
                values: '—',
                default: '-'
            },
            {
                name: '<code>required</code>',
                description: 'Same as native <code>required</code>',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>accept</code>',
                description: 'Same as native <code>accept</code>',
                type: 'String',
                values: '—',
                default: '-'
            },
            {
                name: '<code>loading</code>',
                description: 'Add the loading state',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>multiple</code>',
                description: 'Same as native, also push new item to <code>v-model</code> instead of replacing',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>native</code>',
                description: 'Replace last chosen files every time (like native file input element)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            }
        ],
        events: [
            {
                name: '<code>input</code>',
                description: 'Triggers when the file list is changed',
                parameters: '<code>value: File</code> or <code>File[]</code>'
            }
        ],
        methods: [
            {
                name: '<code>checkHtml5Validity</code>',
                description: 'Check validation of HTML5 (add the message and type/color), also updates the <code>isValid</code> property',
                return: '<code>isValid: Boolean</code>'
            }
        ]
    }
]
