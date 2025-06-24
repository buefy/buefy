// Type definitions shared among the pagination components.

export interface PaginationPage {
    number: number
    isCurrent: boolean
    click: (event: PointerEvent) => void
    input: (event: Event, inputNum: number | string) => void
    disabled: boolean
    class: string
    'aria-label': string | null
}
