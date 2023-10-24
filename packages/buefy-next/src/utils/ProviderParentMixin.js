import { hasFlag } from './helpers'

const items = 1
const sorted = 3

export const Items = items
export const Sorted = sorted

export default (itemName, flags = 0) => {
    const mixin = {
        provide() {
            return {
                ['b' + itemName]: this
            }
        }
    }

    if (hasFlag(flags, items)) {
        mixin.data = function () {
            return {
                childItems: [],
                ...(hasFlag(flags, sorted) ? { nextIndex: 0 } : {})
            }
        }
        mixin.methods = {
            _registerItem(item) {
                if (hasFlag(flags, sorted)) {
                    // assigns a dynamic index.
                    // dynamic indices will be messed up if any child is
                    // unmounted.
                    // use the new `order` prop to maintain the ordering.
                    item.dynamicIndex = this.nextIndex
                    ++this.nextIndex
                }
                this.childItems.push(item)
            },
            _unregisterItem(item) {
                this.childItems = this.childItems.filter((i) => i.value !== item.value)
            }
        }

        if (hasFlag(flags, sorted)) {
            mixin.computed = {
                /**
                 * When items are added/removed sort them according to their position
                 */
                sortedItems() {
                    return this.childItems.slice().sort((i1, i2) => {
                        return i1.index - i2.index
                    })
                }
            }
        }
    }
    return mixin
}
