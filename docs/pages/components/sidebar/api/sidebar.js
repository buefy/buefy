export default [
  {
      title: 'Sidebar',
      props: [
            {
                name: '<code>open</code>',
                description: 'To control the behaviour of the sidebar programmatically, use the <code>.sync</code> modifier to make it two-way binding',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>position</code>',
                description: 'Set display position of sidebar',
                type: 'String',
                values: '<code>fixed</code>,<code>static</code>,<code>absolute</code>',
                default: '<code>fixed</code>'
            },
            {
              name: '<code>type</code>',
              description: 'Type (color) of the background, optional',
              type: 'String, ',
              values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                  <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                  <code>is-warning</code>, <code>is-danger</code>,
                  and any other colors you've set in the <code>$colors</code> list on Sass`,
              default: '—'
            },
            {
                name: '<code>can-cancel</code>',
                description: `Can close Sidebar pressing escape or clicking outside`,
                type: 'Boolean, Array',
                values: '<code>escape</code>, <code>outside</code>',
                default: `<code>['escape', 'outside']</code>`
            },
            {
                name: '<code>on-cancel</code>',
                description: `Callback function to call after user canceled (clicked 'X' / pressed escape / clicked outside)`,
                type: 'Function',
                values: '—',
                default: '—'
            },
            {
                name: '<code>fullwidth</code>',
                description: 'Show sidebar in fullwidth.',
                type: 'Boolean',
                values: '-',
                default: '<code>false</code>'
            },
            {
                name: '<code>fullheight</code>',
                description: 'Show sidebar in fullheight.',
                type: 'Boolean',
                values: '-',
                default: '<code>false</code>'
            },
            {
                name: '<code>mobile</code>',
                description: 'Custom layout on mobile',
                type: 'String',
                values: '<code>fullwidth</code>,<code>reduce</code>,<code>hide</code>',
                default: '—'
            },
            {
                name: '<code>right</code>',
                description: 'Show the sidebar on right',
                type: 'Boolean',
                values: '',
                default: '<code>false</code>'
            },
            {
                name: '<code>overlay</code>',
                description: 'Show an overlay when sidebar is open',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>expand-on-hover</code>',
                description: 'Expand sidebar on hover when <code>reduced</code> or <code>mobile</code> is <code>reduce</code>',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>expand-on-hover-fixed</code>',
                description: 'Expand sidebar on hover with fixed position when <code>reduced</code> or <code>mobile</code> is <code>reduce</code>',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>reduce</code>',
                description: 'Show a small sidebar',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>scroll</code>',
                description: `<code>clip</code> to remove the <code>&lt;body&gt;</code> scrollbar, <code>keep</code> to have a non scrollable scrollbar
                    to avoid shifting background, but will set <code>&lt;body&gt;</code> to position fixed, might break some layouts`,
                type: 'String',
                values: '<code>clip</code>, <code>keep</code>',
                default: '<code>clip</code>'
            },
      ],
      slots: [
          {
            name: 'default',
            description: 'Content of sidebar',
            props: '—'
          }
      ],
      events: [
        {
            name: '<code>close</code>',
            description: 'Triggers when user closed/canceled',
            parameters: '—'
        }
    ]
  }
]
