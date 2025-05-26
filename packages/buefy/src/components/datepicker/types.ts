// Defines common types used among the datepicker components.

import type { ComponentPublicInstance } from 'vue'

export interface DatepickerEvent {
    type: string
    date: Date
}

export interface FocusedDate {
    year: number
    month: number
    day?: number
}

export type DateSelector = (day: Date) => boolean

/* eslint-disable @typescript-eslint/ban-types */
// Partial interface that `Datepicker` is supposed to satisfy.
//
// Defined separately to avoid circular dependencies.
export type IDatepicker = ComponentPublicInstance<
    {
        multiple?: boolean
    }, // P(rops)
    {}, // B (raw bindings)
    {}, // D(ata)
    {
        isTypeMonth: () => boolean,
        dtf: () => Intl.DateTimeFormat
        dtfMonth: () => Intl.DateTimeFormat
    }, // C(omputed)
    {}, // M(ethods)
    {
        'week-number-click': (_week: number, _year: number) => boolean
    } // E(mits)
>
/* eslint-enable @typescript-eslint/ban-types */

export type DateFormatter = (date: Date | Date[], vm: IDatepicker) => string
export type DateParser = (date: string, vm: IDatepicker) => Date | null
