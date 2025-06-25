export default [
    {
        props: [
            {
                name: '<code>type</code>',
                description: 'Type (color) of the message, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '—'
            },
            {
                name: '<code>v-model</code>',
                description: 'Whether message is active or not',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>message</code>',
                description: 'Message text content',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>closable</code>',
                description: `Adds an 'X' button that closes the notification — works if has a <code>title</code>`,
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>auto-close</code>',
                description: `Hide notification after <code>duration</code>`,
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>duration</code>',
                description: 'Visibility duration in miliseconds',
                type: 'Number',
                values: '—',
                default: '<code>2000</code>'
            },
            {
                name: '<code>progress-bar</code>',
                description: 'remaining seconds before the alert will close (in seconds)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fad</code>, <code>fal</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>has-icon</code>',
                description: 'Adds an icon on the left side depending on the <code>type</code> (or the <code>icon</code> prop if defined)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>icon</code>',
                description: 'Icon name to use with <code>has-icon</code>',
                type: 'Boolean',
                values: '—',
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'Size of the control, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>icon-size</code>',
                description: 'Size of the icon, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '<code>is-large</code> or <code>size</code> prop'
            },
            {
                name: '<code>title</code>',
                description: 'Message title',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>aria-close-label</code>',
                description: 'Label for the close button, to be read by accessibility screenreaders.',
                type: 'String',
                values: '—',
                default: '—'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Main message content',
                props: '—'
            },
            {
                name: '<code>header</code>',
                description: 'Message custom header',
                props: '—'
            }
        ],
        events: [
            {
                name: '<code>close</code>',
                description: 'Triggers when user closes the message',
                parameters: '—'
            },
            {
                name: '<code>update:modelValue</code>',
                description: 'Triggers when the message visibility changes',
                parameters: '<code>value: Boolean</code>'
            },
            {
                name: '<code>click</code>',
                description: 'Triggers when the message is clicked',
                parameters: '—'
            }
        ],
        methods: [
            {
                name: '<code>close</code>',
                description: 'Programmatically close the message',
                return: '—'
            }
        ]
    }
]
