export default [
    {
        title: 'Pagination',
        props: [
            {
                name: '<code>total</code>',
                description: `Total count of items`,
                type: 'Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>per-page</code>',
                description: 'Items count for each page',
                type: 'Number',
                values: '—',
                default: '<code>20</code>'
            },
            {
                name: '<code>range-before</code>',
                description: 'Number of pagination items to show before current page',
                type: 'Number',
                values: '—',
                default: '<code>1</code>'
            },
            {
                name: '<code>range-after</code>',
                description: 'Items to paginatation items to show after current page',
                type: 'Number',
                values: '—',
                default: '<code>1</code>'
            },
            {
                name: '<code>current</code>',
                description: 'Current page number, use the <code>.sync</code> modifier to make it two-way binding',
                type: 'Number',
                values: '—',
                default: '<code>1</code>'
            },
            {
                name: '<code>order</code>',
                description: 'Buttons order, optional',
                type: 'String',
                values: '<code>is-centered</code>, <code>is-right</code>',
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'Pagination size, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>simple</code>',
                description: 'Simpler style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>rounded</code>',
                description: 'Rounded button styles',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fad</code>, <code>fal</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>icon-prev</code>',
                description: 'Icon to use for previous button',
                type: 'String',
                values: '—',
                default: '<code>chevron-left</code>'
            },
            {
                name: '<code>icon-next</code>',
                description: 'Icon to use for next button',
                type: 'String',
                values: '—',
                default: '<code>chevron-right</code>'
            },
            {
                name: '<code>aria-next-label</code>',
                description: 'Accessibility label for the next page link.',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>aria-previous-label</code>',
                description: 'Accessibility label for the previous page link.',
                type: 'String',
                values: '—',
                default: '—'
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
            },
            {
                name: '<code>page-input</code>',
                description: `Include page number input.`,
                type: 'Boolean',
                values: '—',
                default: 'false'
            },
            {
                name: '<code>page-input-position</code>',
                description: `Page input position.`,
                type: 'String',
                values: '<code>is-input-right</code>, <code>is-input-left</code>',
                default: '—'
            },
            {
                name: '<code>debounce-page-input</code>',
                description: `Sets the page input debounce time (in milliseconds)`,
                type: 'Number',
                values: '—',
                default: '—'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'This is to customize numbered pagination buttons with the Button subcomponent.',
                props: '<code>:page="props.page"</code>'
            },
            {
                name: 'next',
                description: 'This is to customize the next pagination button with the Button subcomponent.',
                props: '<code>:page="props.page"</code>'
            },
            {
                name: 'previous',
                description: 'This is to customize the previous pagination button with the Button subcomponent.',
                props: '<code>:page="props.page"</code>'
            }
        ],
        events: [
            {
                name: '<code>change</code>',
                description: 'Triggers when the current page is changed',
                parameters: '<code>value: Number</code>'
            }
        ]
    },
    {
        title: 'Button',
        props: [
            {
                name: '<code>page</code>',
                description: 'The prop page need to be passed upon the component (<code>:page="props.page"</code>).',
                type: 'Object',
                values: '—',
                default: '—'
            },
            {
                name: '<code>tag</code>',
                description: 'Button tag name',
                type: 'String',
                values: '<code>a</code>, <code>button</code>, <code>input</code>, <code>router-link</code>, <code>nuxt-link</code> or other nuxt alias',
                default: '<code>a</code>'
            }
        ],
        slots: [
            {
                name: 'default',
                description: '<strong>Required</strong>, pagination button content',
                props: '-'
            }
        ]
    }
]
