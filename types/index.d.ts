import _Vue from "vue";

import {
    DialogProgrammatic,
    ModalProgrammatic,
    LoadingProgrammatic,
    ToastProgrammatic,
    SnackbarProgrammatic,
    NotificationProgrammatic } from "./components";
import { ColorModifiers, GlobalPositions } from "./helpers";

// Adds Buefy method signatures to Vue instance (ie this.$buefy.dialog)
declare module 'vue/types/vue' {
    interface Vue {
        $buefy: BuefyNamespace
    }
}

export declare type BuefyNamespace = {
    dialog: typeof DialogProgrammatic,
    loading: typeof LoadingProgrammatic,
    modal: typeof ModalProgrammatic,
    snackbar: typeof SnackbarProgrammatic,
    toast: typeof ToastProgrammatic,
    notification: typeof NotificationProgrammatic
}

export declare type BuefyConfig = {
    defaultContainerElement?: string,
    defaultIconPack?: string;
    defaultIconComponent?: string;
    defaultIconPrev?: string;
    defaultIconNext?: string;
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
    customIconPacks?: any;
    defaultClockpickerHoursLabel?: string;
    defaultClockpickerMinutesLabel?: string;
    defaultTrapFocus?: boolean;
};

declare const _default: {
    install(Vue: typeof _Vue, config: BuefyConfig): void;
};

export {
    DialogProgrammatic,
    LoadingProgrammatic,
    ModalProgrammatic,
    SnackbarProgrammatic,
    ToastProgrammatic,
    NotificationProgrammatic
}

export default _default;
