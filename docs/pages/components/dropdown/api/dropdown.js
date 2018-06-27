export default [
    {
        title: 'Dropdown',
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'Any',
                values: '—',
                default: '<code>null</code>'
            },
            {
                name: '<code>hoverable</code>',
                description: 'Dropdown will be triggered by hover instead of click',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>position</code>',
                description: 'Optional, position of the dropdown relative to the trigger',
                type: 'String',
                values: '<code>is-top-right</code>, <code>is-top-left</code>, <code>is-bottom-left</code>',
                default: 'Bottom right'
            },
            {
                name: '<code>disabled</code>',
                description: 'Disables dropdown',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>inline</code>',
                description: 'Dropdown content (items) are shown inline, trigger is removed',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>mobile-modal</code>',
                description: 'Dropdown content (items) are shown into a modal on mobile',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            }
        ],
        events: [
            {
                name: '<code>change</code>',
                description: 'Triggers when an item is selected',
                parameters: '<code>value: String</code>'
            },
            {
                name: '<code>active-change</code>',
                description: 'Triggers when dropdown is activated or deactivated (visibility of list)',
                parameters: '<code>active: Boolean</code>'
            }
        ],
        methods: [
            {
                name: '<code>toggle</code>',
                description: 'Toggle activation (dropdown list visibility)'
            }
        ]
    },
    {
        title: 'Item',
        props: [
            {
                name: '<code>value</code>',
                description: 'The value that will be returned on events and v-model',
                type: 'Any',
                values: '—',
                default: '<code>null</code>'
            },
            {
                name: '<code>slot</code>',
                description: 'Set the item to be the menu trigger',
                type: '',
                values: 'trigger',
                default: '<code>null</code>'
            },
            {
                name: '<code>separator</code>',
                description: 'Set the item to be a separator',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>disabled</code>',
                description: 'Item is disabled',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>custom</code>',
                description: 'Item is not a clickable item',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>has-link</code>',
                description: 'Use it if your item is an anchor tag or <code>router-link</code>',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>paddingless</code>',
                description: 'Remove padding',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            }
        ],
        events: [
            {
                name: '<code>click</code>',
                description: 'Triggers when the item is clicked',
                parameters: '—'
            }
        ]
    }
]
