export default [
    {
        props: [
            {
                name: '<code>type</code>',
                description: 'Type (color) of the tooltip',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '<code>is-primary</code>'
            },
            {
                name: '<code>active</code>',
                description: 'Whether tooltip is active or not',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>auto-close</code>',
                description: 'The event(s) that should trigger the tooltip to close',
                type: 'Boolean, Array',
                values: `Boolean <code>true</code> or <code>false</code>, or an array containing any of <code>escape</code>, <code>outside</code>, <code>inside</code>`,
                default: '<code>true</code>'
            },
            {
                name: '<code>label</code>',
                description: 'Tooltip text',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>triggers</code>',
                description: 'Tooltip will be triggered by any events',
                type: 'Array',
                values: '<code>click</code>,<code>hover</code>,<code>focus</code>,<code>contextmenu</code>',
                default: '<code>[\'hover\']</code>'
            },
            {
                name: '<code>position</code>',
                description: 'Tooltip position in relation to the element',
                type: 'String',
                values: '<code>is-top</code>, <code>is-bottom</code>, <code>is-left</code>, <code>is-right</code>',
                default: '<code>is-top</code>'
            },
            {
                name: '<code>always</code>',
                description: 'Tooltip will be always active',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>animated</code>',
                description: 'Tooltip will have a little fade animation',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>square</code>',
                description: 'Tooltip will be square (not rounded corners)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>dashed</code>',
                description: 'Tooltip slot will have a dashed underline',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>multilined</code>',
                description: 'Tooltip will be multilined',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>size</code>',
                description: 'Tooltip multiline size (only works for multilined tooltips)',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '<code>is-medium</code>'
            },
            {
                name: '<code>delay</code>',
                description: 'Tooltip delay before it appears (number in ms)',
                type: 'Number',
                values: "—",
                default: '<code>0</code>'
            },
            {
                name: '<code>close-delay</code>',
                description: 'Tooltip delay before it disappears (number in ms)',
                type: 'Number',
                values: "—",
                default: '<code>0</code>'
            },
            {
                name: '<code>append-to-body</code>',
                description: 'Append tooltip content to body (prevents event bubbling)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            }
        ],
        slots: [
            {
                name: 'content',
                description: 'Tooltip Content (HTML or components)',
                props: '-'
            }
        ],
        events: [
            {
                name: '<code>open</code>',
                description: 'Triggers when the tooltip is opened',
                parameters: '—'
            },
            {
                name: '<code>close</code>',
                description: 'Triggers when the tooltip is closed',
                parameters: '—'
            },
        ]
    }
]
