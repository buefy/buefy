import type { DefineComponent } from 'vue'

import { hasFlag } from './helpers'
import type { InjectedChild } from './ProvideInjectTypes'

const items = 1
const sorted = 3

export const Items = items
export const Sorted = sorted

export type FeatureFlags = 0 | typeof Items | typeof Sorted

/* eslint-disable @typescript-eslint/ban-types */
// conditional data fields of ProviderParentMixin
export type ProviderParentMixinData<
    Flags extends FeatureFlags,
    Child extends InjectedChild,
    HasItems extends boolean = Flags extends typeof Items | typeof Sorted ? true : false,
    IsSorted extends boolean = Flags extends typeof Sorted ? true : false
> = (HasItems extends true ? { childItems: Child[] } : {})
    & (IsSorted extends true ? { nextIndex: number } : {})

// conditional computed fields of ProviderParentMixin
export type ProviderParentMixinComputed<
    Flags extends FeatureFlags,
    Child extends InjectedChild,
    IsSorted extends boolean = Flags extends typeof Sorted ? true : false
> = IsSorted extends true ? { sortedItems(): Child[] } : {}

// conditional methods of ProviderParentMixin
export type ProviderParentMixinMethods<
    Flags extends FeatureFlags,
    Child extends InjectedChild,
    HasItems extends boolean = Flags extends typeof Items | typeof Sorted ? true : false
> = HasItems extends true ? {
    _registerItem(item: Child): void
    _unregisterItem(item: Child): void
} : {}

export type ProviderParentMixin<
    Flags extends FeatureFlags,
    Child extends InjectedChild
> = DefineComponent<
    {}, // PropsOrPropOptions
    {}, // RawBindings
    ProviderParentMixinData<Flags, Child>, // D(ata)
    ProviderParentMixinComputed<Flags, Child>, // C(computed)
    ProviderParentMixinMethods<Flags, Child> // M(ethods)
>
/* eslint-enable @typescript-eslint/ban-types */

export default <
    Flags extends FeatureFlags = FeatureFlags,
    Child extends InjectedChild = InjectedChild
>(itemName: string, flags?: Flags): ProviderParentMixin<Flags, Child> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mixin: any = {
        provide() {
            return {
                ['b' + itemName]: this
            }
        }
    }

    if (flags !== undefined && hasFlag(flags, items)) {
        mixin.data = function () {
            return {
                childItems: [] as Child[],
                ...(hasFlag(flags, sorted) ? { nextIndex: 0 } : {})
            }
        }
        mixin.methods = {
            _registerItem(item: Child) {
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
            _unregisterItem(item: Child) {
                this.childItems = this.childItems
                    .filter((i: Child) => i.uniqueValue !== item.uniqueValue)
            }
        }

        if (hasFlag(flags, sorted)) {
            mixin.computed = {
                /**
                 * When items are added/removed sort them according to their position
                 */
                sortedItems() {
                    return this.childItems.slice().sort((i1: Child, i2: Child) => {
                        return i1.index - i2.index
                    })
                }
            }
        }
    }
    return mixin
}
