export default [
    {
        title : 'Backtotop',
        props: [
            {
                name: '<code>position</code>',
                description: 'Fixed Position.',
                type: 'String',
                values: '<code>is-top-left</code>, <code>is-top-right</code>, <code>is-bottom-left</code>',
                default: '_'
            },
            {
                name: '<code>duration</code>',
                description: 'Duration when back to top.',
                type: 'String',
                values: '_',
                default: '1000'
            },
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
        ]
    },
    {
        title : 'Breadcrumb Item',
        props: [
            {
                name: '<code>tag</code>',
                description: "a, router-link and it's html attributes like href, to, etc...",
                type: 'String',
                values: '<code>router-link</code>, <code>a</code>',
                default: '<code>a</code>'
            },
             {
                name: '<code>active</code>',
                description: 'is the current breadcrumb is actually the current page.',
                type: 'Boolean',
                values: '<code>false</code>, <code>true</code>',
                default: '<code>false</code>'
            }
        ]
    }
]
