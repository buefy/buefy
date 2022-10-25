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
                name: '<code>triggers</code>',
                description: 'Dropdown will be triggered by any events',
                type: 'Array',
                values: '<code>click</code>,<code>hover</code>,<code>contextmenu</code>,<code>focus</code>',
                default: '<code>[\'click\']</code>'
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
                name: '<code>animation</code>',
                description: 'Custom animation (transition name)',
                type: 'String',
                values: '—',
                default: '<code>fade</code>'
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
            },
            {
                name: '<code>expanded</code>',
                description: 'Dropdown will be expanded (full-width)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>aria-role</code>',
                description: 'Role attribute to be passed to list container for better accessibility. Use <code>menu</code> only in situations where your dropdown is related to navigation menus.',
                type: 'String',
                values: '<code>list</code>, <code>menu</code>, <code>dialog</code>',
                default: '—'
            },
            {
                name: '<code>multiple</code>',
                description: 'Allows multiple selections',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>trap-focus</code>',
                description: `Trap focus inside the dropdown.`,
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>can-close</code>',
                description: 'Can close dropdown by pressing escape or by clicking outside',
                type: 'Boolean, Array',
                values: '<code>escape</code>, <code>outside</code>',
                default: '<code>true</code>'
            },
            {
                name: '<code>close-on-click</code>',
                description: 'Close dropdown when content is clicked',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>append-to-body</code>',
                description: 'Append dropdown content to body (prevents event bubbling)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>scrollable</code>',
                description: 'Dropdown content will be scrollable',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>max-height</code>',
                description: 'Max height of dropdown content',
                type: 'String, Number',
                values: '—',
                default: '<code>200px</code>'
            },
            {
                name: '<code>trigger-tabindex</code>',
                description: 'Set the tabindex attribute on the dropdown trigger div (-1 to prevent selection via tab key)',
                type: 'Number',
                values: '-',
                default: '<code>0</code>'
            }
        ],
        slots: [
            {
                name: 'default',
                description: '',
                props: '<code>slot-scope="{ active }"</code> *Only works when not hoverable.'
            },
            {
                name: '<code>trigger</code>',
                description: 'Trigger content for the dropdown',
                props: '<code>active: Boolean</code>'
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
                name: '<code>focusable</code>',
                description: 'Item can be focused',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
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
            },
            {
                name: '<code>aria-role</code>',
                description: 'Role attribute to be passed to list item for better accessibility. Use <code>menuitem</code> only in situations where your dropdown is related to navigation menus.',
                type: 'String',
                values: '<code>listitem</code>, <code>menuitem</code>',
                default: '—'
            }
        ],
        slots: [
            {
                name: 'default',
                description: '',
                props: ''
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
