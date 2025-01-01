// Common types between `ProviderParentMixin` and `InjectedChildMixin`.

// Interface that `InjectedChildMixin` is supposed to implement.
export interface InjectedChild {
    // `ProviderParent` will use `uniqueValue` to identify the child.
    uniqueValue: string | number
    // `ProviderParent` will use `index` to sort the children.
    index: number
    // `ProviderParent` will set `dynamicIndex` to tell the child the order
    // of its registration.
    dynamicIndex?: number
}

// Interface that `ProviderParentMixin` is supposed to implement.
export interface ProviderParent {
    // `InjectedChild` has to call `_registerItem` on mount.
    _registerItem(item: InjectedChild): void
    // `InjectedChild` has to call `_unregisterItem` on unmount.
    _unregisterItem(item: InjectedChild): void
}
