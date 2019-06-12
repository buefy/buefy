export default [
    {
        props: [
            {
                name: '<code>defaultIconPack</code>',
                description: `Icon pack used internally and on the Icon component attribute —
                    <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a> or
                    <a href="http://fontawesome.io/" target="_blank">FontAwesome 4</a> or
                    <a href="https://fontawesome.com/" target="_blank">FontAwesome 5</a>`,
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fad</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>defaultIconComponent</code>',
                description: `Component used to render the Icon.
                    Can be used to render FontAwesome 5 icons with the
                    <a href="https://www.npmjs.com/package/@fortawesome/vue-fontawesome" target="_blank">vue-fontawesome</a> component`,
                type: 'Component',
                values: 'FontAwesomeIcon component name',
                default: '<code></code>'
            },
            {
                name: '<code>defaultContainerElement</code>',
                description: `Default container attribute for floating Notices (Toasts & Snackbars). Note that this also
                    changes the <code>position</code> of the Notices from <code>fixed</code> to <code>absolute</code>.
                    Meaning that the container <em>should</em> be <code>fixed</code>.`,
                type: 'String',
                values: '—',
                default: '<code>body</code>'
            },
            {
                name: '<code>defaultDialogConfirmText</code>',
                description: `Default dialog <code>confirmText</code> attribute`,
                type: 'String',
                values: '—',
                default: '<code>OK</code>'
            },
            {
                name: '<code>defaultDialogCancelText</code>',
                description: `Default dialog <code>cancelText</code> attribute`,
                type: 'String',
                values: '—',
                default: '<code>Cancel</code>'
            },
            {
                name: '<code>defaultSnackbarDuration</code>',
                description: `Default snackbar <code>duration</code> attribute.`,
                type: 'Number',
                values: '—',
                default: '<code>3500</code>'
            },
            {
                name: '<code>defaultSnackbarPosition</code>',
                description: `Default snackbar <code>position</code> attribute.`,
                type: 'String',
                values: `<code>is-top-right</code>, <code>is-top</code>, <code>is-top-left</code>,
                    <code>is-bottom-right</code>, <code>is-bottom</code>, <code>is-bottom-left</code>`,
                default: '<code>is-bottom-right</code>'
            },
            {
                name: '<code>defaultToastDuration</code>',
                description: `Default toast <code>duration</code> attribute.`,
                type: 'Number',
                values: '—',
                default: '<code>2000</code>'
            },
            {
                name: '<code>defaultToastPosition</code>',
                description: `Default toast <code>position</code> attribute.`,
                type: 'String',
                values: `<code>is-top-right</code>, <code>is-top</code>, <code>is-top-left</code>,
                    <code>is-bottom-right</code>, <code>is-bottom</code>, <code>is-bottom-left</code>`,
                default: '<code>is-top</code>'
            },
            {
                name: '<code>defaultNotificationDuration</code>',
                description: `Default notification <code>duration</code> attribute.`,
                type: 'Number',
                values: '—',
                default: '<code>2000</code>'
            },
            {
                name: '<code>defaultNotificationPosition</code>',
                description: `Default notification <code>position</code> attribute for programmatically opening.`,
                type: 'String',
                values: `<code>is-top-right</code>, <code>is-top</code>, <code>is-top-left</code>,
                    <code>is-bottom-right</code>, <code>is-bottom</code>, <code>is-bottom-left</code>`,
                default: '<code>is-bottom-right</code>'
            },
            {
                name: '<code>defaultTooltipType</code>',
                description: `Default tooltip type (color) attribute.`,
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                    <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                    <code>is-warning</code>, <code>is-danger</code>,
                    and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: '<code>is-primary</code>'
            },
            {
                name: '<code>defaultTooltipAnimated</code>',
                description: `Default tooltip <code>animated</code> attribute.`,
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>defaultInputAutocomplete</code>',
                description: `Default input <code>autocomplete</code> attribute.`,
                type: 'String',
                values: '<code>on</code>, <code>off</code>',
                default: '<code>on</code>'
            },
            {
                name: '<code>defaultDateFormatter</code>',
                description: `Default datepicker <code>date-formatter</code> attribute`,
                type: 'Function',
                values: '—',
                default: '<code>date.toLocaleDateString()</code>'
            },
            {
                name: '<code>defaultDateParser</code>',
                description: `Default datepicker <code>date-parser</code> attribute`,
                type: 'Function',
                values: '—',
                default: '<code>Date.parse(date)</code>'
            },
            {
                name: '<code>defaultDateCreator</code>',
                description: `Default datepicker <code>date-creator</code> attribute`,
                type: 'Function',
                values: '—',
                default: '<code>new Date()</code>'
            },
            {
                name: '<code>defaultDayNames</code>',
                description: `Default datepicker <code>day-names</code> attribute`,
                type: 'Array',
                values: '—',
                default: `<code>['Su', 'M', 'Tu', 'W', 'Th', 'F', 'S']</code>`
            },
            {
                name: '<code>defaultMonthNames</code>',
                description: `Default datepicker <code>month-names</code> attribute`,
                type: 'Array',
                values: '—',
                default: `<code>['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']</code>`
            },
            {
                name: '<code>defaultFirstDayOfWeek</code>',
                description: `Default datepicker <code>first-day-of-week</code> attribute`,
                type: 'Number',
                values: '—',
                default: '<code>0</code>'
            },
            {
                name: '<code>defaultUnselectableDaysOfWeek</code>',
                description: `Default datepicker <code>unselectable-days-of-week</code> attribute`,
                type: 'Array',
                values: '—',
                default: '-'
            },
            {
                name: '<code>defaultTimeFormatter</code>',
                description: `Default timepicker <code>time-formatter</code> attribute`,
                type: 'Function',
                values: '—',
                default: '<code>HH:mm</code> or <code>HH:mm AM/PM</code>'
            },
            {
                name: '<code>defaultTimeParser</code>',
                description: `Default timepicker <code>time-parser</code> attribute`,
                type: 'Function',
                values: '—',
                default: '<code>HH:mm</code> or <code>HH:mm AM/PM</code>'
            },
            {
                name: '<code>defaultModalCanCancel</code>',
                description: `Default modal <code>canCancel</code> attribute`,
                type: 'Boolean, Array',
                values: '<code>escape</code>, <code>x</code>, <code>outside</code>, <code>button</code>',
                default: `<code>['escape', 'x', 'outside', 'button']</code>`
            },
            {
                name: '<code>defaultModalScroll</code>',
                description: `Default modal/dialog <code>scroll</code> attribute`,
                type: 'String',
                values: '<code>clip</code>, <code>keep</code>',
                default: '<code>clip</code>'
            },
            {
                name: '<code>defaultDatepickerMobileNative</code>',
                description: 'Default native datepicker on mobile',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>defaultTimepickerMobileNative</code>',
                description: 'Default native timepicker on mobile',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>defaultNoticeQueue</code>',
                description: 'Default snackbar/toast/notification <code>queue</code> attribute',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>defaultInputHasCounter</code>',
                description: 'Default input <code>has-counter</code> attribute',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>defaultUseHtml5Validation</code>',
                description: 'Default form components <code>use-html5-validation</code> attribute',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>defaultFieldLabelPosition</code>',
                description: 'Default field position of label',
                type: 'String',
                values: '<code>inside</code>,<code>on-border</code>',
                default: '-'
            }
        ]
    }
]
