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
                default: '<code>star</code>'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fad</code>, <code>fal</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>size</code>',
                description: 'Size for rate include <code>show-text</code>, <code>show-score</code> and <code>custom-text</code>, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>spaced</code>',
                description: 'Add spacing for icons',
                type: 'Boolean',
                values: '—',
                default: '<code>False</code>'
            },
            {
                name: '<code>disabled</code>',
                description: 'Read only is for displaying rating score. Support decimal value for star.',
                type: 'Boolean',
                values: '—',
                default: '<code>False</code>'
            },
            {
                name: '<code>show-score</code>',
                description: 'Display value.',
                type: 'Boolean',
                values: '—',
                default: '<code>False</code>'
            },
            {
                name: '<code>show-text</code>',
                description: 'Display texts template. <code>show-score</code> and <code>show-text</code> cannot be true at the same time.',
                type: 'Boolean',
                values: '—',
                default: '<code>False</code>'
            },
            {
                name: '<code>custom-text</code>',
                description: 'Display custom text and only for <code>show-score</code>, like total points or total review.',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>texts</code>',
                description: 'Texts template for <code>show-text</code>.',
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
