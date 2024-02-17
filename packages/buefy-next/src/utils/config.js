let config = {
    defaultContainerElement: null,
    defaultIconPack: 'mdi',
    defaultIconComponent: null,
    defaultIconPrev: 'chevron-left',
    defaultIconNext: 'chevron-right',
    defaultLocale: undefined,
    defaultDialogConfirmText: null,
    defaultDialogCancelText: null,
    defaultSnackbarDuration: 3500,
    defaultSnackbarPosition: null,
    defaultToastDuration: 2000,
    defaultToastPosition: null,
    defaultNotificationDuration: 2000,
    defaultNotificationPosition: null,
    defaultTooltipType: 'is-primary',
    defaultTooltipDelay: null,
    defaultTooltipCloseDelay: null,
    defaultSidebarDelay: null,
    defaultInputAutocomplete: 'on',
    defaultDateFormatter: null,
    defaultDateParser: null,
    defaultDateCreator: null,
    defaultTimeCreator: null,
    defaultDayNames: null,
    defaultMonthNames: null,
    defaultFirstDayOfWeek: null,
    defaultUnselectableDaysOfWeek: null,
    defaultTimeFormatter: null,
    defaultTimeParser: null,
    defaultModalCanCancel: ['escape', 'x', 'outside', 'button'],
    defaultModalScroll: null,
    defaultDatepickerMobileNative: true,
    defaultTimepickerMobileNative: true,
    defaultTimepickerMobileModal: true,
    defaultNoticeQueue: true,
    defaultInputHasCounter: true,
    /**
     * Whether `class`, `style`, and `id` are applied to the root element in
     * components that are affected by Vue 3 change in fallthgourh beahvior.
     * See: https://github.com/ntohq/buefy-next/issues/16
     */
    defaultCompatFallthrough: true,
    defaultTaginputHasCounter: true,
    defaultUseHtml5Validation: true,
    defaultDropdownMobileModal: true,
    defaultFieldLabelPosition: null,
    defaultDatepickerYearsRange: [-100, 10],
    defaultDatepickerNearbyMonthDays: true,
    defaultDatepickerNearbySelectableMonthDays: false,
    defaultDatepickerShowWeekNumber: false,
    defaultDatepickerWeekNumberClickable: false,
    defaultDatepickerMobileModal: true,
    defaultTrapFocus: true,
    defaultAutoFocus: true,
    defaultButtonRounded: false,
    defaultSwitchRounded: true,
    defaultCarouselInterval: 3500,
    defaultTabsExpanded: false,
    defaultTabsAnimated: true,
    defaultTabsType: null,
    defaultStatusIcon: true,
    defaultProgrammaticPromise: false,
    defaultLinkTags: [
        'a',
        'button',
        'input',
        'router-link',
        'nuxt-link',
        'n-link',
        'RouterLink',
        'NuxtLink',
        'NLink'
    ],
    defaultImageWebpFallback: null,
    defaultImageLazy: true,
    defaultImageResponsive: true,
    defaultImageRatio: null,
    defaultImageSrcsetFormatter: null,
    defaultBreadcrumbTag: 'a',
    defaultBreadcrumbAlign: 'is-left',
    defaultBreadcrumbSeparator: '',
    defaultBreadcrumbSize: 'is-medium',
    customIconPacks: null
}

export { config as default }

export const setOptions = (options) => { config = options }

export const setVueInstance = (Vue) => { VueInstance = Vue }

export let VueInstance
