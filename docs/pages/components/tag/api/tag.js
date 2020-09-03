export default [
    {
        title: 'Tag',
        props: [
            {
                name: '<code>type</code>',
                description: 'Type (color) of the tag, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '—'
            },
            {
                name: '<code>close-type</code>',
                description: 'Type (color) of the cross button of tag, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'Size of the tag, optional',
                type: 'String',
                values: '<code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>rounded</code>',
                description: 'Tag border rounded',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>closable</code>',
                description: 'Add close/delete button to the tag',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>attached</code>',
                description: 'Close/delete button style equal to attached tags',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>ellipsis</code>',
                description: 'Adds ellipsis to not overflow the text',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>tabstop</code>',
                description: 'If should stop when using tab key',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>disabled</code>',
                description: 'Disable delete button',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>aria-close-label</code>',
                description: 'Accessibility label for the close button',
                type: 'String',
                values: '—',
                default: '-'
            },
            {
                name: '<code>close-icon</code>',
                description: 'Replace times in close button with a customized icon. <code>closable</code> and <code>attached</code> props should be needed.',
                type: 'String',
                values: '—',
                default: '-'
            },
            {
                name: '<code>close-icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fab</code>,  <code>fad</code>, <code>fal</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>close-icon-type</code>',
                description: 'Type (color) of the close icon of tag, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '—'
            }
        ],
        events: [
            {
                name: '<code>close</code>',
                description: 'Triggers when close/delete button is clicked or <b>delete</b> key is pressed',
                parameters: '—'
            }
        ]
    },
    {
        title: 'Taglist',
        props: [
            {
                name: '<code>attached</code>',
                description: 'Tags inside are attached together',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            }
        ]
    }
]
