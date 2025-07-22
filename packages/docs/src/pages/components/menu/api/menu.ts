export default [
    {
        title: 'Menu',
        props: [
            {
                name: '<code>accordion</code>',
                description: 'Close automatically the previous selected menu list',
                type: 'Boolean',
                values: '—',
                default: 'true'
            },
            {
                name: '<code>activable</code>',
                description: 'Active automatically the clicked menu item',
                type: 'Boolean',
                values: '—',
                default: 'true'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Menu list elements',
                props: '—'
            }
        ]
    },
    {
        title: 'List',
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
            },
            {
                name: '<code>size</code>',
                description: 'Icon size',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '<code>is-small</code>'
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
        title: 'Item',
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
                name: '<code>v-model</code>',
                description: 'Item is active',
                type: 'Boolean',
                values: '-',
                default: 'false'
            },
            {
                name: '<code>v-model:expanded</code>',
                description: 'Item is expanded when <code>default</code> contains menu items',
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
                type: 'String, Object',
                values: '<code>a</code>, <code>router-link</code>, <code>nuxt-link</code> or other nuxt alias',
                default: '<code>a</code>'
            },
            {
                name: '<code>aria-role</code>',
                description: 'Role attribute to be passed to list item for better accessibility. Use <code>menuitem</code> only in situations where your menu item is really related to navigation.',
                type: 'String',
                values: '<code>menuitem</code>',
                default: '—'
            },
            {
                name: '<code>compat-fallthrough</code>',
                description: 'Whether <code>class</code>, <code>style</code>, and <code>id</code> attributes are applied to the root &lt;li&gt; element or the underlying tag. If <code>true</code>, they are applied to the root &lt;li&gt; element, which is compatible with Buefy for Vue 2.',
                type: 'Boolean',
                values: '-',
                default: '<code>true</code>. Can be changed via the <code>defaultCompatFallthrough</code> config option.'
            },
            {
                name: '<code>size</code>',
                description: 'Icon size',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '<code>is-small</code>'
            },
            {
                name: 'Any native attribute',
                description: '—',
                type: '—',
                values: '—',
                default: '—'
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
        ],
        events: [
            {
                name: '<code>update:modelValue</code>',
                description: 'Triggers when the active state changes',
                parameters: '<code>value: Boolean</code>'
            },
            {
                name: '<code>update:expanded</code>',
                description: 'Triggers when the expanded state changes',
                parameters: '<code>value: Boolean</code>'
            }
        ]
    }
]
