export default [
    {
        title: 'Menu',
        slots: [
            {
                name: 'default',
                description: 'Menu list elements',
                props: '—'
            }
        ]
    },
    {
        title: 'Menu List',
        props: [
            {
                name: '<code>label</code>',
                description: 'Menu list label',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>icon</code>',
                description: 'Icon name',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '—',
                default: '<code>mdi</code>'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Menu item elements',
                props: '—'
            },
            {
                name: '<code>label</code>',
                description: 'Menu list custom label',
                props: '—'
            }
        ]
    },
    {
        title: 'Menu Item',
        props: [
            {
                name: '<code>label</code>',
                description: 'Menu item label',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>icon</code>',
                description: 'Icon name',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '—',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>disabled</code>',
                description: 'Item is disabled',
                type: 'Boolean',
                values: '-',
                default: 'false'
            },
            {
                name: '<code>active</code>',
                description: 'Item is active, use the .sync modifier to make it two-way binding',
                type: 'Boolean',
                values: '-',
                default: 'false'
            },
            {
                name: '<code>expanded</code>',
                description: 'Item is expanded when <code>default</code> contains menu items, use the .sync modifier to make it two-way binding',
                type: 'Boolean',
                values: '-',
                default: 'false'
            },
            {
                name: '<code>animation</code>',
                description: 'Custom animation (transition name)',
                type: 'String',
                values: '—',
                default: '<code>fade</code>'
            },
            {
                name: '<code>tag</code>',
                description: 'Button tag name',
                type: 'String',
                values: '<code>a</code>, <code>router-link</code>, <code>nuxt-link</code> or other nuxt alias',
                default: '<code>a</code>'
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
                name: '<code>click</code>',
                description: 'Triggers on click',
                parameters: '<code>event: $event</code>'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Menu item body',
                props: '—'
            },
            {
                name: '<code>label</code>',
                description: 'Menu list custom label',
                props: '<code>active: Boolean</code>,<code>expanded: Boolean</code>'
            }
        ]
    }
]
