export default [
    {
        props: [
            {
                name: '<code>items</code>',
                description: 'Navigation items with <strong>label</strong> and <strong>path</strong> provided.',
                type: 'Array',
                values: '—',
                default: '—'
            },
            {
                name: '<code>align</code>',
                description: 'Breadcrumb alignment.',
                type: 'String',
                values: '<code>is-left</code>, <code>is-centered</code>, <code>is-right</code>',
                default: '<code>is-right</code>'
            },
            {
                name: '<code>separator</code>',
                description: 'Symbole that separates the bradcrumb items.',
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
    }
]
