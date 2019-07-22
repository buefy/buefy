import _Vue from "vue";

import { Dialog, ModalProgrammatic, LoadingProgrammatic, Toast, Snackbar, NotificationProgrammatic } from "./components";
import { ColorModifiers, GlobalPositions } from "./helpers";

// Adds Buefy method signatures to Vue instance (ie this.$dialog)
declare module 'vue/types/vue' {
    interface Vue {
        $dialog: typeof Dialog,
        $loading: typeof LoadingProgrammatic,
        $modal: typeof ModalProgrammatic,
        $snackbar: typeof Snackbar,
        $toast: typeof Toast,
        $notification: typeof NotificationProgrammatic
    }
}

export declare type BuefyConfig = {
    defaultContainerElement?: string,
    defaultIconPack?: string;
    defaultIconComponent?: string;
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
    defaultUseHtml5Validation?: boolean;
    defaultDropdownMobileModal?: boolean;
    defaultFieldLabelPosition?: 'inside' | 'on-border';
    defaultDatepickerYearsRange?: number[];
    defaultDatepickerNearbyMonthDays?: boolean;
    defaultDatepickerNearbySelectableMonthDays?: boolean;
};

declare const _default: {
    install(Vue: typeof _Vue, config: BuefyConfig): void;
};

export {
    Dialog,
    LoadingProgrammatic,
    ModalProgrammatic,
    Snackbar,
    Toast,
    NotificationProgrammatic
}

export default _default;
