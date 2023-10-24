import {ColorModifiers, SizesModifiers} from "../helpers";

export interface ButtonProps {
    type?: ColorModifiers,
    size?: SizesModifiers,
    label?: string;
    loading?: boolean;
    rounded?: boolean;
    outlined?: boolean;
    focused?: boolean;
    inverted?: boolean;
    hovered?: boolean;
    active?: boolean;
    expanded?: boolean;
    'icon-left'?: string;
    'icon-right'?: string;
    'native-type'?: string;
    'tag'?: 'button' | 'a' | 'input' | 'router-link' | 'nuxt-link' | string;
}
