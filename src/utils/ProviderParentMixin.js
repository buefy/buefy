import {hasFlag} from './helpers'

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
                childItems: []
            }
        }
        mixin.methods = {
            _registerItem(item) {
                this.childItems.push(item)
            },
            _unregisterItem(item) {
                this.childItems = this.childItems.filter((i) => i !== item)
            }
        }

        if (hasFlag(flags, sorted)) {
            mixin.watch = {
                /**
                 * When items are added/removed deep search in the elements default's slot
                 * And mark the items with their index
                 */
                childItems(items) {
                    if (items.length > 0 && this.$scopedSlots.default) {
                        let tag = items[0].$vnode.tag
                        let index = 0

                        const deepSearch = (children) => {
                            for (let child of children) {
                                if (child.tag === tag) {
                                    // An item with the same tag will for sure be found
                                    const it = items.find((i) => i.$vnode === child)
                                    if (it) {
                                        it.index = index++
                                    }
                                } else if (child.tag) {
                                    const sub = child.componentInstance
                                        ? (child.componentInstance.$scopedSlots.default
                                            ? child.componentInstance.$scopedSlots.default()
                                            : child.componentInstance.$children)
                                        : child.children
                                    if (Array.isArray(sub) && sub.length > 0) {
                                        deepSearch(sub.map((e) => e.$vnode))
                                    }
                                }
                            }
                            return false
                        }

                        deepSearch(this.$scopedSlots.default())
                    }
                }
            }
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
