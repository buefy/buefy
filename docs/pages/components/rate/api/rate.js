export default [
  {
      title: 'Rate',
      props: [
          {
              name: '<code>v-model</code>',
              description: 'Binding value',
              type: 'Number',
              values: '—',
              default: '<code>0</code>'
          },
          {
              name: '<code>max</code>',
              description: 'Max rating score',
              type: 'Number',
              values: '—',
              default: '<code>5</code>'
          },
          {
              name: '<code>icon</code>',
              description: 'to specify the icon',
              type: 'String',
              values: '—',
              default: '<code>star</code>'
          },
          {
              name: '<code>icon-pack</code>',
              description: 'Icon pack to use',
              type: 'String',
              values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fab</code>, <code>fad</code>, <code>fal</code>',
              default: '<code>mdi</code>'
          },
          {
              name: '<code>size</code>',
              description: 'Include <code>show-text</code>, <code>show-score</code> and <code>custom-text</code>, optional',
              type: 'String',
              values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
              default: '—'
          },
          {
              name: '<code>rtl</code>',
              description: 'Change text direction <code>show-text</code>, <code>show-score</code> and <code>custom-text</code> to left',
              type: 'Boolean',
              values: '—',
              default: '<code>false</code>'
          },
          {
              name: '<code>spaced</code>',
              description: 'Added spacing for icons',
              type: 'Boolean',
              values: '—',
              default: '<code>false</code>'
          },
          {
              name: '<code>disabled</code>',
              description: 'Read only, if <code>true</code> Support decimal value',
              type: 'Boolean',
              values: '—',
              default: '<code>false</code>'
          },
          {
              name: '<code>show-score</code>',
              description: 'Display value',
              type: 'Boolean',
              values: '—',
              default: '<code>false</code>'
          },
          {
              name: '<code>show-text</code>',
              description: 'Display texts template. <code>show-score</code> and <code>show-text</code> cannot be true at the same time',
              type: 'Boolean',
              values: '—',
              default: '<code>false</code>'
          },
          {
              name: '<code>custom-text</code>',
              description: 'Display custom text like a total points or total reviews, and this only for <code>show-score</code>',
              type: 'String',
              values: '—',
              default: '—'
          },
          {
              name: '<code>texts</code>',
              description: 'Texts template only for <code>show-text</code>, like on e-commerce',
              type: 'Array',
              values: '—',
              default: '—'
          },
          {
              name: '<code>locale</code>',
              description: `Accept a string with a BCP 47 language tag, or an array of such strings.
              See <a href="https://www.unicode.org/reports/tr35/tr35.html#BCP_47_Conformance" target="_blank">Unicode BCP 47 locale identifier</a>`,
              type: 'String, Array of String',
              values: '—',
              default: '<code>undefined</code>: default to browser locale.'
          },
      ],
      events: [
          {
              name: '<code>change</code>',
              description: 'Triggers when rate value is changed',
              parameters: '<code>value: Boolean</code>'
          }
      ]
  }
]
