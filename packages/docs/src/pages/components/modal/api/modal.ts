export default [
    {
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Whether modal is active or not',
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
                name: '<code>programmatic</code>',
                description: 'Indicates if the modal was created programmatically',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
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
                description: 'HTML content <div class="notification is-danger">Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to <a href="https://en.wikipedia.org/wiki/Cross-site_scripting" target="_blank" rel="noopener">XSS vulnerabilities</a>. Only use HTML interpolation on trusted content and never on user-provided content.</div>',
                type: 'String, Array<VNode>',
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
                name: '<code>full-screen</code>',
                description: 'Display modal as full screen',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
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
            },
            {
                name: '<code>trap-focus</code>',
                description: `Trap focus inside the modal.`,
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>auto-focus</code>',
                description: `Automatically focus modal when active.`,
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>custom-class</code>',
                description: 'CSS classes to be applied on modal',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>custom-content-class</code>',
                description: 'CSS classes to be applied on modal content',
                type: 'String, Array, Object',
                values: '—',
                default: '—'
            },
            {
                name: '<code>destroy-on-hide</code>',
                description: 'Destroy modal on hide',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>aria-role</code>',
                description: `Role attribute to be passed to modal container for better accessibility.`,
                type: 'String',
                values: '<code>dialog</code>, <code>alertdialog</code>',
                default: '—'
            },
            {
                name: '<code>aria-label</code>',
                description: `Aria label attribute to be passed to modal container for better accessibility.`,
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>aria-modal</code>',
                description: `Improve accessiblity when enabled.`,
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>close-button-aria-label</code>',
                description: `Aria label attribute to be passed to the close button for better accessibility.`,
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>render-on-mounted</code>',
                description: 'Create DOM for the modal content whether modal is active or not',
                type: 'Boolean',
                values: '-',
                default: '<code>false</code>'
            }
        ],
        events: [
            {
                name: '<code>close</code>',
                description: 'Triggers when user closed/canceled or called programmatically from the injected component',
                parameters: '—'
            },
            {
                name: '<code>after-enter</code>',
                description: 'Triggers when the modal transition <code>after-enter</code> hook is called.',
                parameters: '—'
            },
            {
                name: '<code>after-leave</code>',
                description: 'Triggers when the modal transition <code>after-leave</code> hook is called.',
                parameters: '—'
            },
            {
                name: '<code>update:modelValue</code>',
                description: 'Triggers when the modal visibility changes',
                parameters: '<code>value: Boolean</code>'
            },
            {
                name: '<code>cancel</code>',
                description: 'Triggers when user cancels the modal (escape, x, or outside click)',
                parameters: '<code>method: String</code> - The cancellation method (escape, x, outside)'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Modal content',
                props: '<code>canCancel: Boolean</code>, <code>close: Function</code>'
            }
        ],
        methods: [
            {
                name: '<code>close</code>',
                description: 'Programmatically close the modal',
                return: '—'
            },
            {
                name: '<code>cancel</code>',
                description: 'Programmatically cancel the modal with a specific method',
                parameters: '<code>method: String</code> - The cancellation method (escape, x, outside)',
                return: '—'
            }
        ]
    }
]
