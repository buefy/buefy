import _Vue from "vue";

import { Dialog, ModalProgrammatic, LoadingProgrammatic, Toast, Snackbar } from "./components";
import { ColorModifiers } from "./helpers";

// Adds Buefy method signatures to Vue instance (ie this.$dialog)
declare module 'vue/types/vue' {
    interface Vue {
        $dialog: typeof Dialog,
        $loading: typeof LoadingProgrammatic,
        $modal: typeof ModalProgrammatic,
        $snackbar: typeof Snackbar,
        $toast: typeof Toast
    }
}

export declare type BuefyConfig = {
    defaultContainerElement?: string,
    defaultIconPack: 'fa' | 'mdi' | string;
    defaultDialogConfirmText?: string;
    defaultDialogCancelText?: string;
    defaultSnackbarDuration: number;
    defaultToastDuration: number;
    defaultTooltipType: ColorModifiers;
    defaultTooltipAnimated: false;
    defaultInputAutocomplete: 'on' | 'off';
    defaultDateFormatter?: string;
    defaultDateParser?: string;
    defaultDayNames?: string;
    defaultMonthNames?: string;
    defaultFirstDayOfWeek?: string;
    defaultTimeFormatter?: string;
    defaultTimeParser?: string;
    defaultModalScroll?: string;
    defaultDatepickerMobileNative: boolean;
    defaultTimepickerMobileNative: boolean;
    defaultNoticeQueue: boolean;
};

declare const _default: {
    install(Vue: typeof _Vue, config: BuefyConfig): void;
};

export {
    Dialog,
    LoadingProgrammatic,
    ModalProgrammatic,
    Snackbar,
    Toast
}

export default _default;
