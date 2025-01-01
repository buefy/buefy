// Common types between `TabbedMixin` and `TabbedChildMixin`.

import type { Slots } from 'vue'
import type { VueClassAttribute } from './config'
import type { InjectedChild, ProviderParent } from './ProvideInjectTypes'

// Interface that `TabbedChildMixin` is supposed to implement.
export interface TabbedChild extends InjectedChild {
    visible: boolean
    disabled?: boolean
    isActive: boolean
    label?: string
    headerClass: VueClassAttribute
    icon?: string
    iconPack?: string
    $slots: Slots

    // `TabbedParent` will call `activate` when the child tab turns active.
    activate(oldIndex: number): void
    // `TabbedParent` will call `deactivate` when the child tab turns inactive.
    deactivate(newIndex: number): void
}

// Interface that `TabbedMixin` is supposed to implement.
export interface TabbedParent extends ProviderParent {
    vertical: boolean
    animated: boolean
    animateInitially: boolean
    animation?: string
    isTransitioning: boolean
    destroyOnHide: boolean
    activeItem: TabbedChild
}
