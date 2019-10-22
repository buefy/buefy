import { createProvideOptions, repeated, addColumn, removeColumn } from './provide'

describe('BTable - provide', () => {
    const column = {
        newKey: 'newKey'
    }
    const vm = {
        newColumns: []
    }

    afterEach(() => {
        Object.assign(vm, { newColumns: [] })
    })

    it.each([repeated, addColumn, removeColumn])('provide %p function', (key) => {
        const provide = createProvideOptions(vm)
        expect(provide[key]).toBeInstanceOf(Function)
    })

    it('adds new column', () => {
        const provide = createProvideOptions(vm)
        provide[addColumn](column)
        expect(vm.newColumns).toHaveLength(1)
    })

    it('removes column', () => {
        const provide = createProvideOptions(vm)

        provide[addColumn](column)
        expect(vm.newColumns).toHaveLength(1)

        provide[removeColumn](column.newKey)
        expect(vm.newColumns).toHaveLength(0)
    })

    it('returns true if column is repeated', () => {
        const provide = createProvideOptions(vm)
        provide[addColumn](column)

        expect(provide[repeated](column.newKey)).toBe(true)
    })
})
