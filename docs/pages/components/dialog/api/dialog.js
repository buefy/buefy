export default [
    {
        props: [
            {
                name: '<code>type</code>',
                description: 'Type (color) of the confirm button (and the icon if <code>hasIcon</code>)',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '<code>is-primary</code>'
            },
            {
                name: '<code>title</code>',
                description: 'Dialog title',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>message</code>',
                description: 'Message text',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>hasIcon</code>',
                description: 'Adds an icon on the left side depending on the <code>type</code> or <code>icon</code>',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>icon</code>',
                description: 'Icon name if <code>hasIcon</code>, optional',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>iconPack</code>',
                description: 'Icon pack to use if <code>hasIcon</code>, optional',
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fad</code>, <code>fal</code>',
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'Dialog\'s size, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>animation</code>',
                description: 'Custom animation (transition name)',
                type: 'String',
                values: '—',
                default: '<code>zoom-out</code>'
            },
            {
                name: '<code>confirmText</code>',
                description: 'Text of the confirm button',
                type: 'String',
                values: '—',
                default: '<code>OK</code>'
            },
            {
                name: '<code>cancelText</code>',
                description: 'Text of the cancel button',
                type: 'String',
                values: '—',
                default: '<code>Cancel</code>'
            },
            {
                name: '<code>canCancel</code>',
                description: `Can close dialog by clicking cancel button, pressing escape or clicking outside`,
                type: 'Boolean, Array',
                values: '<code>escape</code>, <code>button</code>, <code>outside</code>',
                default: `<code>true</code> for Confirm/Prompt, <code>false</code> for Alert`
            },
            {
                name: '<code>inputAttrs</code>',
                description: `Prompt only: input's attributes`,
                type: 'Object',
                values: 'Any HTML5 input attribute',
                default: '—'
            },
            {
                name: '<code>onConfirm</code>',
                description: 'Callback function when the confirm button is clicked',
                type: 'Function (value: String)',
                values: '—',
                default: '—'
            },
            {
                name: '<code>onCancel</code>',
                description: 'Callback function when the dialog is canceled (cancel button is clicked / pressed escape / clicked outside)',
                type: 'Function',
                values: '—',
                default: '—'
            },
            {
                name: '<code>scroll</code>',
                description: `<code>clip</code> to remove the <code>&lt;body&gt;</code> scrollbar, <code>keep</code> to have a non scrollable scrollbar
                    to avoid shifting background, but will set <code>&lt;body&gt;</code> to position fixed, might break some layouts`,
                type: 'String',
                values: '<code>clip</code>, <code>keep</code>',
                default: '<code>clip</code>'
            },
            {
                name: '<code>focusOn</code>',
                description: 'Focus on confirm or cancel button (when dialog is not prompt)',
                type: 'String',
                values: '<code>confirm</code>, <code>cancel</code>',
                default: '<code>confirm</code>'
            }
        ]
    }
]
