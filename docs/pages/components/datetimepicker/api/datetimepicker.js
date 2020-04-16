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
                name: '<code>datetime-formatter</code>',
                description: 'Function to format datetime (<code>Date</code> type) to a string for display in the input',
                type: 'Function',
                values: '—',
                default: '<code>HH:mm</code> or <code>HH:mm AM/PM</code>'
            },
            {
                name: '<code>datetime-parser</code>',
                description: 'Function to parse string to a datetime (<code>Date</code> type) for set a datetime from the input to the component',
                type: 'Function',
                values: '—',
                default: '<code>HH:mm</code> or <code>HH:mm AM/PM</code>'
            },
            {
                name: '<code>min-datetime</code>',
                description: 'Earliest datetime available for selection',
                type: 'Date',
                values: '—',
                default: '—'
            },
            {
                name: '<code>max-datetime</code>',
                description: 'Latest datetime available for selection',
                type: 'Date',
                values: '—',
                default: '—'
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
                description: 'Datimepicker is shown inline, input is removed',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>editable</code>',
                description: 'Enable input/typing. <b>Note that you might have to set a custom time parser</b>',
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
                name: '<code>mobile-native</code>',
                description: 'Enable native datetimepicker on mobile',
                type: 'Boolean',
                values: '',
                default: '<code>true</code>'
            },
            {
                name: '<code>position</code>',
                description: 'Optional, position of the timepicker relative to the input',
                type: 'String',
                values: '<code>is-top-right</code>, <code>is-top-left</code>, <code>is-bottom-left</code>',
                default: 'Bottom right'
            },
            {
                name: '<code>open-on-focus</code>',
                description: 'Open timepicker on input focus',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>datepicker</code>',
                description: 'Any datepicker props',
                type: 'Object',
                values: '—',
                default: '—'
            },
            {
                name: '<code>timepicker</code>',
                description: 'Any timepicker props',
                type: 'Object',
                values: '—',
                default: '—'
            },
            {
                name: '<code>focusable</code>',
                description: 'Datetimepicker container can be focused',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>horizontal-time-picker</code>',
                description: 'Changes the time picker layout to a horizontal position',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>append-to-body</code>',
                description: 'Append datetimepicker calendar to body',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
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
                name: 'left',
                description: 'Left side of footer',
                props: '—'
            },
            {
                name: 'right',
                description: 'Right side of footer',
                props: '—'
            }
        ],
        events: [
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
        ],
        methods: [
            {
                name: '<code>toggle</code>',
                description: 'Toggle activation (picker visibility)'
            }
        ]
    }
]
