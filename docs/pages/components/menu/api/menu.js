export default [
    {
        title: 'Menu',
        props: [
            {
                name: '<code>is-dark</code>',
                description: 'Dark theme',
                type: 'Boolean',
                values: '—',
                default: 'false'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'menuitem or submenu'
            },
            {
                name: 'title',
                description: 'A title in the menu, such as logo'
            }
        ]
    },
    {
        title: 'Submenu',
        props: [
            {
                name: '<code>title</code>',
                description: 'The title of the submenu',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>icon</code>',
                description: 'The icon of the submenu',
                type: 'String',
                values: '—',
                default: '—'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'menuitem'
            }
        ]
    },
    {
        title: 'Menuitem',
        props: [
            {
                name: '<code>title</code>',
                description: 'The title of the menuitem',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>icon</code>',
                description: 'The icon of the menuitem',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>to</code>',
                description: 'path of vue-router，same as the to parameter of vue-router',
                type: 'String',
                values: '—',
                default: '—'
            }
        ],
        events: [
            {
                name: '<code>click</code>',
                description: 'Triggers when user click the menuitem if you don\'t specify "to"',
                parameters: '—'
            }
        ]
    }
]
