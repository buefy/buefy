export default [
    {
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'Date, String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>date-formatter</code>',
                description: 'Function to parse date to a string for display in the input/to be emitted if a string is passed in as component value. Will be passed a Date object as argument.',
                type: 'Function',
                values: '—',
                default: '<code>(date) => date.toLocaleDateString()</code>'
            },
            {
                name: '<code>min-date</code>',
                description: 'Earliest date available for selection',
                type: 'Date',
                values: '—',
                default: '—'
            },
            {
                name: '<code>max-date</code>',
                description: 'Latest date available for selection',
                type: 'Date',
                values: '—',
                default: '—'
            },
            {
                name: '<code>focused-date</code>',
                description: 'Date that should be initially focused upon',
                type: 'Date',
                values: '—',
                default: '<code>new Date()</code>'
            },
            {
                name: '<code>size</code>',
                description: 'Vertical size of input and picker, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>inline</code>',
                description: 'Datepicker is shown inline, input is removed',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>loading</code>',
                description: 'Add the loading state to the input',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>icon</code>',
                description: 'Icon name to be added',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>day-names</code>',
                description: 'Names of months to display in table header',
                type: 'Array',
                values: '—',
                default: '<code>["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]</code>'
            },
            {
                name: '<code>month-names</code>',
                description: 'Names of days to display in table header',
                type: 'Array',
                values: '—',
                default: '<code>["Su", "M", "Tu", "W", "Th", "F", "S"]</code>'
            },
            {
                name: '<code>first-day-of-week</code>',
                description: 'First day of week to display in table header',
                type: 'Number',
                values: '<code>0 - 6 (Sunday is 0, Monday is 1, and so on)</code>',
                default: '<code>0</code>'
            },
            {
                name: 'Any native attribute',
                description: '—',
                type: '—',
                values: '—',
                default: '—'
            }
        ]
    }
]
