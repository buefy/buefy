export default [
    {
        props: [
            {
                name: '<code>total</code>',
                description: `Total count of items`,
                type: 'Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>per-page</code>',
                description: 'Items count for each page',
                type: 'Number',
                values: '—',
                default: '<code>20</code>'
            },
            {
                name: '<code>current</code>',
                description: 'Current page number, use the <code>.sync</code> modifier to make it two-way binding',
                type: 'Number',
                values: '—',
                default: '<code>1</code>'
            },
            {
                name: '<code>order</code>',
                description: 'Buttons order, optional',
                type: 'String',
                values: '<code>is-centered</code>, <code>is-right</code>',
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'Pagination size, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>simple</code>',
                description: 'Simpler style',
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
            }
        ],
        events: [
            {
                name: '<code>change</code>',
                description: 'Triggers when the current page is changed',
                parameters: '<code>value: Number</code>'
            }
        ]
    }
]
