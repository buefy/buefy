export default [
    {
        props: [
            {
                name: '<code>type</code>',
                description: 'Type (color) of the control, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'Vertical size of button, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>label</code>',
                description: 'Button label, optional when default slot',
                type: 'String',
                values: '',
                default: '—'
            },
            {
                name: '<code>loading</code>',
                description: 'Add the loading state to the button',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>rounded</code>',
                description: 'Rounded style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>outlined</code>',
                description: 'Outlined style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>focused</code>',
                description: 'Focused style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>inverted</code>',
                description: 'Inverted style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>hovered</code>',
                description: 'Hovered style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>active</code>',
                description: 'Active style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>selected</code>',
                description: 'Selected style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>expanded</code>',
                description: 'Button will be expanded (full-width)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>icon-left</code>',
                description: 'Icon name to show on the left',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>icon-right</code>',
                description: 'Icon name to show on the right',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fad</code>, <code>fal</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>native-type</code>',
                description: 'Button type, like native',
                type: 'String',
                values: 'Any native button type',
                default: '<code>button</code>'
            },
            {
                name: '<code>tag</code>',
                description: 'Button tag name',
                type: 'String',
                values: '<code>button</code>, <code>a</code>, <code>input</code>, <code>router-link</code>, <code>nuxt-link</code> or other nuxt alias',
                default: '<code>button</code>'
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
            },
            {
                name: '<code>[any].native</code>',
                description: 'Listen to any event using this syntax, e.g <code>mousedown.native</code>',
                parameters: '<code>event: $event</code>'
            }
        ]
    }
]
