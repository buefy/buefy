export default [
    {
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'Object (Color)',
                values: '—',
                default: '—'
            },
            {
                name: '<code>representation</code>',
                description: 'Representation of Saturation & Lightness values',
                type: 'String',
                values: '<code>triangle</code>, <code>square</code>',
                default: '<code>"triangle"</code>'
            },
            {
                name: '<code>alpha</code>',
                description: 'Allow color with transparency',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>color-formatter</code>',
                description: 'Function to format color to a string for display in the button',
                type: 'Function',
                values: '—',
                default: '<code>(color) => color.toString(\'hex\')</code>'
            },
            {
                name: '<code>color-parser</code>',
                description: 'Function to parse value to a color',
                type: 'Function',
                values: '—',
                default: '<code>(color) => Color.parse(color)</code>'
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
                description: 'Colorpicker is shown inline, button is removed',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>position</code>',
                description: 'Optional, position of the colorpicker relative to the button',
                type: 'String',
                values: '<code>is-top-right</code>, <code>is-top-left</code>, <code>is-bottom-left</code>',
                default: 'Bottom right'
            },
            {
                name: '<code>open-on-focus</code>',
                description: 'Open colorpicker on button focus',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>focusable</code>',
                description: 'Colorpicker container can be focused',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>trap-focus</code>',
                description: `Trap focus inside the colorpicker.`,
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>close-on-click</code>',
                description: 'Choose whether the Colorpicker should close after selecting a color',
                type: 'Boolean',
                values: '-',
                default: '<code>true</code>'
            },
            {
                name: '<code>append-to-body</code>',
                description: 'Append colorpicker dropdown to body (prevents event bubbling)',
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
                description: 'Triggers when the value of colorpicker is changed',
                parameters: '<code>value: Color</code>'
            },
        ],
        methods: [
            {
                name: '<code>toggle</code>',
                description: 'Toggle activation (picker visibility)'
            }
        ]
    }
]
