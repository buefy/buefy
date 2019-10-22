export const repeated = Symbol('repeated')
export const addColumn = Symbol('addColumn')
export const removeColumn = Symbol('removeColumn')
export const cancelBeforeDestroy = Symbol('cancelBeforeDestroy')

export function createProvideOptions(vm) {
    return {
        // Since we're using scoped prop the columns gonna be multiplied,
        // this finds when to stop based on the newKey property.
        [repeated]: (key) => {
            return vm.newColumns.some((column) => column.newKey === key)
        },
        [addColumn]: (column) => {
            vm.newColumns.push(column)
        },
        [removeColumn]: (key) => {
            const index = vm.newColumns.findIndex((column) => column.newKey === key)
            if (index >= 0) vm.newColumns.splice(index, 1)
        },
        [cancelBeforeDestroy]: () => {
            if (!vm.visibleData.length) return true
            if (vm.$children.filter((vm) => vm.$options._componentTag === 'b-table-column' &&
                vm.$data.newKey === this.newKey).length !== 1) return true
        }
    }
}
