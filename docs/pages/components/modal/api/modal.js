export default [
    {
        props: [
            {
                name: '<code>active</code>',
                description: 'Whether modal is active or not, use the <code>.sync</code> modifier to make it two-way binding',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>component</code>',
                description: `Component to be injected, used to open a component modal programmatically.
                    Close modal within the component by emitting a 'close' event — <code>this.$emit('close')</code>`,
                type: 'Object, Function',
                values: '—',
                default: '—'
            },
            {
                name: '<code>parent</code>',
                description: `Parent component of the modal, <strong>required</strong> if using <code>component</code>`,
                type: 'Vue',
                values: '—',
                default: '—'
            },
            {
                name: '<code>props</code>',
                description: 'Props to be binded to the injected component',
                type: 'Object',
                values: '—',
                default: '—'
            },
            {
                name: '<code>events</code>',
                description: 'Events to be binded to the injected component',
                type: 'Object',
                values: '—',
                default: '—'
            },
            {
                name: '<code>content</code>',
                description: 'HTML content',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>width</code>',
                description: 'Width of the Modal',
                type: 'Number, String',
                values: '—',
                default: '<code>960</code>'
            },
            {
                name: '<code>has-modal-card</code>',
                description: `If your modal content has a <code>.modal-card</code> as root, add this prop or the card might break on mobile`,
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>animation</code>',
                description: 'Custom animation (transition name)',
                type: 'String',
                values: '—',
                default: '<code>zoom-out</code>'
            },
            {
                name: '<code>can-cancel</code>',
                description: `Can close Modal by clicking 'X', pressing escape or clicking outside`,
                type: 'Boolean, Array',
                values: '<code>escape</code>, <code>x</code>, <code>outside</code>',
                default: `<code>['escape', 'x', 'outside']</code>`
            },
            {
                name: '<code>on-cancel</code>',
                description: `Callback function to call after user canceled (clicked 'X' / pressed escape / clicked outside)`,
                type: 'Function',
                values: '—',
                default: '—'
            },
            {
                name: '<code>scroll</code>',
                description: `<code>clip</code> to remove the <code>&lt;body&gt;</code> scrollbar, <code>keep</code> to have a non scrollable scrollbar
                    to avoid shifting background, but will set <code>&lt;body&gt;</code> to position fixed, might break some layouts`,
                type: 'String',
                values: '<code>clip</code>, <code>keep</code>',
                default: '<code>clip</code>'
            }
        ],
        events: [
            {
                name: '<code>close</code>',
                description: 'Triggers when user closed/canceled or called programmatically from the injected component',
                parameters: '—'
            }
        ]
    }
]
