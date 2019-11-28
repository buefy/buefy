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
                default: '<code>3500</code>'
            },
            {
                name: '<code>has-drag</code>',
                description: 'Toggle touch dragging, when touch not detected. auto switch mouse dragging',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
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
                description: 'Icon to use for previous arrow',
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
                name: '<code>indicator-background</code>',
                description: 'Added background for indicator',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>indicator-custom</code>',
                description: 'use when the image is more than 6 so that the indicator is not too small',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>indicator-custom-size</code>',
                description: 'image size on the indicator when the <code>indicator-custom</code> is used',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>',
                default: '<code>is-small</code>'
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
                name: '<code>indicator-position</code>',
                description: 'Position indicator only when <code>indicator-inside</code>',
                type: 'String',
                values: '<code>is-bottom</code>, <code>is-top</code>',
                default: '<code>is-bottom</code>'
            },
            {
                name: '<code>indicator-style</code>',
                description: 'Style for indicator of carousel',
                type: 'String',
                values: '<code>is-boxs</code>, <code>is-dots</code>, <code>is-lines</code>',
                default: '<code>is-dots</code>'
            },
            {
                name: '<code>overlay</code>',
                description: 'Switch like a gallery',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>progress</code>',
                description: 'Display the progress item of carousel',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>progress-type</code>',
                description: 'Type (color) of the progress, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '<code>is-primary</code>'
            }
        ],
        slots: [
            {
                name: '<code>indicators</code>',
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
