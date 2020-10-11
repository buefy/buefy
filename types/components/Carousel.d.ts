import {ColorModifiers, IconPacks, SizesModifiers} from "../helpers";

export interface CarouselProps {
    animated?: 'fade' | 'slide';
    interval?: number;
    'has-drag'?: boolean;
    autoplay?: boolean;
    'pause-hover'?: boolean;
    'pause-info'?: boolean;
    'pause-info-type'?: ColorModifiers | string;
    'pause-text'?: string;
    arrow?: boolean;
    'arrow-hover'?: boolean;
    repeat?: boolean;
    'icon-pack'?: IconPacks;
    'icon-size'?: SizesModifiers;
    'icon-prev'?: string;
    'icon-next'?: string;
    indicator?: boolean;
    'indicator-background'?: boolean;
    'indicator-custom'?: boolean;
    'indicator-custom-size'?: 'is-small' | 'is-medium';
    'indicator-inside'?: boolean;
    'indicator-mode'?: 'click' | 'hover';
    'indicator-position'?: 'is-top' | 'is-bottom';
    'indicator-style'?: 'is-boxes' | 'is-dots' | 'is-lines';
    'overlay'?: boolean;
    'progress'?: boolean;
    'progress-type'?: ColorModifiers;
    'with-carousel-list'?: boolean;
}

export interface CarouselList<T = any> {
    data?: T[];
    'has-drag'?: boolean;
    'has-grayscale'?: boolean;
    'has-opacity'?: boolean;
    repeat?: boolean;
    'items-to-show'?: number;
    'items-to-list'?: boolean;
    'as-indicator'?: boolean;
    refresh?: boolean;
    arrow?: boolean;
    'arrow-hover'?: boolean;
    'icon-pack'?: IconPacks;
    'icon-size'?: SizesModifiers;
    'icon-prev'?: string;
    'icon-next'?: string;
}
