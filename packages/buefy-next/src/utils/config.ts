import type { App } from 'vue'

import Color from './color'

/**
 * Type that can be bound to `class` attribute in Vue.
 *
 * @remarks
 *
 * It does not seem Vue provides a type for this.
 *
 * FIXME: There should be a better place to put this type into.
 *
 * @beta
 */
export type VueClassAttribute =
    | (string | Record<string, boolean | undefined> | null | undefined)
    | (string | Record<string, boolean | undefined> | null | undefined)[]

/**
 * Cancellable options for `Modal`.
 *
 * @public
 */
export type ModalCancellableOption = 'escape' | 'x' | 'outside' | 'button'

/**
 * Possible positions of notice components.
 *
 * @public
 */
export const NOTICE_POSITIONS = [
    'is-top-right',
    'is-top',
    'is-top-left',
    'is-bottom-right',
    'is-bottom',
    'is-bottom-left'
] as const

/**
 * Position of notice components.
 *
 * @public
 */
export type NoticePosition = typeof NOTICE_POSITIONS[number]

/**
 * Scroll behavior for `Modal` and `Sidebar`.
 *
 * @public
 */
export type ModalScrollOption = 'clip' | 'keep'

/**
 * Label position for `Field`.
 *
 * @public
 */
export type FieldLabelPosition = 'inside' | 'on-border'

/**
 * Buefy configuration.
 *
 * @public
 */
export interface BuefyConfig {
    /**
     * Default container element.
     * Default value of `container` prop of `Dialog`, `Notification`,
     * `Snackbar`, and `Toast`.
     */
    defaultContainerElement?: string | null,
    /**
     * Default icon pack name.
     * "mdi" by default.
     */
    defaultIconPack: string,
    /**
     * Default icon component.
     * Default component that renders icons.
     * `<i>` by default.
     */
    defaultIconComponent?: string | null,
    /**
     * Default icon for previous buttons.
     * "chevron-left" by default.
     */
    defaultIconPrev: string,
    /**
     * Default icon for next buttons.
     * "chevron-right" by default.
     */
    defaultIconNext: string,
    /**
     * Default locale.
     * Default locale of the browser by default.
     */
    defaultLocale?: string | string[] | null,
    /**
     * Default confirm text on `Dialog`.
     * Default value of `confirm-text` prop of `Dialog`.
     */
    defaultDialogConfirmText?: string | null,
    /**
     * Default cancel text on `Dialog`.
     * Default value of `cancel-text` prop of `Dialog`.
     */
    defaultDialogCancelText?: string | null,
    /**
     * Default duration of `Snackbar` in milliseconds.
     * 3500 by default.
     */
    defaultSnackbarDuration: number,
    /**
     * Default position of `Snackbar`.
     * "is-bottom-right" by default.
     */
    defaultSnackbarPosition?: NoticePosition | null,
    /**
     * Default duration of `Toast` in milliseconds.
     * 2000 by default.
     */
    defaultToastDuration: number,
    /**
     * Default position of `Toast`.
     * "is-top" by default.
     */
    defaultToastPosition?: NoticePosition | null,
    /**
     * Default duration of `Notification` in milliseconds.
     * 2000 by default.
     */
    defaultNotificationDuration: number,
    /**
     * Default position of `Notification`.
     * "is-top-right" by default.
     */
    defaultNotificationPosition?: NoticePosition | null,
    /**
     * Default type of `Tooltip`.
     * "is-primary" by default.
     */
    defaultTooltipType: string,
    /**
     * Default delay of `Tooltip` in milliseconds.
     * No delay by default.
     */
    defaultTooltipDelay?: number | null,
    /**
     * Default delay of `Tooltip` to close in milliseconds.
     * No delay by default.
     */
    defaultTooltipCloseDelay?: number | null,
    /**
     * Default delay of `Sidebar` in milliseconds.
     * No delay by default.
     */
    defaultSidebarDelay?: number | null,
    /**
     * Default autocomplete attribute of `Input`.
     * "on" by default.
     */
    defaultInputAutocomplete: string,
    /**
     * Default date formatter.
     * Default function that `dateFormatter` prop of `Datepicker` uses.
     * Buefy provides a default implementation if omitted.
     */
    defaultDateFormatter?: ((date: Date) => string) | null,
    /**
     * Default date parser.
     * Default function that `dateParser` prop of `Datepicker` uses.
     * Buefy provides a default implementation if omitted.
     */
    defaultDateParser?: ((date: string) => Date | null) | null,
    /**
     * Default date creator.
     * Default function that `dateCreator` prop of `Datepicker` uses.
     * Buefy provides a default implementation if omitted.
     */
    defaultDateCreator?: (() => Date) | null,
    /**
     * Default time creator.
     * Default function that `timeCreator` prop of `Clockpicker` and
     * `Timepicker` uses.
     * Buefy provides a default implementation if omitted.
     */
    defaultTimeCreator?: (() => Date) | null,
    /**
     * Default day names.
     * Default value of `day-names` prop of `Datepicker`.
     * Retrieves from the default locale by default.
     */
    defaultDayNames?: string[] | null,
    /**
     * Default month names.
     * Default value of `month-names` prop of `Datepicker`.
     * Retrieves from the default locale by default.
     */
    defaultMonthNames?: string[] | null,
    /**
     * Default first day of week.
     * Default value of `first-day-of-week` prop of `Datepicker`.
     * 0 (Sunday) by default.
     */
    defaultFirstDayOfWeek?: number | null,
    /**
     * Default unselectable days of week.
     * Default value of `unselectable-days-of-week` prop of `Datepicker`.
     * No unselectable days of week if omitted.
     */
    defaultUnselectableDaysOfWeek?: number[] | null,
    /**
     * Default time formatter.
     * Default function that `timeFormatter` prop of `Clockpicker` and
     * `Timepicker` uses.
     * Buefy provides a default implementation if omitted.
     */
    defaultTimeFormatter?: ((date: Date) => string) | null,
    /**
     * Default time parser.
     * Default function that `timeParser` prop of `Clockpicker` and
     * `Timepicker` uses.
     * Buefy provides a default implementation if omitted.
     */
    defaultTimeParser?: ((date: string) => Date | null) | null,
    /**
     * Default datetime formatter used by `Datetimepicker`.
     */
    defaultDatetimeFormatter?: ((date: Date) => string) | null,
    /**
     * Default datetime parser used by `Datetimepicker`.
     */
    defaultDatetimeParser?: ((date: string) => Date | null) | null,
    /**
     * Default datetime creator.
     * Default function that `datetimeCreator` prop of `Datetimepicker` uses.
     */
    defaultDatetimeCreator?: ((date: Date) => Date) | null,
    /**
     * Default "Hours" label on `Clockpicker`.
     */
    defaultClockpickerHoursLabel?: string | null,
    /**
     * Default "Minutes" label on `Clockpicker`.
     */
    defaultClockpickerMinutesLabel?: string | null,
    /**
     * Default color formatter.
     * Default function that the `colorFormatter` prop of `Colorpicker` calls.
     * Buefy provides a default implementation if omitted.
     */
    defaultColorFormatter?: ((color: Color) => string) | null,
    /**
     * Default color parser.
     * Default function that the `colorParser` prop of `Colorpicker` calls.
     * Buefy provides a default implementation if omitted.
     */
    defaultColorParser?: ((color: string) => Color | null) | null,
    /**
     * Default cancellable options of `Modal`.
     * `['escape', 'x', 'outside', 'button']` by default.
     */
    defaultModalCanCancel: ModalCancellableOption[],
    /**
     * Default scroll behavior of `Modal`.
     * Default value of `scroll` prop of `Modal` and `Sidebar`.
     * 'clip' by default.
     */
    defaultModalScroll?: ModalScrollOption | null,
    /**
     * Default mobile native behavior of `Datepicker`.
     * Default value of `mobile-native` prop of `Datepicker`.
     * `true` by default.
     */
    defaultDatepickerMobileNative: boolean,
    /**
     * Default mobile native behavior of `Timepicker`.
     * Default value of `mobile-native` prop of `Timepicker`.
     * `true` by default.
     */
    defaultTimepickerMobileNative: boolean,
    /**
     * Default mobile modal behavior of `Timepicker`.
     * Default value of `mobile-modal` prop of `Timepicker`.
     * `true` by default.
     */
    defaultTimepickerMobileModal: boolean,
    /**
     * Default queue behavior of `Notice`.
     * Default value of `queue` prop of `Notice`.
     * `true` by default.
     */
    defaultNoticeQueue: boolean,
    /**
     * Default counter behavior of `Input`.
     * Default value of `has-counter` prop of `Input`.
     * `true` by default.
     */
    defaultInputHasCounter: boolean,
    /**
     * Whether `class`, `style`, and `id` are applied to the root element in
     * components that are affected by Vue 3 change in fallthgourh beahvior.
     * See: https://github.com/ntohq/buefy-next/issues/16
     */
    defaultCompatFallthrough: boolean,
    /**
     * Default counter behavior of `Taginput`.
     * Default value of `has-counter` prop of `Taginput`.
     * `true` by default.
     */
    defaultTaginputHasCounter: boolean,
    /**
     * Default HTML5 validation behavior of `Input`.
     * Default value of `use-html5-validation` prop of form controls.
     * `true` by default.
     */
    defaultUseHtml5Validation: boolean,
    /**
     * Default mobile modal behavior of `Dropdown`.
     * Default value of `mobile-modal` prop of `Dropdown`.
     * `true` by default.
     */
    defaultDropdownMobileModal: boolean,
    /**
     * Default label position of `Field`.
     * Default value of `label-position` prop of `Field`.
     * `null` by default.
     */
    defaultFieldLabelPosition?: FieldLabelPosition | null,
    /**
     * Default years range of `Datepicker`.
     * Default value of `years-range` prop of `Datepicker`.
     * `[-100, 10]` by default.
     */
    defaultDatepickerYearsRange: [number, number],
    /**
     * Default nearby month days behavior of `Datepicker`.
     * Default value of `nearby-month-days` prop of `Datepicker`.
     * `true` by default.
     */
    defaultDatepickerNearbyMonthDays: boolean,
    /**
     * Default nearby selectable month days behavior of `Datepicker`.
     * Default value of `nearby-selectable-month-days` prop of `Datepicker`.
     * `false` by default.
     */
    defaultDatepickerNearbySelectableMonthDays: boolean,
    /**
     * Default show week number behavior of `Datepicker`.
     * Default value of `show-week-number` prop of `Datepicker`.
     * `false` by default.
     */
    defaultDatepickerShowWeekNumber: boolean,
    /**
     * Default week number clickable behavior of `Datepicker`.
     * Default value of `week-number-clickable` prop of `Datepicker`.
     * `false` by default.
     */
    defaultDatepickerWeekNumberClickable: boolean,
    /**
     * Default mobile modal behavior of `Datepicker`.
     * Default value of `mobile-modal` prop of `Datepicker` and `Clockpicker`.
     * `true` by default.
     */
    defaultDatepickerMobileModal: boolean,
    /**
     * Default trap focus behavior of `Modal`.
     * Default value of `trap-focus` prop of `Colorpicker`, `Datepicker`,
     * `Dialog`, `Dropdown`, and `Modal`.
     * `true` by default.
     */
    defaultTrapFocus: boolean,
    /**
     * Default autofocus behavior of `Modal`.
     * Default value of `autoFocus` prop of `Modal`.
     * `true` by default.
     */
    defaultAutoFocus: boolean,
    /**
     * Default rounded flag for `Button`.
     * Default value of `rounded` prop of `Button`.
     * `false` by default.
     */
    defaultButtonRounded: boolean,
    /**
     * Default rounded flag for `Switch`.
     * Default value of `rounded` prop of `Switch`.
     * `true` by default.
     */
    defaultSwitchRounded: boolean,
    /**
     * Default interval of `Carousel` in milliseconds.
     * 3500 by default.
     */
    defaultCarouselInterval: number,
    /**
     * Default expanded flag for `Tabs`.
     * Default value of `expanded` prop of `Tabs`.
     * `false` by default.
     */
    defaultTabsExpanded: boolean,
    /**
     * Default animated flag for `Tabs`.
     * Default value of `animated` prop of `Tabs`.
     * `true` by default.
     */
    defaultTabsAnimated: boolean,
    /**
     * Default class(es) applied to tab elements in `Tabs`.
     * `null` by default.
     */
    defaultTabsType?: VueClassAttribute | null,
    /**
     * Default status icon flag for form controls (`Input`).
     * `true` by default.
     */
    defaultStatusIcon: boolean,
    /**
     * Default promise behavior of programmatically opened `Dialog`.
     * Programmatically opened `Dialog`s return a `Promise` that resolves
     * when the `Dialog` is closed, if this config is `true`.
     * `false` by default.
     */
    defaultProgrammaticPromise: boolean,
    /**
     * Default tags for link elements.
     * The following tags are accepted by default:
     * - a
     * - button
     * - input
     * - router-link
     * - nuxt-link
     * - n-link
     * - RouterLink
     * - NuxtLink
     * - NLink
     */
    defaultLinkTags: string[],
    /**
     * Default fallback extension or location for WebP images.
     * It is interpretted as an extension, if it starts with a dot (".").
     * Other strings are interpretted as paths to substitute images.
     * No fallback by default.
     */
    defaultImageWebpFallback?: string | null,
    /**
     * Default lazy loading behavior of `Image`.
     * Default value of `lazy` prop of `Image`.
     * `true` by default.
     */
    defaultImageLazy: boolean,
    /**
     * Default responsive behavior of `Image`.
     * Default value of `responsive` prop of `Image`.
     * `true` by default.
     */
    defaultImageResponsive: boolean,
    /**
     * Default ratio of `Image`.
     * Default value of `ratio` prop of `Image`.
     * No ration is applied by default.
     */
    defaultImageRatio?: number | null,
    /**
     * Default srcset formatter of `Image`.
     * Default function that `srcset-formatter` prop of `Image` uses.
     * Buefy provides a default implementation if omitted.
     */
    defaultImageSrcsetFormatter?: ((src: string, size: number) => string) | null,
    /**
     * Default tag of `Breadcrumb` items.
     * Default value of `tag` prop of `BreadcrumbItem`.
     * "a" by default.
     */
    defaultBreadcrumbTag: string,
    /**
     * Default alignment of `Breadcrumb`.
     * Default value of `align` prop of `Breadcrumb`.
     * "is-left" by default.
     */
    defaultBreadcrumbAlign: string,
    /**
     * Default separator of `Breadcrumb`.
     * Default value of `separator` prop of `Breadcrumb`.
     * No separator (an empty string) by default.
     */
    defaultBreadcrumbSeparator: string,
    /**
     * Default size of `Breadcrumb`.
     * Default value of `size` prop of `Breadcrumb`.
     * "is-medium" by default.
     */
    defaultBreadcrumbSize: string,
    /**
     * Custom icon packs.
     * No custom icon packs by default.
     */
    // TODO: refine while rewriting icons.js
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customIconPacks?: Record<string, any> | null
}

let config: BuefyConfig = {
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
    defaultDatetimeFormatter: null,
    defaultDatetimeParser: null,
    defaultDatetimeCreator: null,
    defaultClockpickerHoursLabel: null,
    defaultClockpickerMinutesLabel: null,
    defaultColorFormatter: null,
    defaultColorParser: null,
    defaultModalCanCancel: ['escape', 'x', 'outside', 'button'],
    defaultModalScroll: null,
    defaultDatepickerMobileNative: true,
    defaultTimepickerMobileNative: true,
    defaultTimepickerMobileModal: true,
    defaultNoticeQueue: true,
    defaultInputHasCounter: true,
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

/**
 * {@link BuefyConfig} with all the properties optional.
 *
 * @public
 */
export type BuefyConfigOptions = Partial<BuefyConfig>

export { config as default }

export const setOptions = (options: BuefyConfig) => { config = options }

export const setVueInstance = (Vue: App) => { VueInstance = Vue }

export let VueInstance: App | undefined
