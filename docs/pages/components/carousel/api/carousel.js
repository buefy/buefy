export default [
    {
        title: 'Carousel',
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'Number',
                values: '—',
                default: '<code>0</code>'
            },
            {
                name: '<code>animated</code>',
                description: 'Transition effect',
                type: 'String',
                values: '<code>fade</code>, <code>slide</code>',
                default: '<code>slide</code>'
            },
            {
                name: '<code>interval</code>',
                description: 'Interval of the <code>autoplay</code>, in milliseconds',
                type: 'Number',
                values: '—',
                default: '<code>3000</code>'
            },
            {
                name: '<code>autoplay</code>',
                description: 'Whether automatically loop the slides',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>pause-hover</code>',
                description: 'Pause carousel when autoplay and mouse enter',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>pause-info</code>',
                description: 'Show infomation pause when autoplay and mouse enter',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>arrow</code>',
                description: '	Display the "next" and "prev" action',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>arrow-both</code>',
                description: 'Display the "next" and "prev" action when first or last item',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>arrow-hover</code>',
                description: 'Display the "next" and "prev" action when hover',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fab</code>,  <code>fad</code>, <code>fal</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>icon-size</code>',
                description: 'Arrow icon size, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '<code>—</code>'
            },
            {
                name: '<code>icon-prev</code>',
                description: 'pause <code>autoplay</code> if the mouse enters the slide.',
                type: 'String',
                values: '—',
                default: '<code>chevron-left</code>'
            },
            {
                name: '<code>icon-next</code>',
                description: 'Icon to use for next arrow',
                type: 'String',
                values: '—',
                default: '<code>chevron-right</code>'
            },
            {
                name: '<code>indicator</code>',
                description: 'Display the indicator for jumping to specific item',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>indicator-inside</code>',
                description: 'Display the indicator inside on carousel',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>indicator-mode</code>',
                description: 'Trigger for action indicator',
                type: 'String',
                values: '<code>click</code>, <code>hover</code>',
                default: '<code>click</code>'
            },
            {
                name: '<code>indicator-style</code>',
                description: 'Style for indicator of carousel',
                type: 'String',
                values: '<code>is-boxs</code>, <code>is-dots</code>, <code>is-lines</code>',
                default: '<code>is-dots</code>'
            }
        ],
        slots: [
            {
                name: '<code>Indicators</code>',
                description: 'Custom indicators',
                props: '<code>i: Number</code>'
            }
        ],
        events: [
            {
                name: '<code>change</code>',
                description: 'Triggers when carousel item value is changed',
                parameters: '<code>value: Boolean</code>, <code>value: String</code>'
            },
            {
                name: '<code>input</code>',
                description: 'Triggers when <code>indicator-mode</code> value is changed',
                parameters: '<code>value: Boolean</code>, <code>value: String</code>'
            }
        ]
    }
]
