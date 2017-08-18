export default [
    {
        props: [
            {
                name: '<code>type</code>',
                description: 'Type (color) of the tooltip',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '<code>is-primary</code>'
            },
            {
                name: '<code>active</code>',
                description: 'Whether tooltip is active or not',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>label</code>',
                description: 'Tooltip text',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>position</code>',
                description: 'Tooltip position in relation to the element',
                type: 'String',
                values: '<code>is-top</code>, <code>is-bottom</code>, <code>is-left</code>, <code>is-right</code>',
                default: '<code>is-top</code>'
            },
            {
                name: '<code>always</code>',
                description: 'Tooltip will be always active',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>animated</code>',
                description: 'Tooltip will have a little fade animation',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>square</code>',
                description: 'Tooltip will be square (not rounded corners)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>dashed</code>',
                description: 'Tooltip slot will have a dashed underline',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>multilined</code>',
                description: 'Tooltip will be multilined',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>size</code>',
                description: 'Tooltip multiline size (only works for multilined tooltips)',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '<code>is-medium</code>'
            }
        ]
    }
]
