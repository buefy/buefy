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
                description: 'Reduce width on mobile',
                type: 'Boolean',
                values: '—',
                default: 'false'
            },
            {
                name: '<code>static</code>',
                description: 'Add the sidebar in the current position',
                type: 'Boolean',
                values: '—',
                default: 'false'
            },
            {
                name: '<code>modal</code>',
                description: 'Show a modal background when sidebar is open',
                type: 'Boolean',
                values: '—',
                default: 'false'
            },
            {
                name: '<code>right</code>',
                description: 'Show the sidebar on right',
                type: 'Boolean',
                values: '—',
                default: 'false'
            },
            {
                name: '<code>container</code>',
                description: 'DOM element the sidebar will be created on.',
                type: 'String',
                values: '—',
                default: '<code>body</code>'
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
            description: 'Triggers when user closed/canceled or called programmatically from the injected component',
            parameters: '—'
        }
    ]
  }
]
