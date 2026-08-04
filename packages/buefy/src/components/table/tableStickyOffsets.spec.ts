import { describe, expect, it } from 'vitest'
import {
    computeStickyOffsets,
    STICKY_CHECKBOX_WIDTH_PX,
    widthToStickyPx
} from '@components/table/tableStickyOffsets'
import type { ITableColumn } from '@components/table/types'

function makeColumn(overrides: Partial<ITableColumn> = {}): ITableColumn {
    return {
        thAttrs: () => ({}),
        tdAttrs: () => ({}),
        sticky: false,
        width: undefined,
        ...overrides
    } as ITableColumn
}

describe('widthToStickyPx', () => {
    it('resolves bare numbers', () => {
        expect(widthToStickyPx(40)).toBe(40)
        expect(widthToStickyPx(40.5)).toBe(40.5)
    })

    it('resolves numeric strings and "Npx" strings', () => {
        expect(widthToStickyPx('40')).toBe(40)
        expect(widthToStickyPx('40px')).toBe(40)
        expect(widthToStickyPx('40.5px')).toBe(40.5)
    })

    it('falls back to 0 for percentages, auto, other units, and no width', () => {
        expect(widthToStickyPx('50%')).toBe(0)
        expect(widthToStickyPx('auto')).toBe(0)
        expect(widthToStickyPx('3em')).toBe(0)
        expect(widthToStickyPx('40 px')).toBe(0)
        expect(widthToStickyPx(undefined)).toBe(0)
    })

    it('falls back to 0 for negative/NaN/Infinity numbers', () => {
        expect(widthToStickyPx(-40)).toBe(0)
        expect(widthToStickyPx(NaN)).toBe(0)
        expect(widthToStickyPx(Infinity)).toBe(0)
    })
})

describe('computeStickyOffsets', () => {
    it('gives non-sticky columns an offset of 0', () => {
        const columns = [makeColumn(), makeColumn({ width: 100 })]
        expect(computeStickyOffsets(columns)).toEqual([0, 0])
    })

    it('gives adjacent sticky columns distinct, cumulative offsets', () => {
        const columns = [
            makeColumn({ sticky: true, width: 40 }),
            makeColumn({ sticky: true, width: 60 })
        ]
        expect(computeStickyOffsets(columns)).toEqual([0, 40])
    })

    it('does not let a non-sticky column between sticky columns affect the offset (#4028)', () => {
        const columns = [
            makeColumn({ sticky: true, width: 40 }), // id
            makeColumn({ width: 300 }), // user.first_name (not sticky)
            makeColumn({ width: 300 }), // user.last_name (not sticky)
            makeColumn({ sticky: true, width: 60 }) // date
        ]
        const offsets = computeStickyOffsets(columns)
        expect(offsets).toEqual([0, 0, 0, 40])
        expect(offsets[0]).not.toBe(offsets[3])
    })

    it('propagates 0 from a width-less sticky column to subsequent offsets', () => {
        const columns = [
            makeColumn({ sticky: true, width: undefined }),
            makeColumn({ sticky: true, width: 60 })
        ]
        expect(computeStickyOffsets(columns)).toEqual([0, 0])
    })

    it('shifts every sticky offset by the sticky checkbox width when present', () => {
        const columns = [
            makeColumn({ sticky: true, width: 40 }),
            makeColumn({ sticky: true, width: 60 })
        ]
        expect(computeStickyOffsets(columns, { hasStickyCheckboxLeft: true })).toEqual([
            STICKY_CHECKBOX_WIDTH_PX,
            STICKY_CHECKBOX_WIDTH_PX + 40
        ])
    })
})
