import _Vue from "vue";
import {ColorModifiers, GlobalPositions, SizesModifiers} from "./helpers";

// Component base definition
export class BComponent extends _Vue {
    // Simple catch-all to allow any prop/type
    [key: string]: any
}

export declare type BuefyConfig = {
    defaultContainerElement?: string,
    defaultIconPack?: string;
    defaultIconComponent?: string;
    defaultIconPrev?: string;
    defaultIconNext?: string;
    defaultLocale?: undefined | string | string[],
    defaultDialogConfirmText?: string;
    defaultDialogCancelText?: string;
    defaultSnackbarDuration?: number;
    defaultSnackbarPosition?: GlobalPositions;
    defaultToastDuration?: number;
    defaultToastPosition?: GlobalPositions;
    defaultNotificationDuration?: number;
    defaultNotificationPosition?: GlobalPositions;
    defaultTooltipType?: ColorModifiers;
    defaultTooltipAnimated?: boolean;
    defaultTooltipDelay?: number;
    defaultInputAutocomplete?: string;
    defaultDateFormatter?: Function;
    defaultDateParser?: Function;
    defaultDateCreator?: Function;
    defaultDayNames?: string[];
    defaultMonthNames?: string[];
    defaultFirstDayOfWeek?: number;
    defaultUnselectableDaysOfWeek?: number[];
    defaultTimeFormatter?: Function;
    defaultTimeParser?: Function;
    defaultModalCanCancel?: string[];
    defaultModalScroll?: string;
    defaultDatepickerMobileNative?: boolean;
    defaultTimepickerMobileNative?: boolean;
    defaultNoticeQueue?: boolean;
    defaultInputHasCounter?: boolean;
    defaultTaginputHasCounter?: boolean;
    defaultUseHtml5Validation?: boolean;
    defaultDropdownMobileModal?: boolean;
    defaultFieldLabelPosition?: 'inside' | 'on-border';
    defaultDatepickerYearsRange?: number[];
    defaultDatepickerNearbyMonthDays?: boolean;
    defaultDatepickerNearbySelectableMonthDays?: boolean;
    defaultDatepickerShowWeekNumber?: boolean;
    defaultClockpickerHoursLabel?: string;
    defaultClockpickerMinutesLabel?: string;
    defaultTrapFocus?: boolean;
    defaultButtonRounded?: boolean;
    defaultSwitchRounded?: boolean;
    defaultCarouselInterval?: number;
    defaultTabsExpanded?: boolean;
    defaultTabsAnimated?: boolean;
    defaultTabsType?: string;
    defaultLinkTags?: string[];
    defaultImageWebpFallback?: string,
    defaultImageLazy?: boolean,
    defaultImageResponsive?: boolean,
    defaultImageRatio?: string,
    defaultImageSrcsetFormatter?: Function,
    customIconPacks?: any;
};

export declare type BDialogConfig = {
    /**
     * Dialog title
     */
    title?: string;

    /**
     * Message text
     */
    message: string | any[];

    /**
     * Adds an icon on the left side depending on the <code>type</code> or <code>icon</code>
     */
    hasIcon?: boolean;

    /**
     * Icon name if <code>hasIcon</code>, optional
     */
    icon?: string;

    /**
     * Icon pack to use if <code>hasIcon</code>, optional
     */
    iconPack?: string;

    /**
     * Dialog\'s size, optional
     */
    size?: SizesModifiers;

    /**
     * Custom animation (transition name)
     */
    animation?: string;

    /**
     * Text of the confirm button
     */
    confirmText?: string;

    /**
     * Text of the cancel button
     */
    cancelText?: string;

    /**
     * Can close dialog by clicking cancel button, pressing escape or clicking outside
     */
    canCancel?: boolean | Array<'escape' | 'button' | 'outside'>;

    /**
     * Turning this prop into false allows to make async requests in onConfirm callback
     */
    closeOnConfirm?: boolean;

    /**
    * DOM element the dialog will be created on.
    * Note that this also changes the position of the dialog from fixed
    * to absolute. Meaning that the container should be fixed.
    */
    container?: string;

    /**
     * Callback function when the confirm button is clicked
     */
    onConfirm?: (value: string, dialog: BComponent) => any;

    /**
     * Callback function when the dialog is canceled (cancel button is clicked / pressed escape / clicked outside)
     */
    onCancel?: () => any;

    /**
     * Type (color) of the confirm button (and the icon if <code>hasIcon</code>)
     */
    type?: ColorModifiers;

    /**
     * <code>clip</code> to remove the <code>&lt;body&gt;</code> scrollbar, <code>keep</code> to have a non scrollable scrollbar
     * to avoid shifting background, but will set <code>&lt;body&gt;</code> to position fixed, might break some layouts
     */
    scroll?: 'clip' | 'keep';

    /**
     * Focus on confirm or cancel button (when dialog is not prompt)
     */
    focusOn?: 'confirm' | 'cancel';

    /**
     * Trap focus inside the dialog.
     */
    trapFocus?: boolean;

    /**
     * Role attribute to be passed to modal container for better accessibility.
     */
    ariaRole?: 'dialog' | 'alertdialog';

   /**
    * Aria label attribute to be passed to modal container for better accessibility.
    */
   ariaLabel?: string;

   /**
    * Improve accessiblity when enabled.
    */
   ariaModal?: boolean;

   /**
    * CSS classes to be applied on modal
    */
   customClass?: string;
}
type BPromptDialogConfig = BDialogConfig & {
    /**
     * Prompt only: input's attributes
     */
    inputAttrs?: any;
};
export declare const DialogProgrammatic: {
    alert: (params: BDialogConfig | string) => BComponent;
    confirm: (params: BDialogConfig) => BComponent;
    prompt: (params: BPromptDialogConfig) => BComponent;
}

export class BLoadingComponent extends BComponent {
    close: () => any
}
declare type BLoadingConfig = {
    /**
     * Element to be injected
     */
    container?: any;

    /**
     * Loader will overlay the full page
     */
    isFullPage?: boolean;

    /**
     * Custom animation (transition name)
     */
    animation?: string;

    /**
     * Can close Loading by pressing escape or clicking outside
     */
    canCancel?: boolean;

    /**
     * Callback function to call after user canceled
     */
    onCancel?: () => any;
}
export declare const LoadingProgrammatic: {
    open: (params: BLoadingConfig) => BLoadingComponent;
}

export class BModalComponent extends BComponent {
    close: () => any
}
declare type BModalConfig = {
    /**
     * Component to be injected, used to open a component modal programmatically
     */
    component?: typeof _Vue;

    /**
     * Parent component of the modal, required if using component
     */
    parent?: _Vue;

    /**
     * Props to be binded to the injected component
     */
    props?: any;

    /**
     * Events to be binded to the injected component
     */
    events?: {
        [index: string]: Function
    };

    /**
     * HTML content
     */
    content?: string;

    /**
     * Width of the Modal
     */
    width?: string | number;

    /**
     * If your modal content has a .modal-card as root
     */
    hasModalCard?: boolean;

    /**
     * Custom animation (transition name)
     */
    animation?: string;

    /**
     * Can close Modal by clicking 'X', pressing escape or clicking outside
     */
    canCancel?: boolean | Array<any>;

    /**
     * Callback function to call after user canceled
     */
    onCancel?: () => any;

    /**
     * clip to remove the <body> scrollbar, keep to have a non scrollable scrollbar
     */
    scroll?: 'clip' | 'keep';

    /**
     * Display modal as full screen
     */
    fullScreen?: boolean;

    /**
     * Trap focus inside the dialog.
     */
    trapFocus?: boolean;

    /**
     * Role attribute to be passed to modal container for better accessibility.
     */
    ariaRole?: 'dialog' | 'alertdialog';

    /**
     * Improve accessiblity when enabled.
     */
    ariaModal?: boolean;

    /**
     * CSS classes to be applied on modal
    */
    customClass?: string;
}
export declare const ModalProgrammatic: {
    open: (params: BModalConfig | string) => BModalComponent;
}

// Notice Component base definition
export class BNoticeComponent extends BComponent {
    close: () => any
}

export declare type BNoticeConfig = {
    /**
    * Message text
    */
    message: string | any[];

    /**
    * Type (color)
    */
    type?: ColorModifiers;

    /**
    * Which position it will appear
    */
    position?: GlobalPositions;

    /**
    * Visibility duration in milliseconds
    */
    duration?: number;

    /**
     * Show indefinitely until it is dismissed
     */
    indefinite?: boolean;

    /**
    * DOM element it will be created on.
    * Note that this also changes the position of the element from fixed
    * to absolute. Meaning that the container should be fixed.
    */
    container?: string;

    /**
    * disable queue
    */
    queue?: boolean;
}

export declare type BSnackbarConfig = BNoticeConfig & {
    /**
     * Snackbar's button text
     */
    actionText?: string | null;

    /**
     * Snackbar's cancel button text
     */
    cancelText?: string | null;

    /**
     * 	Callback function when the button is clicked
     */
    onAction?: () => any;
}
export declare const SnackbarProgrammatic: {
    open: (params: BSnackbarConfig | string) => BNoticeComponent;
}


export declare const ToastProgrammatic: {
    open: (params: BNoticeConfig | string) => BNoticeComponent;
}

export declare type BNotificationConfig = BNoticeConfig & {
    /**
     * Adds an icon on the left side
     */
    hasIcon?: boolean;
}
export declare const NotificationProgrammatic: {
    open: (params: BNotificationConfig | string) => BNoticeComponent;
}


export declare const ConfigProgrammatic: {
    getOptions: () => BuefyConfig
    setOptions: (params: BuefyConfig) => any
}
