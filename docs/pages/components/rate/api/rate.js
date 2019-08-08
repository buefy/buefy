export default [
    {
        title: 'Rate',
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'Number',
                values: '—',
                default: '<code>0</code>'
            },
            {
                name: '<code>max</code>',
                description: 'Max rating score',
                type: 'Number',
                values: '—',
                default: '<code>5</code>'
            },
            {
                name: '<code>icon</code>',
                description: 'to specify the icon',
                type: 'String',
                values: '—',
                default: '<code>fas fa-star</code>'
            },
            {
                name: '<code>size</code>',
                description: 'Size of the rate include <code>show-text</code>, <code>show-score</code> and <code>custom-text</code>, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>disabled</code>',
                description: 'Read-only Rate is for displaying rating score. Half star is supported',
                type: 'Boolean',
                values: '—',
                default: '<code>False</code>'
            },
            {
                name: '<code>show-score</code>',
                description: 'Display value, when disabled this default true.',
                type: 'Boolean',
                values: '—',
                default: '<code>False</code>'
            },
            {
                name: '<code>show-text</code>',
                description: 'Display texts template. <code>show-score</code> and <code>show-text</code> cannot be true at the same time',
                type: 'Boolean',
                values: '—',
                default: '<code>False</code>'
            },
            {
                name: '<code>custom-text</code>',
                description: 'Display custom text only for <code>show-score</code>, like total Points or total user rating.',
                type: 'String',
                values: '—',
                default: '<code>—</code>'
            },
            {
                name: '<code>texts</code>',
                description: 'Texts template for <code>show-text</code>',
                type: 'Array',
                values: '—',
                default: '<code>Very Bad</code>, <code>Bad</code>, <code>Good</code>, <code>Very Good</code>, <code>Awesome</code>'
            },
        ],
        events: [ 
            {
                name: '<code>change</code>',
                description: 'Triggers when rate value is changed',
                parameters: '<code>value: Boolean</code>'
            }
        ]
    }
]