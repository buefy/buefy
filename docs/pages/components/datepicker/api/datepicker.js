export default [
    {
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'Date',
                values: '—',
                default: '—'
            },
            {
                name: '<code>date-formatter</code>',
                description: 'Function to format date to a string for display in the input',
                type: 'Function',
                values: '—',
                default: '<code>(date) => date.toLocaleDateString()</code>'
            },
            {
                name: '<code>date-parser</code>',
                description: 'Function to parse string to a date for set a date from the input to the component',
                type: 'Function',
                values: '—',
                default: '<code>(date) => new Date(Date.parse(date))</code>'
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
                name: '<code>events</code>',
                description: 'Dates to display indicators',
                type: 'Array',
                values: '—',
                default: '—'
            },
            {
                name: '<code>indicators</code>',
                description: 'Shape to use when showing event indicators',
                type: 'String',
                values: '<code>dots</code>, <code>bars</code>',
                default: '<code>dots</code>'
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
                name: '<code>readonly</code>',
                description: 'Does not allow to type a date, set to <code>false</code> to enable input. <b>Note that you might have to set a custom date parser</b>',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
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
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fad</code>, <code>fal</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>unselectable-dates</code>',
                description: 'Array of unselectable dates',
                type: 'Array',
                values: '—',
                default: '-'
            },
            {
                name: '<code>unselectable-days-of-week</code>',
                description: 'Array of unselectable days of week',
                type: 'Array',
                values: '<code>0 - 6 (Sunday is 0, Monday is 1, and so on)</code>',
                default: '-'
            },
            {
                name: '<code>month-names</code>',
                description: 'Names of months to display in table header',
                type: 'Array',
                values: '—',
                default: '<code>["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]</code>'
            },
            {
                name: '<code>day-names</code>',
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
                name: '<code>mobile-native</code>',
                description: 'Enable native datepicker on mobile',
                type: 'Boolean',
                values: '<code>true</code>, <code>false</code>',
                default: '<code>true</code>'
            },
            {
                name: '<code>position</code>',
                description: 'Optional, position of the datepicker relative to the input',
                type: 'String',
                values: '<code>is-top-right</code>, <code>is-top-left</code>, <code>is-bottom-left</code>',
                default: 'Bottom right'
            },
            {
                name: 'Any native attribute',
                description: '—',
                type: '—',
                values: '—',
                default: '—'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Footer',
                props: '—'
            },
            {
                name: 'header',
                description: 'Header',
                props: '—'
            }
        ],
        events: [
            {
                name: '<code>input</code>',
                description: 'Triggers when value is changed',
                parameters: '<code>value: Date</code>'
            },
            {
                name: '<code>change-month</code>',
                description: 'Triggers when calendar month is changed',
                parameters: '<code>month: Number(0-11)</code>'
            },
            {
                name: '<code>change-year</code>',
                description: 'Triggers when calendar year is changed',
                parameters: '<code>year: Number</code>'
            }
        ]
    }
]
