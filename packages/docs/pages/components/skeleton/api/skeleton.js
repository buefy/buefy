export default [
    {
        props: [
            {
                name: '<code>active</code>',
                description: 'Show or hide loader',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>animated</code>',
                description: 'Display a loading animation',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>rounded</code>',
                description: 'Rounded style',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>size</code>',
                description: 'Vertical size of skeleton, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>width</code>',
                description: 'Custom width',
                type: 'String, Number',
                values: '—',
                default: '<code>-</code>'
            },
            {
                name: '<code>height</code>',
                description: 'Custom height',
                type: 'String, Number',
                values: '—',
                default: '<code>-</code>'
            },
            {
                name: '<code>circle</code>',
                description: 'Show a circle shape',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>count</code>',
                description: 'Number of shapes to display',
                type: 'Number',
                values: '—',
                default: '<code>1</code>'
						},
            {
                name: '<code>position</code>',
                description: 'Position of the skeleton, optional',
                type: 'String',
                values: '<code>is-centered</code>, <code>is-right</code>',
                default: '—'
						},
        ]
    }
]
