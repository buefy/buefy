export default [
    {
        props: [
            {
                name: '<code>text</code>',
                description: 'Text inside the button',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>to</code>',
                description: 'With this prop it will act as a router-link',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>href</code>',
                description: 'With this prop it will act as standard link',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>target</code>',
                description: 'Target attribute of the button (to be used with the <b>href</b> prop), optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>type</code>',
                description: 'Type attribute of the button',
                type: 'String',
                values: '<code>button</code>, <code>submit</code>, <code>reset</code>',
                default: '—'
            },
            {
                name: '<code>btn</code>',
                description: 'Class assigned following the <a href="https://bulma.io/documentation/elements/button/" target="_blank">bulma docs</a>.',
                type: 'String',
                values: '<code>is-primary</code>, <code>is-link</code>, <code>is-info</code>, <code>is-success</code>, <code>is-warning</code>, <code>is-danger</code>',
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'Size of the button, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '<code>is-normal</code>'
            },
            {
                name: '<code>icon</code>',
                description: 'Icon name to be added, optional',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>icon-size</code>',
                description: 'Size of the icon, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '<code>is-large</code> or <code>size</code> prop'
            },
            {
                name: '<code>icon-position</code>',
                description: 'Put the icon before or after the text',
                type: 'String',
                values: '<code>before</code>, <code>after</code>',
                default: '<code>before</code>'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fad</code>, <code>fal</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>icon-class</code>',
                description: `Add class to the button icon (<code>&lt;i&gt;</code> tag), optional.
                    <br>
                    See <a href="https://materialdesignicons.com/getting-started" target="_blank">here for MDI</a>,
                    <a href="http://fontawesome.io/examples/" target="_blank">here for FontAwesome 4</a> and
                    <a href="https://fontawesome.com/how-to-use/web-fonts-with-css#additional-styling" target="_blank">here for FontAwesome 5</a> custom classes`,
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>is-outlined</code>',
                description: 'Activates the outlined style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>is-inverted</code>',
                description: 'Activates the inverted style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>is-rounded</code>',
                description: 'Activates the rounded style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>is-hovered</code>',
                description: 'Activates the hovered state',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>is-focused</code>',
                description: 'Activates the focused state',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>is-active</code>',
                description: 'Activates the active state',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>is-loading</code>',
                description: 'Activates the loading state',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>no-default-class</code>',
                description: 'Removes the default <b>button</b> class',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            }
        ],
        events: [
            {
                name: '<code>click</code>',
                description: 'Triggers when clicked',
                parameters: '<code>event: $event</code>'
            }
        ]
    }
]
