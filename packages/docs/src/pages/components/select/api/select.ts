export default [
    {
        props: [
            {
                name: '<code>v-model</code>',
                description: 'Binding value',
                type: 'Any',
                values: '—',
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'Size of the select, optional',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>placeholder</code>',
                description: 'Text when nothing is selected',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>loading</code>',
                description: 'Add the loading state to the Select',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>expanded</code>',
                description: 'Select will be expanded (full-width)',
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
                name: '<code>native-size</code>',
                description: 'Same as native <code>size</code>',
                type: 'Number',
                values: '—',
                default: '<code>4</code>'
            },
            {
                name: '<code>multiple</code>',
                description: 'Same as native <code>multiple</code>',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>rounded</code>',
                description: 'Makes the element rounded',
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
                default: '<code>defaultUseHtml5Validation</code> config, <code>true</code> by default'
            },
            {
                name: '<code>validation-message</code>',
                description: 'The message which is shown when a validation error occurs',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>locale</code>',
                description: 'Locale to be used for form validation and date formatting',
                type: 'String, Array',
                values: '—',
                default: '<code>defaultLocale</code> config (which is <code>undefined</code> by default)'
            },
            {
                name: '<code>status-icon</code>',
                description: 'Show status icon using field and variant prop',
                type: 'Boolean',
                values: '—',
                default: '<code>defaultStatusIcon</code> config, <code>true</code> by default'
            },
            {
                name: '<code>compat-fallthrough</code>',
                description: 'Whether the <code>class</code>, <code>style</code>, and <code>id</code> attributes are applied to the root &lt;div&gt; element or the underlying &lt;select&gt; element. If <code>true</code>, they are applied to the root &lt;div&gt; element, which is compatible with Buefy for Vue 2.',
                type: 'Boolean',
                values: '-',
                default: '<code>true</code>. Can be changed via the <code>defaultCompatFallthrough</code> config option.'
            },
            {
                name: 'Any native attribute',
                description: '—',
                type: '—',
                values: '—',
                default: '—'
            }
        ],
        events: [
            {
                name: '<code>update:modelValue</code>',
                description: 'Triggers when value is changed',
                parameters: '<code>value: Any</code>'
            },
            {
                name: '<code>change</code>',
                description: 'Native change event that bubbles up from the underlying select element',
                parameters: '<code>event: Event</code>'
            },
            {
                name: '<code>focus</code>',
                description: 'Triggers when input has received focus',
                parameters: '<code>event: $event</code>'
            },
            {
                name: '<code>blur</code>',
                description: 'Triggers when input has lost focus',
                parameters: '<code>event: $event</code>'
            },
            {
                name: '<code>[any].native</code>',
                description: 'Listen to any native event, e.g. <code>click.native</code>',
                parameters: '<code>event: $event</code>'
            }
        ],
        slots: [
            {
                name: '<code>default</code>',
                description: 'Option elements for the select',
                props: '—'
            }
        ],
        methods: [
            {
                name: '<code>checkHtml5Validity</code>',
                description: 'Check validation of HTML5 (add the message and type/color), also updates the <code>isValid</code> property',
                return: '<code>isValid: Boolean</code>'
            },
            {
                name: '<code>focus</code>',
                description: 'Set focus',
                return: '—'
            }
        ]
    }
]
