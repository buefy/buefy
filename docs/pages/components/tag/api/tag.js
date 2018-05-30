export default [
    {
        title: 'Tag',
        props: [
            {
                name: '<code>type</code>',
                description: 'Type (color) of the icon, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'Size of the tab, optional',
                type: 'String',
                values: '<code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>rounded</code>',
                description: 'Tag border rounded',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>closable</code>',
                description: 'Add close/delete button to the tag',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>attached</code>',
                description: 'Close/delete button style equal to attached tags',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>ellipsis</code>',
                description: 'Adds ellipsis to not overflow the text',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>tabstop</code>',
                description: 'If should stop when using tab key',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>disabled</code>',
                description: 'Disable delete button',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            }
        ],
        events: [
            {
                name: '<code>close</code>',
                description: 'Triggers when close/delete button is clicked or <b>delete</b> key is pressed',
                parameters: '—'
            }
        ]
    },
    {
        title: 'Taglist',
        props: [
            {
                name: '<code>attached</code>',
                description: 'Tabs inside are attached together',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            }
        ]
    }
]
