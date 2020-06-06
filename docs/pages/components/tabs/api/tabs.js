export default [
    {
        title: 'Tabs',
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value, tab index',
                type: 'Number, String',
                values: '—',
                default: '<code>0</code>'
            },
            {
                name: '<code>expanded</code>',
                description: 'Make tab full width',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>animated</code>',
                description: 'Tabs have slide animation',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>type</code>',
                description: 'Type/Style of the tab, optional',
                type: 'String',
                values: '<code>is-boxed</code>, <code>is-toggle</code>',
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'Size of the tab, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>position</code>',
                description: 'Position of the tab, optional',
                type: 'String',
                values: '<code>is-centered</code>, <code>is-right</code>',
                default: '—'
            },
            {
                name: '<code>vertical</code>',
                description: 'Display the tabs vertically. The content will be placed at right.',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>destroy-on-hide</code>',
                description: 'Destroy tabitem on hide',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>multiline</code>',
                description: 'Tabs will be multilined',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
        ],
        events: [
            {
                name: '<code>input</code>',
                description: 'Triggers when tab is clicked',
                parameters: '<code>value: String|Number</code>'
            },
            {
                name: '<code>change</code>',
                description: 'Triggers when active tab is changed',
                parameters: '<code>value: String|Number</code>'
            }
        ]
    },
    {
        title: 'Item',
        props: [
            {
                name: '<code>label</code>',
                description: 'Tab label',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>value</code>',
                description: 'Tab value',
                type: 'Number, String',
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
                name: '<code>visible</code>',
                description: 'Item is visible',
                type: 'Boolean',
                values: '-',
                default: 'true'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Tab item body',
                props: '—'
            },
            {
                name: '<code>header</code>',
                description: 'Tab item custom header',
                props: '—'
            }
        ]
    }
]
