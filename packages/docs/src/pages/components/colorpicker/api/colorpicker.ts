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
                name: '<code>mobile-native</code>',
                description: 'Use native mobile color picker',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>disabled</code>',
                description: 'Disable the colorpicker',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>horizontal-color-picker</code>',
                description: 'Horizontal layout for the color picker',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>expanded</code>',
                description: 'Expand the trigger button (full-width)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>mobile-modal</code>',
                description: 'Use modal on mobile devices',
                type: 'Boolean',
                values: '—',
                default: 'From config'
            },
            {
                name: '<code>rounded</code>',
                description: 'Make the trigger button rounded',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>loading</code>',
                description: 'Add loading state to the trigger button',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>icon</code>',
                description: 'Icon name for the trigger button',
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
                name: '<code>maxlength</code>',
                description: 'Same as native maxlength, plus character counter',
                type: 'String, Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>use-html5-validation</code>',
                description: 'Enable HTML5 validation',
                type: 'Boolean',
                values: '—',
                default: 'From config'
            },
            {
                name: '<code>validation-message</code>',
                description: 'Custom validation message',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>locale</code>',
                description: 'Locale for validation messages',
                type: 'String, Array',
                values: '—',
                default: 'From config'
            },
            {
                name: '<code>status-icon</code>',
                description: 'Show status icon for validation',
                type: 'Boolean',
                values: '—',
                default: 'From config'
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
                name: 'trigger',
                description: 'Custom trigger button',
                props: '—'
            },
            {
                name: 'header',
                description: 'Header content in the colorpicker dropdown',
                props: '—'
            },
            {
                name: 'footer',
                description: 'Footer content in the colorpicker dropdown (default slot)',
                props: '<code>color: Color</code>'
            }
        ],
        events: [
            {
                name: '<code>input</code>',
                description: 'Triggers when the value of colorpicker is changed',
                parameters: '<code>value: Color</code>'
            },
            {
                name: '<code>active-change</code>',
                description: 'Triggers when the colorpicker opens or closes',
                parameters: '<code>active: Boolean</code>'
            },
            {
                name: '<code>focus</code>',
                description: 'Triggers when colorpicker receives focus',
                parameters: '<code>event: $event</code>'
            },
            {
                name: '<code>blur</code>',
                description: 'Triggers when colorpicker loses focus',
                parameters: '<code>event: $event</code>'
            }
        ],
        methods: [
            {
                name: '<code>focus()</code>',
                description: 'Set focus on the colorpicker',
                return: '—'
            },
            {
                name: '<code>checkHtml5Validity()</code>',
                description: 'Check HTML5 validation, returns validation state',
                return: '<code>Boolean</code>'
            },
            {
                name: '<code>togglePicker(active: Boolean)</code>',
                description: 'Toggle colorpicker visibility',
                return: '—'
            }
        ]
    }
]
