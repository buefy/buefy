// Types shared among the slider components.

import type { ComponentPublicInstance } from 'vue'

/* eslint-disable @typescript-eslint/ban-types */
// Interface that `Slider` is supposed to implement.
export type ISlider = ComponentPublicInstance<
    {
        disabled: boolean,
        min: number,
        max: number,
        step: number,
        precision: number
    }, // P(rops)
    {}, // B (raw bindings)
    {
        _isSlider: true
    }, // D(ata)
    {}, // C(omputed)
    {
        sliderSize: () => number,
        emitValue: (event: 'change' | 'dragging' | 'update:modelValue') => void
    } // M(ethods)
>
/* eslint-enable @typescript-eslint/ban-types */

// values for the `format` prop
export const DISPLAY_FORMATS = ['raw', 'percent'] as const

// type of the `format` prop
export type DisplayFormat = typeof DISPLAY_FORMATS[number]

// type of the `customFormatter` prop
export type CustomFormatter = (value: number) => string
