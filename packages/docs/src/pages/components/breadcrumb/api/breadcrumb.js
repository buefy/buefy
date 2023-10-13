export default [
    {
        title: 'Breadcrumb',
        props: [
            {
                name: '<code>align</code>',
                description: 'Breadcrumb alignment.',
                type: 'String',
                values: '<code>is-left</code>, <code>is-centered</code>, <code>is-right</code>',
                default: '<code>is-right</code>'
            },
            {
                name: '<code>separator</code>',
                description: 'Symbol that separates the breadcrumb items.',
                type: 'String',
                values: '<code>has-arrow-separator</code>, <code>has-bullet-separator</code>, <code>has-dot-separator</code>, <code>has-succeeds-separator</code>',
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'The breadcrumb size',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '<code>is-medium</code>'
            }
        ]
    },
    {
        title: 'Breadcrumb Item',
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
