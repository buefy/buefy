export default [
  {
      title: 'Navbar',
      props: [
          {
              name: '<code>transparent</code>',
              description: 'Remove any hover or active background from the navbar items',
              type: 'Boolean',
              values: '—',
              default: 'false'
          },
          {
              name: '<code>fixed-top</code>',
              description: 'Fixes the navbar to the top of the page',
              type: 'Boolean',
              values: '—',
              default: '<code>false</code>'
          },
          {
              name: '<code>fixed-bottom</code>',
              description: 'Fixes the navbar to the bottom of the page',
              type: 'Boolean',
              values: '—',
              default: '<code>false</code>'
          },
          {
              name: '<code>active</code>',
              description: 'To control the behaviour of the mobile menu programmatically, use the <code>.sync</code> modifier to make it two-way binding',
              type: 'Boolean',
              values: '—',
              default: '<code>false</code>'
          },
          {
            name: '<code>centered</code>',
            description: 'To center the navbar-start slot',
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
                name: '<code>wrapper-class</code>',
                description: 'To wrap the navbar content into an div with the provided class',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>close-on-click</code>',
                description: 'Control the behavior of the mobile menu by clicking on a link or outside the menu',
                type: 'Boolean',
                values: '<code>true</code>, <code>false</code>',
                default: '<code>true</code>'
            },
            {
                name: '<code>mobile-burger</code>',
                description: 'Use to display or not the burger on mobile resolution.',
                type: 'Boolean',
                values: '<code>true</code>, <code>false</code>',
                default: '<code>true</code>'
            },
            {
                name: '<code>spaced</code>',
                description: 'Sets Top and Bottom paddings with 1rem, Left and Right paddings with 2rem',
                type: 'Boolean',
                values: '—',
                default: 'false'
            },
            {
                name: '<code>shadow</code>',
                description: 'Add a shadow to navbar',
                type: 'Boolean',
                values: '<code>true</code>, <code>false</code>',
                default: 'false'
            }
      ],
      slots: [
          {
            name: 'brand',
            description: 'The slot for the brand logo',
            props: '—'
          },
          {
            name: 'burger',
            description: 'The slot for the burger that triggers the menu toggle',
            props: '<code>isOpened: Boolean</code>, <code>toggleActive: Function</code>'
          },
          {
            name: 'start',
            description: 'Items that will appear on the left',
            props: '—'
          },
          {
            name: 'end',
            description: 'Items that  will appear on the right',
            props: '—'
          },
      ]
  },
  {
    title: 'Item',
    props: [
        {
            name: '<code>tag</code>',
            description: 'Sets the type of the component that have to render as navbar-item',
            type: 'String',
            values: '<code>a</code>, <code>router-link</code>, <code>div</code> and it\'s html attributes like href, to, etc...',
            default: 'a'
        },
        {
            name: '<code>active</code>',
            description: 'Item is active',
            type: 'Boolean',
            values: '-',
            default: 'false'
        }
    ]
  },
  {
    title: 'Dropdown',
    props: [
        {
            name: '<code>tag</code>',
            description: 'Sets the type of the component that have to render as navbar-item',
            type: 'String',
            values: '<code>a</code>, <code>router-link</code>, <code>div</code> and it\'s html attributes like href, to, etc...',
            default: 'a'
        },
        {
            name: '<code>hoverable</code>',
            description: 'Dropdown will be triggered by hover instead of click',
            type: 'Boolean',
            values: '-',
            default: 'false'
        },
        {
            name: '<code>active</code>',
            description: 'Item is active',
            type: 'Boolean',
            values: '-',
            default: 'false'
        },
        {
            name: '<code>right</code>',
            description: 'Dropdown will be anchored to the right side',
            type: 'Boolean',
            values: '-',
            default: 'false'
        },
        {
            name: '<code>arrowless</code>',
            description: 'Show/hide arrow icon on dropdown',
            type: 'Boolean',
            values: '-',
            default: 'false'
        },
        {
            name: '<code>boxed</code>',
            description: 'Show a boxed version of the dropdown',
            type: 'Boolean',
            values: '-',
            default: 'false'
        },
        {
            name: '<code>collapsible</code>',
            description: 'Collapsible dropdown on mobile',
            type: 'Boolean',
            values: '',
            default: 'false'
        }
    ],
    slots: [
        {
            name: 'default',
            description: 'Menu item body',
            props: '—'
        },
        {
            name: '<code>label</code>',
            description: 'Dropdown menu custom label',
            props: '-'
        }
    ],
    events: [
        {
            name: '<code>active-change</code>',
            description: 'Triggers when dropdown is activated or deactivated (visibility of list)',
            parameters: '<code>active: Boolean</code>'
        }
    ]
  }
]
