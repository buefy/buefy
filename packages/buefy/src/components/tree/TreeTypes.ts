import type { Slots } from 'vue'
import type { TreeNodeData, TreeFieldMapping, SelectionMode } from '../../utils/TreeHelpers'

export interface BTreeProvide {
    $slots: Slots
    resolvedFields: TreeFieldMapping
    selectionMode: SelectionMode
    internalExpandedKeys: unknown[]
    internalCheckedKeys: unknown[]
    internalSelected: unknown
    focusedKey: unknown
    lazy: boolean
    load: ((node: TreeNodeData) => Promise<TreeNodeData[]>) | null
    filter: string | ((node: TreeNodeData) => boolean) | null
    expandOnClickNode: boolean
    lazyChildrenCache: Record<string, TreeNodeData[]>
    loadingKeys: unknown[]
    loadErrorKeys: unknown[]
    registerNode(key: unknown, data: TreeNodeData): void
    unregisterNode(key: unknown): void
    toggleExpand(key: unknown, data: TreeNodeData): void
    loadNode(key: unknown, data: TreeNodeData): void
    toggleCheck(key: unknown, data: TreeNodeData): void
    handleNodeClick(key: unknown, data: TreeNodeData): void
    handleSelect(key: unknown, data: TreeNodeData): void
    setFocused(key: unknown): void
}
