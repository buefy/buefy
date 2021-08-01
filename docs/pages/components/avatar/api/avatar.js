export default [
    {
        props: [
            {
                name: '<code>type</code>',
                description: 'Type (color) of the avatar when there is not image provided, optional',
                type: 'String',
                values: `<code>has-background-black</code>, <code>has-background-link</code>,
                    <code>has-background-dark</code>, <code>has-background-primary</code>, <code>has-background-info</code>, <code>has-background-success</code>,
                    <code>has-background-warning</code>, <code>has-background-danger</code>`,
                default: '<code>has-background-primary</code>'
            },
            {
                name: '<code>size</code>',
                description: 'Size of avatar, optional',
                type: 'String',
                values: '<code>16x16</code>, <code>24x24</code>, <code>32x32</code>, <code>48x48</code>, <code>64x64</code>, <code>96x96</code>, <code>128x128</code>',
                default: '<code>48x48</code>'
            },
            {
                name: '<code>rounded</code>',
                description: 'Rounded style, optional',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>src</code>',
                description: 'image src',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>label</code>',
                description: 'Shortcut or full username',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>alt</code>',
                description: 'A little description about the avatar, optional',
                type: 'String',
                values: '—',
                default: 'This is avatar for the user'
            },
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
