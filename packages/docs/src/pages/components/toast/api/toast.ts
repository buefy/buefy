export default [
    {
        props: [
            {
                name: '<code>type</code>',
                description: 'Type (color) of the toast',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '<code>is-dark</code>'
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
                description: 'Which position the toast will appear',
                type: 'String',
                values: '<code>is-top-right</code>, <code>is-top</code>, <code>is-top-left</code>, <code>is-bottom-right</code>, <code>is-bottom</code>, <code>is-bottom-left</code>',
                default: '<code>is-top</code>'
            },
            {
                name: '<code>duration</code>',
                description: 'Visibility duration in milliseconds',
                type: 'Number',
                values: '—',
                default: '<code>2000</code>'
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
                description: 'Show indefinitely until it is dismissed programmatically',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>pause-on-hover</code>',
                description: 'Pause and show on hover until hover off (it works when indefinite is false)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>container</code>',
                description: 'DOM element the toast will be created on. Note that this also changes the <code>position</code> of the toast from <code>fixed</code> to <code>absolute</code>. Meaning that the container should be <code>fixed</code>. Also note that this will override the <code>defaultContainerElement</code> if you specified it in your Buefy Constructor Options. See Constructor options for more details.',
                type: 'String',
                values: '—',
                default: '<code>body</code>'
            }
        ]
    }
]
