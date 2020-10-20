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
                default: '<code>(date) => new Intl.DateTimeFormat(locale, { timezome: "UTC" }).format(date)</code>'
            },
            {
                name: '<code>date-parser</code>',
                description: 'Function to parse string to a date for set a date from the input to the component',
                type: 'Function',
                values: '—',
                default: 'Tries to parse the date using the locale specific format. Fallback to <code>Date.parse</code>'
            },
            {
                name: '<code>date-creator</code>',
                description: 'Function used internally to create a new Date instance',
                type: 'Function',
                values: '—',
                default: '<code>() => new Date()</code>'
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
                name: '<code>editable</code>',
                description: 'Enable input/typing. <b>Note that you might have to set a custom date parser</b>',
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
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fad</code>, <code>fal</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>icon-prev</code>',
                description: 'Icon to use for previous month',
                type: 'String',
                values: '—',
                default: '<code>chevron-left</code>'
            },
            {
                name: '<code>icon-next</code>',
                description: 'Icon to use for next month',
                type: 'String',
                values: '—',
                default: '<code>chevron-right</code>'
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
                name: '<code>selectable-dates</code>',
                description: 'Array of selectable dates',
                type: 'Array',
                values: '—',
                default: '-'
            },
            {
                name: '<code>locale</code>',
                description: `Accept a string with a BCP 47 language tag, or an array of such strings.
                See <a href="https://www.unicode.org/reports/tr35/tr35.html#BCP_47_Conformance" target="_blank">Unicode BCP 47 locale identifier</a>`,
                type: 'String, Array of String',
                values: '—',
                default: '<code>undefined</code>: default to browser locale.'
            },
            {
                name: '<code>month-names</code>',
                description: 'Names of months to display in table header',
                type: 'Array',
                values: '—',
                default: '<code>undefined</code>: default to browser locale.'
            },
            {
                name: '<code>day-names</code>',
                description: 'Names of days to display in table header',
                type: 'Array',
                values: '—',
                default: '<code>undefined</code>: default to browser locale.'
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
                name: '<code>open-on-focus</code>',
                description: 'Open datepicker on input focus',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>type</code>',
                description: 'Type of picker',
                type: 'String',
                values: '<code>month</code>',
                default: '-'
            },
            {
                name: '<code>years-range</code>',
                description: 'Years range relative to selected year',
                type: 'Array',
                values: '-',
                default: '<code>[-100, 3]</code>'
            },
            {
                name: '<code>nearby-month-days</code>',
                description: 'Show/Hide nearby month days (prev and next month)',
                type: 'Boolean',
                values: '-',
                default: '<code>true</code>'
            },
            {
                name: '<code>nearby-selectable-month-days</code>',
                description: 'When <code>nearby-month-days</code>, it allows to select/unselect nearby month days',
                type: 'Boolean',
                values: '-',
                default: '<code>false</code>'
            },
            {
                name: '<code>show-week-number</code>',
                description: 'Display week number',
                type: 'Boolean',
                values: '-',
                default: '<code>false</code>'
            },
            {
                name: '<code>week-number-clickable</code>',
                description: 'Enable click on week number',
                type: 'Boolean',
                values: '-',
                default: '<code>false</code>'
            },
            {
                name: '<code>rules-for-first-week</code>',
                description: 'Choose the rule to determinate the first week of Year, 4 for ISO or 1 for other',
                type: 'Number',
                values: '-',
                default: '<code>4</code>'
            },
            {
                name: '<code>range</code>',
                description: 'Flag to allow choosing a range of date',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>multiple</code>',
                description: 'Flag to allow choosing multiple dates',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>focusable</code>',
                description: 'Datepicker container can be focused',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>trap-focus</code>',
                description: `Trap focus inside the datepicker.`,
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>append-to-body</code>',
                description: 'Append datepicker calendar to body',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>aria-next-label</code>',
                description: 'Accessibility label for the next month button.',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>aria-previous-label</code>',
                description: 'Accessibility label for the previous month button.',
                type: 'String',
                values: '—',
                default: '—'
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
            },
            {
                name: 'trigger',
                description: 'Trigger',
                props: '—'
            }
        ],
        events: [
            {
                name: '<code>input</code>',
                description: 'Triggers when the value of datepicker is changed',
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
            },
            {
                name: '<code>range-start</code>',
                description: 'Triggers when user starts selecting a date range (Only when <b>range</b> prop is set)',
                parameters: '<code>date: Date</code>'
            },
            {
                name: '<code>range-end</code>',
                description: 'Triggers when user ends selecting a date range (Only when <b>range</b> prop is set)',
                parameters: '<code>date: Date</code>'
            },
            {
                name: '<code>week-number-click</code>',
                description: 'Triggers when user click on week number (Only when <b>show-week-number</b> and <b>week-number-clickable</b> props are set)',
                parameters: '<code>week: Number</code>'
            }
        ],
        methods: [
            {
                name: '<code>toggle</code>',
                description: 'Toggle activation (picker visibility)'
            }
        ]
    }
]
