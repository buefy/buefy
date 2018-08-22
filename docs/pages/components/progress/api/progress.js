export default [
    {
        props: [
            {
                name: '<code>value</code>',
                description: 'Progress value. This value is automatically synced',
                type: 'Number',
                values: '0.0 - 1.0',
                default: '<code>0.0</code>'
            },
            {
                name: '<code>size</code>',
                description: 'Size of the progressbar (see Bulma docs)',
                type: 'String',
                values:  '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '<code>null</code>'
            },
            {
                name: '<code>type</code>',
                description: 'Basically the color of the progressbar (see Bulma docs)',
                type: 'String',
                values:  '<code>is-primary</code>, <code>is-link</code>, <code>is-info</code>, <code>is-success</code>, <code>is-warning</code>, <code>is-danger</code>',
                default: '<code>is-primary</code>'
            },
            {
                name: '<code>showText</code>',
                description: 'Show a visible percentage text?',
                type: 'Boolean',
                values:  '<code>true</code>, <code>false</code>',
                default: '<code>true</code>'
            },
            {
                name: '<code>valueFormatter</code>',
                description: 'How the value shall be formatted to be displayed',
                type: 'Function',
                values:  '<i>any Function returning a string</i>',
                default: '<code>(v) => `${Math.floor(v * 100)} %`</code>'
            }
        ]
    }
]
