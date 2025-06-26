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
                description: 'Function to format datetime (<code>Date</code> type) to a string for displaying in the input',
                type: 'Function',
                values: '—',
                default: '<code>(time) => new Intl.DateTimeFormat(locale).format(time)</code>'
            },
            {
                name: '<code>datetime-parser</code>',
                description: `Function to parse string to a datetime (<code>Date</code> type) for setting the component's datetime from the input`,
                type: 'Function',
                values: '—',
                default: 'Tries to parse the time using the locale specific format. Fallback to <code>HH:mm</code> or <code>HH:mm AM/PM</code>'
            },
            {
                name: '<code>datetime-creator</code>',
                description: 'Function used internally to create a new Date instance from a given date',
                type: 'Function',
                values: '—',
                default: '<code>(date) => date</code>'
            },
            {
                name: '<code>placeholder</code>',
                description: 'Input placeholder',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>disabled</code>',
                description: 'Same as native disabled',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>rules-for-first-week</code>',
                description: 'Choose the rule to determine the first week of year, 4 for ISO or 1 for other',
                type: 'Number',
                values: '—',
                default: '<code>4</code>'
            },
            {
                name: '<code>tz-offset</code>',
                description: 'Timezone offset in minutes',
                type: 'Number',
                values: '—',
                default: '<code>0</code>'
            },
            {
                name: '<code>expanded</code>',
                description: 'Makes input full width when inside a grouped or addon field',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>rounded</code>',
                description: 'Makes the input rounded',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>maxlength</code>',
                description: 'Same as native maxlength, plus character counter',
                type: 'Number, String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>use-html5-validation</code>',
                description: 'Enable HTML5 native validation',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>validation-message</code>',
                description: 'The message which is shown when a validation error occurs',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>status-icon</code>',
                description: 'Show status icon using field and variant prop',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
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
                name: '<code>first-day-of-week</code>',
                description: 'First day of week to display in table header',
                type: 'Number',
                values: '<code>0 - 6 (Sunday is 0, Monday is 1, and so on)</code>',
                default: '<code>0</code>'
            },
            {
                name: '<code>nearby-month-days</code>',
                description: 'Show/Hide nearby month days (prev and next month)',
                type: 'Boolean',
                values: '-',
                default: '<code>true</code>'
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
                name: '<code>icon-right</code>',
                description: 'Icon name to be added on the right side',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>icon-right-clickable</code>',
                description: 'Make the right icon clickable',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
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
                description: 'Append datetimepicker calendar to body (prevents event bubbling)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
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
                name: '<code>update:modelValue</code>',
                description: 'Triggers when the datetime value changes',
                parameters: '<code>value: Date | null</code>'
            },
            {
                name: '<code>active-change</code>',
                description: 'Triggers when the datetimepicker visibility (active state) changes',
                parameters: '<code>active: Boolean</code>'
            },
            {
                name: '<code>focus</code>',
                description: 'Triggers when input receives focus',
                parameters: '<code>event: Event</code>'
            },
            {
                name: '<code>blur</code>',
                description: 'Triggers when input loses focus',
                parameters: '<code>event: Event</code>'
            },
            {
                name: '<code>icon-right-click</code>',
                description: 'Triggers when the right icon is clickable and has been clicked',
                parameters: '<code>event: $event</code>'
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
        ],
        methods: [
            {
                name: '<code>toggle</code>',
                description: 'Toggle activation (picker visibility)'
            },
            {
                name: '<code>focus</code>',
                description: 'Set focus on the input element'
            },
            {
                name: '<code>checkHtml5Validity</code>',
                description: 'Check HTML5 validation, set isValid property. If validation fails, send \'is-danger\' type, and error message to parent if it\'s a Field'
            }
        ]
    }
]
