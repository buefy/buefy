import { hasFlag } from './helpers'

const sorted = 1
const optional = 2

export const Sorted = sorted
export const Optional = optional

export default (parentItemName, flags = 0) => {
    const mixin = {
        inject: { parent: { from: 'b' + parentItemName, default: false } },
        created() {
            if (!this.parent) {
                if (!hasFlag(flags, optional)) {
                    this.$destroy()
                    throw new Error('You should wrap ' + this.$options.name + ' in a ' + parentItemName)
                }
            } else if (this.parent._registerItem) {
                this.parent._registerItem(this)
            }
        },
        beforeUnmount() {
            if (this.parent && this.parent._unregisterItem) {
                this.parent._unregisterItem(this)
            }
        }
    }
    if (hasFlag(flags, sorted)) {
        // a user can explicitly specify the `order` prop to keep the order of
        // children.
        // I can no longer rely on automatic indexing of children, because I
        // could not figure out how to calculate the index of a child in its
        // parent on Vue 3.
        // incomplete dynamic indexing is still available if any child is never
        // unmounted; e.g., not switched with `v-if`
        mixin.props = {
            order: {
                type: Number,
                required: false
            }
        }
        mixin.data = () => {
            return {
                dynamicIndex: null
            }
        }
        mixin.computed = {
            index() {
                return this.order != null ? this.order : this.dynamicIndex
            }
        }
    }
    return mixin
}
