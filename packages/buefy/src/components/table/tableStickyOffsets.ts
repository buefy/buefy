// Pure helpers for computing per-column `left` pixel offsets for stacked
// sticky ("fixed") columns. See https://github.com/buefy/buefy/discussions/4028.
//
// Unlike `tableColumnHelpers.ts`, these need the *entire* ordered column
// list, because a sticky column's offset depends on the widths of the
// sticky columns before it. `Table.vue` (via `visibleColumns`) is the only
// place with that context, so it's the only caller.

import type { ITableColumn } from './types'

// Keep in sync with the `$table-checkbox-cell-width` SCSS variable's
// default (`src/scss/components/_table.scss`) — this constant can't read
// the CSS value at runtime, so a project that overrides the SCSS variable
// will need sticky data columns to compensate manually (e.g. via a custom
// `width` on the first sticky column).
export const STICKY_CHECKBOX_WIDTH_PX = 40

/*
 * Resolve a column's declared `width` prop to a concrete pixel number, for
 * summing sticky-column offsets only.
 *
 * Only bare numbers (`40`), numeric strings (`"40"`), and `"<number>px"`
 * strings (`"40px"`) resolve to a number; everything else (percentages,
 * `auto`, other CSS units, no width at all) resolves to `0`. This is a
 * documented constraint: a sticky column needs a pixel-resolvable `width`
 * to participate correctly in the stack; otherwise it (and anything after
 * it) falls back toward `left: 0`.
 */
export function widthToStickyPx(width: string | number | undefined): number {
    if (width === undefined || width === null) return 0
    if (typeof width === 'number') return isFinite(width) ? Math.max(0, width) : 0
    const match = /^(\d+(?:\.\d+)?)(px)?$/.exec(width.trim())
    return match ? parseFloat(match[1]) : 0
}

export interface StickyOffsetOptions {
    // true when `checkable && stickyCheckbox && checkboxPosition === 'left'`
    hasStickyCheckboxLeft?: boolean
}

/*
 * Compute each column's cumulative `left` px offset, given the ordered,
 * already-visibility-filtered column list. Returns a same-length array;
 * non-sticky columns get `0` (unused — a sticky column's offset only ever
 * sums *preceding sticky* columns' widths, so non-sticky columns in
 * between are skipped, which is what lets fixed columns be non-contiguous).
 */
export function computeStickyOffsets(
    columns: readonly ITableColumn[],
    options: StickyOffsetOptions = {}
): number[] {
    let cumulative = options.hasStickyCheckboxLeft ? STICKY_CHECKBOX_WIDTH_PX : 0
    return columns.map((column) => {
        if (!column.sticky) return 0
        const offset = cumulative
        cumulative += widthToStickyPx(column.width)
        return offset
    })
}
