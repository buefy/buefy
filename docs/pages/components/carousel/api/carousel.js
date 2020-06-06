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
                description: 'Pause carousel when <code>autoplay</code> and mouse enter',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>pause-info</code>',
                description: 'Show infomation pause when <code>autoplay</code> and <code>pause-hover</code>',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>pause-info-type</code>',
                description: 'Type (color) of the pause-info, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '<code>is-white</code>'
            },
            {
                name: '<code>pause-text</code>',
                description: 'Text when pause',
                type: 'String',
                values: '—',
                default: '<code>Pause</code>'
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
                description: 'Display the "next" and "prev" action when hover, but hidden on mobile',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>repeat</code>',
                description: 'Controls whether the carousel loops around at the start and end.',
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
                values: '<code>is-boxes</code>, <code>is-dots</code>, <code>is-lines</code>',
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
            },
            {
                name: '<code>with-carousel-list</code>',
                description: 'use this when indicator custom with <code>b-carousel-list</code>',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            }
        ],
        slots: [
            {
                name: '<code>indicators</code>',
                description: 'Custom indicators',
                props: '<code>i: Number</code>'
            },
            {
                name: '<code>list</code>',
                description: 'Custom indicators When <code>with-carousel-list</code>',
                props: '<code>active: Number</code>, <code>switch: Number</code>'
            },
            {
                name: '<code>overlay</code>',
                description: 'Custom other when overlay',
                props: '—'
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
    },
    {
        title: 'List',
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'Number',
                values: '—',
                default: '<code>0</code>'
            },
            {
                name: '<code>data</code>',
                description: 'Carousel-list data',
                type: 'Array',
                values: '—',
                default: '—'
            },
            {
                name: '<code>config</code>',
                description: 'An object to pass all configs',
                type: 'Object',
                values: '—',
                default: '—'
            },
            {
                name: '<code>has-drag</code>',
                description: 'Toggle touch dragging, when touch not detected. auto switch mouse dragging',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>has-grayscale</code>',
                description: 'Give a effect grayscale on img',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>has-opacity</code>',
                description: 'Give a effect opacity on img',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>repeat</code>',
                description: 'Back to value 0 when item active same with total data',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>items-to-show</code>',
                description: 'count of items to showed per view (support a decimal).',
                type: 'Number',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>items-to-list</code>',
                description: 'count of items to list when use navigation buttons',
                type: 'Number',
                values: '<code>1-5</code>',
                default: '<code>1</code>'
            },
            {
                name: '<code>as-indicator</code>',
                description: 'Switch mode to indicator for carousel',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>refresh</code>',
                description: 'Refresh for overlay carousel',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>arrow</code>',
                description: 'Display the "next" or "prev" action when first or last item',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>arrow-hover</code>',
                description: 'Display Arrow action when hover, but hidden on mobile',
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
        ],
        slots: [
            {
                name: '<code>item</code>',
                description: 'Custom item',
                props: '<code>list: Array</code>, <code>index: Number</code>, <code>active: Number</code>'
            }
        ],
        events: [
            {
                name: '<code>switch</code>',
                description: 'Triggers when value is changed',
                parameters: '<code>value: Boolean</code>, <code>value: Number</code>, <code>value: String</code>'
            }
        ]
    }
]
