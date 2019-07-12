export default [
    {
        props: [
            {
                name: '<code>type</code>',
                description: 'Type (color) of the progress bar, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '<code>is-darkgrey</code>'
            },
            {
                name: '<code>size</code>',
                description: 'Size of the progress bar, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>value</code>',
                description: 'The progress value, progress will be indeterminate if undefined.',
                type: 'Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>max</code>',
                description: 'The maximum value for the progress bar.',
                type: 'Number',
                values: '—',
                default: '<code>100</code>'
            },
            {
                name: '<code>show-value</code>',
                description: 'If the value should be displayed inside the progress bar.',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>format</code>',
                description: `Which format should be used to display the value (if <code>show-value</code> is <code>true</code>).
                              The value will be displayed as-is if using <code>raw</code>. The percent using <code>value</code>
                              and <code>max</code> will be calculated and displayed if using <code>percent</code>`,
                type: 'String',
                values: '<code>raw</code>, <code>percent</code>',
                default: '<code>raw</code>'
            },
            {
                name: '<code>precision</code>',
                description: 'How many decimals should be displayed.',
                type: 'Number',
                values: '—',
                default: '<code>2</code>'
            },
            {
                name: '<code>keep-trailing-zeroes</code>',
                description: 'Truncate or not the trailing zeroes',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            }
        ],
        slots: [
            {
                name: '<code>default</code>',
                description: 'This will be displayed inside the progress bar instead of the calculated value',
                props: '—'
            }
        ]
    }
]
