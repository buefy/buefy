export default [
  {
      title: 'Navbar',
      props: [
          {
              name: '<code>transparent</code>',
              description: 'To seamlessly integrate the navbar in any visual context, you can add the is-transparent modifier on the navbar component. This will remove any hover or active background from the navbar items',
              type: 'Boolean',
              values: '—',
              default: 'false'
          },
          {
              name: '<code>fixedTop</code>',
              description: 'Fixes the navbar to the top of the page',
              type: 'Boolean',
              values: '—',
              default: '<code>false</code>'
          },
          {
              name: '<code>fixedBottom</code>',
              description: 'Fixes the navbar to the bottom of the page',
              type: 'Boolean',
              values: '—',
              default: '<code>false</code>'
          },
          {
              name: '<code>isActive</code>',
              description: 'To control the behaviour of the mobile menu programmatically',
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
      ],
      events: [
          {
              name: '<code>update:isActive</code>',
              description: 'To sync the isActive prop',
              parameters: '<code>value: Boolean</code>'
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
            description: '',
            props: '—'
          },
          {
            name: 'end',
            description: '',
            props: '—'
          },
      ]
  },
  {
      title: 'Navbar Item',
      props: [
          {
              name: '<code>tag</code>',
              description: 'Sets the type of the component that have to render as navbar-item',
              type: 'Boolean',
              values: '<code>a</code>, <code>router-link</code>, <code>div</code> and his html attributes like href, to, etc...',
              default: 'a'
          }
      ]
  }
]
