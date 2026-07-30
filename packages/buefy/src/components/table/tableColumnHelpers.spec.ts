import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import TableColumn from '@components/table/TableColumn.vue'
import mockTableColumn from '@components/table/mockTableColumn'
import {
    computeColumnStyle,
    computeIsHeaderUnselectable,
    computeRootClasses,
    computeRootClassesForRow,
    computeRootStyleForRow,
    computeThClasses,
    computeThStyle
} from '@components/table/tableColumnHelpers'
import type { ITableColumn, TableColumnHost } from '@components/table/types'

function makeColumn(overrides: Partial<ITableColumn> = {}): ITableColumn {
    return {
        thAttrs: () => ({}),
        tdAttrs: () => ({}),
        headerClass: undefined,
        cellClass: undefined,
        sortable: false,
        sticky: false,
        headerSelectable: false,
        numeric: false,
        centered: false,
        width: undefined,
        ...overrides
    } as ITableColumn
}

describe('tableColumnHelpers', () => {
    it('computeIsHeaderUnselectable is true only when sortable and not headerSelectable', () => {
        expect(computeIsHeaderUnselectable(makeColumn())).toBe(false)
        expect(computeIsHeaderUnselectable(makeColumn({ sortable: true }))).toBe(true)
        expect(computeIsHeaderUnselectable(
            makeColumn({ sortable: true, headerSelectable: true })
        )).toBe(false)
    })

    it('computeColumnStyle converts width to a CSS width', () => {
        expect(computeColumnStyle(makeColumn({ width: 100 }))).toEqual({ width: '100px' })
        expect(computeColumnStyle(makeColumn({ width: '50%' }))).toEqual({ width: '50%' })
        expect(computeColumnStyle(makeColumn())).toEqual({ width: undefined })
    })

    it('computeThClasses includes sortable/sticky/unselectable modifiers and thAttrs classes', () => {
        const column = makeColumn({
            headerClass: 'my-header',
            sortable: true,
            sticky: true,
            thAttrs: () => ({ class: 'from-attrs' })
        })
        expect(computeThClasses(column)).toEqual([
            'my-header',
            { 'is-sortable': true, 'is-sticky': true, 'is-unselectable': true },
            'from-attrs'
        ])
    })

    it('computeThStyle merges the column style with thAttrs style', () => {
        const column = makeColumn({ width: 100, thAttrs: () => ({ style: { color: 'red' } }) })
        expect(computeThStyle(column)).toEqual([{ width: '100px' }, { color: 'red' }])
    })

    it('computeRootClasses applies numeric/centered/sticky modifiers', () => {
        expect(computeRootClasses(makeColumn({ numeric: true }))).toEqual([
            undefined, { 'has-text-right': true, 'has-text-centered': false, 'is-sticky': false }
        ])
        expect(computeRootClasses(makeColumn({ numeric: true, centered: true }))).toEqual([
            undefined, { 'has-text-right': false, 'has-text-centered': true, 'is-sticky': false }
        ])
    })

    it('computeRootClassesForRow/computeRootStyleForRow merge tdAttrs', () => {
        const row = { id: 1 }
        const column = makeColumn({
            cellClass: 'my-cell',
            tdAttrs: () => ({ class: 'from-td', style: { color: 'blue' } })
        })
        expect(computeRootClassesForRow(column, row)).toEqual([
            ['my-cell', { 'has-text-right': false, 'has-text-centered': false, 'is-sticky': false }],
            'from-td'
        ])
        expect(computeRootStyleForRow(column, row)).toEqual([{ color: 'blue' }])
    })

    describe('parity between TableColumn.vue and mockTableColumn', () => {
        const fakeTable: TableColumnHost = {
            _registerTableColumn: () => {},
            _unregisterTableColumn: () => {}
        }
        // explicit values for every field the helpers read, so the comparison
        // isn't muddied by TableColumn.vue's real Boolean-prop defaults (`false`)
        // differing from mockTableColumn's plain-object defaults (`undefined`)
        // — both falsy, but not `toEqual`-identical.
        const props = {
            label: 'Name',
            field: 'name',
            width: 120,
            numeric: true,
            centered: false,
            sortable: true,
            sticky: false,
            headerSelectable: false,
            headerClass: 'my-header',
            cellClass: 'my-cell'
        }

        it('produces identical thClasses, thStyle, style, and row-level helpers', () => {
            const wrapper = mount(TableColumn, {
                props,
                global: { provide: { $table: fakeTable } }
            })
            const mocked = mockTableColumn(fakeTable, props)
            const row = { name: 'Jesse' }

            expect(wrapper.vm.thClasses).toEqual(mocked.thClasses)
            expect(wrapper.vm.thStyle).toEqual(mocked.thStyle)
            expect(wrapper.vm.style).toEqual(mocked.style)
            expect(wrapper.vm.getRootClasses(row)).toEqual(mocked.getRootClasses(row))
            expect(wrapper.vm.getRootStyle(row)).toEqual(mocked.getRootStyle(row))
        })

        // pre-existing, intentionally-preserved inconsistency: see the NOTE
        // above `thWrapStyle` in mockTableColumn.ts.
        it('thWrapStyle differs for percentage widths (pre-existing behavior, not changed by this refactor)', () => {
            const percentProps = { ...props, width: '50%' }
            const wrapper = mount(TableColumn, {
                props: percentProps,
                global: { provide: { $table: fakeTable } }
            })
            const mocked = mockTableColumn(fakeTable, percentProps)

            expect(wrapper.vm.thWrapStyle).toEqual({}) // percentage skipped on <b-table-column>
            expect(mocked.thWrapStyle).toEqual({ width: '50%' }) // NOT skipped via `columns` prop
        })
    })
})
