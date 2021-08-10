export default [
    {
        props: [
            {
                name: '<code>type</code>',
                description: 'Type (color) of the avatar when there is not image provided, optional',
                type: 'String',
                values: `<code>has-background-black</code>, <code>has-background-link</code>,
                    <code>has-background-dark</code>, <code>has-background-primary</code>, <code>has-background-info</code>, <code>has-background-success</code>,
                    <code>has-background-warning</code>, <code>has-background-danger</code>, and any other colors you've set in the $colors list on Sass`,
                default: '<code>has-background-primary</code>'
            },
            {
                name: '<code>size</code>',
                description: 'Size of avatar, optional',
                type: 'String',
                values: '<code>is-16x16</code>, <code>is-24x24</code>, <code>is-32x32</code>, <code>is-48x48</code>, <code>is-64x64</code>, <code>is-96x96</code>, <code>is-128x128</code>',
                default: '<code>is-48x48</code>'
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
                name: '<code>src-fallback</code>',
                description: 'The image url you want to display if the image specified using <code>src</code> fails to load.',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>webp-fallback</code>',
                description: 'Fallback when using webp format. You can specify an extension only (.jpg, .jpeg, .png, .gif) if the filename is the same. You can use a full url if not.',
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
            {
                name: '<code>label</code>',
                description: 'Shortcut or full username',
                type: 'String',
                values: '—',
                default: '—'
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
