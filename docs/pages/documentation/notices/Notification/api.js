export default [
    {
        props: [
            {
                name: '<code>type</code>',
                description: 'Type (color) of the notification, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '—'
            },
            {
                name: '<code>active</code>',
                description: 'Whether notification is active or not, use the <code>.sync</code> modifier to make it two-way binding',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>closable</code>',
                description: `Adds an 'X' button that closes the notification`,
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>has-icon</code>',
                description: 'Adds an icon on the left side depending on the <code>type</code>',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            }
        ],
        events: [
            {
                name: '<code>close</code>',
                description: 'Triggers when user closes the notification',
                parameters: '—'
            }
        ]
    }
]
