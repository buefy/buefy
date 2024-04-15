export default [
    {
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Active state - set on `true` to reopen after close',
                type: 'Boolean',
                values: '—',
                default: 'true'
            },
            {
                name: '<code>type</code>',
                description: 'Type (color) of the notification, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '—'
            },
            {
                name: '<code>active</code>',
                description: 'Whether notification is active or not, use the <code>.sync</code> modifier to make it two-way binding',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>closable</code>',
                description: `Adds an 'X' button that closes the notification`,
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>auto-close</code>',
                description: `Hide notification after <code>duration</code>`,
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>duration</code>',
                description: 'Visibility duration in miliseconds',
                type: 'Number',
                values: '—',
                default: '<code>2000</code>'
            },
            {
                name: '<code>progress-bar</code>',
                description: 'remaining seconds before the alert will close (in seconds)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>animation</code>',
                description: 'Custom animation (transition name)',
                type: 'String',
                values: '—',
                default: '<code>fade</code>'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fad</code>, <code>fal</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>has-icon</code>',
                description: 'Adds an icon on the left side depending on the <code>type</code> (or the <code>icon</code> prop if defined)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>icon</code>',
                description: 'Icon name to use with <code>has-icon</code>',
                type: 'Boolean',
                values: '—',
                default: '—'
            },
            {
                name: '<code>icon-size</code>',
                description: 'Size of the icon, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: 'Depends on <code>size</code> prop'
            },
            {
                name: '<code>aria-close-label</code>',
                description: 'Label for the close button, to be read by accessibility screenreaders.',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>message</code>',
                description: 'Message text (can contain HTML). <div class="notification is-danger">Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to <a href="https://en.wikipedia.org/wiki/Cross-site_scripting" target="_blank" rel="noopener">XSS vulnerabilities</a>. Only use HTML interpolation on trusted content and never on user-provided content.</div>',
                type: 'String, Array<VNode>',
                values: '—',
                default: '—'
            },
            {
                name: '<code>position</code>',
                description: 'Which position the notification will appear when opened programmatically',
                type: 'String',
                values: '<code>is-top-right</code>, <code>is-top</code>, <code>is-top-left</code>, <code>is-bottom-right</code>, <code>is-bottom</code>, <code>is-bottom-left</code>',
                default: '<code>is-top-right</code>'
            },
            {
                name: '<code>queue</code>',
                description: 'If should queue with others notices (snackbar/toast/notification)',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>indefinite</code>',
                description: 'Show the Notification indefinitely until it is dismissed when opened programmatically',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>pause-on-hover</code>',
                description: 'Pause and show on hover until hover off when opened programmatically, if indefinite is false.',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>container</code>',
                description: 'DOM element the toast will be created on. Note that this also changes the <code>position</code> of the toast from <code>fixed</code> to <code>absolute</code>. Meaning that the container should be <code>fixed</code>.',
                type: 'String',
                values: '—',
                default: '<code>body</code>'
            }
        ],
        events: [
            {
                name: '<code>close</code>',
                description: 'Triggers when user closes the notification',
                parameters: '—'
            },
            {
                name: '<code>click</code>',
                description: 'Triggers when user clicks the notification',
                parameters: '—'
            },
        ]
    }
]
