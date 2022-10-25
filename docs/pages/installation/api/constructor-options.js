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
                default: '—'
            },
            {
                name: '<code>defaultStatusIcon</code>',
                description: `Automatically show status icon on input component`,
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>defaultIconPrev</code>',
                description: `Icon used internally for prev. —
                    Used in Datepicker, Pagination and Steps for example`,
                type: 'String',
                values: '—',
                default: '<code>chevron-left</code>'
            },
            {
                name: '<code>defaultIconNext</code>',
                description: `Icon used internally for next. —
                    Used in Datepicker, Pagination and Steps for example`,
                type: 'String',
                values: '—',
                default: '<code>chevron-right</code>'
            },
            {
                name: '<code>defaultLocale</code>',
                description: `Will be used for default date and number formatting. Accept a string with a BCP 47 language tag, or an array of such strings.
                See <a href="https://www.unicode.org/reports/tr35/tr35.html#BCP_47_Conformance" target="_blank">Unicode BCP 47 locale identifier</a>`,
                type: 'String, Array of String',
                values: '—',
                default: '<code>undefined</code>: default to browser locale.'
            },
            {
                name: '<code>defaultContainerElement</>',
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
                name: '<code>defaultTooltipDelay</code>',
                description: `Default tooltip delay attribute.`,
                type: 'Number',
                values: `—`,
                default: '—'
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
                default: '<code>(date) => new Intl.DateTimeFormat(locale).format(date)</code>'
            },
            {
                name: '<code>defaultDateParser</code>',
                description: `Default datepicker <code>date-parser</code> attribute`,
                type: 'Function',
                values: '—',
                default: 'Tries to parse the date using the locale specific format. Fallback to <code>Date.parse</code>'
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
                default: `default to browser locale`
            },
            {
                name: '<code>defaultMonthNames</code>',
                description: `Default datepicker <code>month-names</code> attribute`,
                type: 'Array',
                values: '—',
                default: `default to browser locale`
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
                default: '—'
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
                name: '<code>defaultTaginputHasCounter</code>',
                description: 'Default taginput <code>has-counter</code> attribute',
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
                default: '—'
            },
            {
                name: '<code>defaultDatepickerYearsRange</code>',
                description: 'Default years range relative to selected year',
                type: 'Array',
                values: '—',
                default: '<code>[-100, 3]</code>'
            },
            {
                name: '<code>defaultDatepickerNearbyMonthDays</code>',
                description: 'Show/Hide nearby month days (prev and next month)',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>defaultDatepickerNearbySelectableMonthDays</code>',
                description: 'It allows to select/unselect nearby month days',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>defaultDatepickerShowWeekNumber</code>',
                description: 'It allows to display week number',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>customIconPacks</code>',
                description: 'Allows you to define your own custom icon pack to be used in Buefy.',
                type: 'Object',
                values: '—',
                default: '—'
            },
            {
                name: '<code>defaultClockpickerHoursLabel</code>',
                description: `Default clockpicker <code>hours-label</code> attribute`,
                type: 'String',
                values: '—',
                default: `<code>Hours</code>`
            },
            {
                name: '<code>defaultClockpickerMinutesLabel</code>',
                description: `Default clockpicker <code>minutes-label</code> attribute`,
                type: 'String',
                values: '—',
                default: `<code>Min</code>`
            },
            {
                name: '<code>defaultTrapFocus</code>',
                description: 'Default config to trap focus inside components (Dialog, Dropdown and Modal).',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>defaultButtonRounded</code>',
                description: 'Default config to make all buttons rounded.',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>defaultSwitchRounded</code>',
                description: 'Default config to make all switch rounded.',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>defaultCarouselInterval</code>',
                description: 'Default carousel <code>interval</code> attribute',
                type: 'Number',
                values: '—',
                default: '<code>3500</code>'
            },
            {
                name: '<code>defaultTabsExpanded</code>',
                description: 'Default tabs <code>expanded</code> attribute',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>defaultTabsAnimated</code>',
                description: 'Default tabs <code>animated</code> attribute',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>defaultTabsType</code>',
                description: 'Default tabs <code>type</code> attribute',
                type: 'String',
                values: '<code>is-boxed</code>, <code>is-toggle</code>',
                default: '—'
            },
            {
                name: '<code>defaultProgrammaticPromise</code>',
                description: `Return a promise using programmatic component`,
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>defaultLinkTags</code>',
                description: 'Default link tags accepted as tag in some component (Button, MenuItem, PaginationButton). Can be used when using custom component or other Vue Router plugin like inertia.',
                type: 'string',
                values: '—',
                default: '<code>[a, button, input, router-link, nuxt-link, n-link, RouterLink, NuxtLink, NLink]</code>'
            },
            {
                name: '<code>defaultBreadcrumbTag</code>',
                description: 'Default link tags accepted as tag in Breadcrumb component. Can be used when using custom component or other Vue Router plugin like inertia.',
                type: 'string',
                values: '—',
                default: '<code>[a, button, input, router-link, nuxt-link, n-link, RouterLink, NuxtLink, NLink]</code>'
            },
            {
                name: '<code>defaultImageWebpFallback</code>',
                description: `Fallback when using webp format. You can specify an extension only (.jpg, .jpeg, .png, .gif) if the filename is the same. You can use a full url if not.`,
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>defaultImageLazy</code>',
                description: `Use IntersectionObserver to display the image only when in viewport.`,
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>defaultImageResponsive</code>',
                description: `The image will take 100% of the parent width. Use this with <code>ratio</code> to prevent page jump when images are loading.`,
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>defaultImageRatio</code>',
                description: `The space will be reserved. Prevent page jump when images are loading when using <code>responsive</code>.`,
                type: 'String',
                values: '<code>1by1</code>, <code>5by4</code>, <code>4by3</code>, <code>3by2</code>, <code>5by3</code>, <code>16by9</code>, <code>2by1</code>, <code>3by1</code>, <code>4by5</code>, <code>3by4</code>, <code>2by3</code>, <code>3by5</code>, <code>9by16</code>, <code>1by2</code> <code>1by3</code> or any string having this format <code>{number}by{number}</code>',
                default: '—'
            },
            {
                name: '<code>defaultImageSrcsetFormatter</code>',
                description: `Function to format src according to a given size.`,
                type: 'Function',
                values: '—',
                default: '(src, size) => `${srcFilename}-${size}.${srcExt}`'
            }
        ]
    }
]
