import _Vue from "vue";

import {
    BuefyConfig,
    DialogProgrammatic,
    ModalProgrammatic,
    LoadingProgrammatic,
    ToastProgrammatic,
    SnackbarProgrammatic,
    NotificationProgrammatic,
    ConfigProgrammatic } from "./components";

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

declare const _default: {
    install(Vue: typeof _Vue, config: BuefyConfig): void;
};

export {
    DialogProgrammatic,
    LoadingProgrammatic,
    ModalProgrammatic,
    SnackbarProgrammatic,
    ToastProgrammatic,
    NotificationProgrammatic,
    ConfigProgrammatic
}

export default _default;
