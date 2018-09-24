import _Vue from "vue";
import { ColorModifiers, GlobalPositions } from "./helpers";

export declare type DialogConfig = {
    /**
     * Dialog title
     */
    title?: string;

    /**
     * Message text
     */
    message: string;

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
    size?: 'is-small' | 'is-medium' | 'is-large';

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
    canCancel?: boolean | Array<any>;

    /**
     * Callback function when the confirm button is clicked
     */
    onConfirm?: (value: string) => any;

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
}

type PromptDialogConfig = DialogConfig & {
    /**
     * Prompt only: input's attributes
     */
    inputAttrs?: any;
};

export declare const Dialog: {
    alert: (params: DialogConfig | string) => any;
    confirm: (params: DialogConfig) => any;
    prompt: (params: PromptDialogConfig) => any;
}

declare type LoadingConfig = {
    container?: any;
    isFullPage?: boolean;
    animation?: string;
    canCancel?: boolean;
    onCancel?: () => any;
}
export declare const LoadingProgrammatic: {
    open: (params: LoadingConfig) => { close: () => any };
}

declare type ModalConfig = {
    content?: string;
    component?: typeof _Vue;
    parent?: _Vue;
    props?: any;
    events?: {
        [index: string]: Function
    };
    width?: string | number;
    hasModalCard?: boolean;
    animation?: string;
    canCancel?: boolean | Array<any>;
    onCancel?: () => any;
    scroll?: 'clip' | 'keep';
}

export declare const ModalProgrammatic: {
    open: (params: ModalConfig | string) => any;
}

export declare type SnackbarConfig = {
    message: string;
    type?: ColorModifiers;
    position?: GlobalPositions;
    duration?: number;
    container?: string;
    actionText?: string | null;
    queue?: boolean;
    indefinite?: boolean;
    onAction?: () => any;
}
export declare const Snackbar: {
    open: (params: SnackbarConfig | string) => void;
}

export declare type ToastConfig = {
    /**
     * Type (color) of the toast
     */
    type?: ColorModifiers;

    /**
     * Message text
     */
    message: string;

    /**
     * Which position the toast will appear
     */
    position?: GlobalPositions;

    /**
     * Visibility duration in milliseconds
     */
    duration?: number;

    /**
     * DOM element the toast will be created on.
     * Note that this also changes the position of the toast from fixed
     * to absolute. Meaning that the container should be fixed.
     */
    container?: string;
    
    /**
     * disable queue
     */
    queue?: boolean;
}

export declare const Toast: {
    open: (params: ToastConfig | string) => any;
}
