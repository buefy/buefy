export default [
    {
        title: 'Steps',
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value, step index',
                type: 'Number',
                values: '—',
                default: '<code>0</code>'
            },
            {
                name: '<code>animated</code>',
                description: 'Steps have slide animation',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
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
                name: '<code>has-navigation</code>',
                description: `Next and previous buttons below the component.
                    You can use this property if you want to use your own custom navigation items.`,
                type: 'String',
                values: '—',
                default: '<code>true</code>'
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
        events: [
            {
                name: '<code>input</code>',
                description: 'Triggers when step is clicked',
                parameters: '<code>index: Number</code>'
            },
            {
                name: '<code>change</code>',
                description: 'Triggers when active step is changed',
                parameters: '<code>index: Number</code>'
            }
        ],
    },
    {
        title: 'Step Item',
        props: [
            {
                name: '<code>label</code>',
                description: 'Step label',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>type</code>',
                description: `Default Type/Style for the step, optional
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
