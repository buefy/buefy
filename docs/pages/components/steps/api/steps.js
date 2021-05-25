export default [
    {
        title: 'Steps',
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value, step index. Passing undefined will show the first step',
                type: 'Number, String',
                values: '—',
                default: '<code>undefined</code>'
            },
            {
                name: '<code>animated</code>',
                description: 'Steps have slide animation',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>animateInitially</code>',
                description: 'Apply animation on the initial render',
                type: 'Boolean',
                values: '—',
                default: '<code>undefined</code>'
            },
            {
                name: '<code>animation</code>',
                description: 'Custom animation (transition name)',
                type: 'String',
                values: '—',
                default: '<code>slide-next</code> <code>slide-prev</code>'
            },
            {
                name: '<code>type</code>',
                description: 'Default Type/Style for the steps, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'Size of the step, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>destroy-on-hide</code>',
                description: 'Destroy stepitem on hide',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use for the navigation',
                type: 'String',
                values: '—',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>icon-prev</code>',
                description: 'Icon to use for navigation button',
                type: 'String',
                values: '—',
                default: '<code>chevron-left</code>'
            },
            {
                name: '<code>icon-next</code>',
                description: 'Icon to use for navigation button',
                type: 'String',
                values: '—',
                default: '<code>chevron-right</code>'
            },
            {
                name: '<code>has-navigation</code>',
                description: `Next and previous buttons below the component.
                    You can use this property if you want to use your own custom navigation items.`,
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>vertical</code>',
                description: 'Display the steps vertically',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>position</code>',
                description: 'Position of the vertical step, optional',
                type: 'String',
                values: '<code>is-right</code>',
                default: '—'
            },
            {
                name: '<code>label-position</code>',
                description: 'Position of the marker label, optional',
                type: 'String',
                values: '<code>bottom</code>, <code>right</code>, <code>left</code>',
                default: '<code>bottom</code>'
            },
            {
                name: '<code>rounded</code>',
                description: 'Rounded step markers',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>mobile-mode</code>',
                description: 'How Steps will be displayed for mobile user',
                type: 'String',
                values: `<code>minimalist</code>: Only the active Step is displayed,
                    <code>compact</code>: Step label is displayed only for the active,
                    <code>null</code>: Will keep the same behavior as desktop`,
                default: '<code>minimalist</code>'
            },
            {
                name: '<code>aria-page-label</code>',
                description: 'Accessibility label for the page link. If passed, this text will be prepended to the number of the page.',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>aria-current-label</code>',
                description: 'Accessibility label for the current page link. If passed, this text will be prepended to the current page.',
                type: 'String',
                values: '—',
                default: '—'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Step body where <code>step-item</code> can be included',
                props: '—'
            },
            {
                name: 'navigation',
                description: 'Used to customize navigation button',
                props: '<code>{previous, next}</code>: Each object contains <code>disabled: boolean</code> and <code>action: Function</code>'
            }
        ],
        events: [
            {
                name: '<code>input</code>',
                description: 'Triggers when active step is changed',
                parameters: '<code>value: String|Number</code>'
            }
        ],
    },
    {
        title: 'Item',
        props: [
            {
                name: '<code>step</code>',
                description: 'Step marker content (when there is no icon)',
                type: 'String | Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>label</code>',
                description: 'Step label',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>value</code>',
                description: 'Step identifier',
                type: 'String',
                values: '—',
                default: 'Vnode uid'
            },
            {
                name: '<code>type</code>',
                description: `Default Type/Style for the step, optional.
                    This will override parent type. Could be used to set a completed step to
                    <code>is-success</code> for example`,
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '—'
            },
            {
                name: '<code>icon</code>',
                description: 'Icon name',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '—',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>clickable</code>',
                description: `Item can be used directly to navigate.
                    If undefined, previous steps are clickable while the others are not.`,
                type: 'Boolean',
                values: '—',
                default: '—'
            },
            {
                name: '<code>visible</code>',
                description: 'Item is visible',
                type: 'Boolean',
                values: '-',
                default: 'true'
            },
            {
                name: '<code>headerClass</code>',
                description: 'The classes to add to the step label container',
                type: 'String, Array, Object',
                values: '-',
                default: '-'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Step item body',
                props: '—'
            }
        ]
    }
]
