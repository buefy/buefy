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
                name: '<code>hour-format</code>',
                description: 'Hour format for input and display',
                type: 'String',
                values: '<code>12</code> or <code>24</code>',
                default: '<code>24</code>'
            },
            {
                name: '<code>increment-minutes</code>',
                description: 'Step minutes for select component',
                type: 'Number',
                values: '—',
                default: '<code>1</code>'
            },
            {
                name: '<code>time-formatter</code>',
                description: 'Function to format time (<code>Date</code> type) to a string for display in the input',
                type: 'Function',
                values: '—',
                default: '<code>HH:mm</code> or <code>HH:mm AM/PM</code>'
            },
            {
                name: '<code>time-parser</code>',
                description: 'Function to parse string to a time (<code>Date</code> type) for set a time from the input to the component',
                type: 'Function',
                values: '—',
                default: '<code>HH:mm</code> or <code>HH:mm AM/PM</code>'
            },
            {
                name: '<code>min-time</code>',
                description: 'Earliest time available for selection',
                type: 'Date',
                values: '—',
                default: '—'
            },
            {
                name: '<code>max-time</code>',
                description: 'Latest time available for selection',
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
                description: 'Datepicker is shown inline, input is removed',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>readonly</code>',
                description: 'Does not allow to type a time, set to <code>false</code> to enable input. <b>Note that you might have to set a custom time parser</b>',
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
                name: '<code>unselectable-times</code>',
                description: 'Array of unselectable times (Date object)',
                type: 'Array',
                values: '—',
                default: '-'
            },
            {
                name: '<code>mobile-native</code>',
                description: 'Enable native timepicker on mobile',
                type: 'Boolean',
                values: '<code>true</code>, <code>false</code>',
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
            }
        ],
        methods: [
            {
                name: '<code>close</code>',
                description: 'Close dropdown'
            }
        ]
    }
]
