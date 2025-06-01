import type { ComponentPublicInstance, DefineComponent, ExtractPropTypes, PropType } from 'vue'

import { hasFlag } from './helpers'
import type { ProviderParent } from './ProvideInjectTypes'

const sorted = 1
const optional = 2

export const Sorted = sorted
export const Optional = optional

export type FeatureFlags = 0 | typeof Sorted | typeof Optional

/* eslint-disable @typescript-eslint/ban-types */
// conditional props of InjectedChildMixin
export type InjectedChildMixinPropOptions<
    Flags extends FeatureFlags,
    IsSorted = Flags extends typeof Sorted ? true : false
> = {
    value: {
        type: PropType<string | null>,
        default: null
    }
} & (IsSorted extends true ? { order: PropType<number> } : {})

// conditional data fields of InjectedChildMixin
export type InjectedChildMixinData<
    Flags extends FeatureFlags,
    Parent extends ProviderParent,
    IsSorted = Flags extends typeof Sorted ? true : false,
    IsOptional = Flags extends typeof Optional ? true : false
> = (IsSorted extends true ? { dynamicIndex?: number } : {})
    // mocks the injected `parent` with a readonly data field,
    // because `DefineComponent` does not expose injected fields
    // FIXME: why an empty string? → see the initial value of `parent`
    & (IsOptional extends true ? { parent: Parent | '' } : { parent: Parent })

// conditional computed fields of InjectedChildMixin
export type InjectedChildMixinComputed<
    Flags extends FeatureFlags,
    IsSorted extends boolean = Flags extends typeof Sorted ? true : false
> = {
    uniqueValue(): string | number
} & (IsSorted extends true ? { index(): number } : {})

export type InjectedChildMixin<
    Flags extends FeatureFlags,
    Parent extends ProviderParent
> = DefineComponent<
    InjectedChildMixinPropOptions<Flags>, // PropsOrPropOptions
    {}, // RawBindings
    InjectedChildMixinData<Flags, Parent>,
    InjectedChildMixinComputed<Flags>,
    {} // M(ethods). arbitrary field is mapped to a Function if omitted.
>

type InjectedChildMixinInstance<
    Flags extends FeatureFlags,
    Parent extends ProviderParent
> = ComponentPublicInstance<
    ExtractPropTypes<InjectedChildMixinPropOptions<Flags>>, // P(rops)
    {}, // RawBindings
    InjectedChildMixinData<Flags, Parent>, // D(ata)
    InjectedChildMixinComputed<Flags>, // C(omputed)
    {} // M(ethods). arbitrary field is mapped to a Function if omitted.
>
/* eslint-enable @typescript-eslint/ban-types */

export default <
    Flags extends FeatureFlags = FeatureFlags,
    Parent extends ProviderParent = ProviderParent
>(parentItemName: string, flags?: Flags): InjectedChildMixin<Flags, Parent> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mixin: any = {
        // FIXME: initializing `parent` with an empty string does not make
        // sense at all, but some code supposes that `parent` is non-null.
        // so I leave it as is for now.
        inject: { parent: { from: 'b' + parentItemName, default: '' } },
        props: {
            // if `value` is non-null, it must be unique among all the siblings.
            // see `uniqueValue`
            value: {
                type: String,
                default: null
            }
        },
        computed: {
            // `ProviderParentMixin` uses `uniqueValue` computed value to
            // identify the child in its `childItems` collection.
            // so the value must be unique among all the siblings.
            // falls back to the `uid` internal field to ensure uniqueness.
            uniqueValue() {
                return this.value != null ? this.value : this.$.uid
            }
        } as ThisType<InjectedChildMixinInstance<FeatureFlags, Parent>>,
        created() {
            if (!this.parent) {
                if (flags !== undefined && !hasFlag(flags, optional)) {
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
    if (flags !== undefined && hasFlag(flags, sorted)) {
        // a user can explicitly specify the `order` prop to keep the order of
        // children.
        // I can no longer rely on automatic indexing of children, because I
        // could not figure out how to calculate the index of a child in its
        // parent on Vue 3.
        // incomplete dynamic indexing is still available if any child is never
        // unmounted; e.g., not switched with `v-if`
        mixin.props = {
            ...mixin.props,
            order: {
                type: Number,
                required: false
            }
        }
        mixin.data = () => {
            return {
                dynamicIndex: undefined
            }
        }
        mixin.computed = {
            ...mixin.computed,
            index() {
                return this.order != null ? this.order : this.dynamicIndex
            }
        }
    }
    return mixin
}
