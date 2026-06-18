export interface TreeFieldMapping {
    label: string;
    children: string;
    isLeaf: string;
    id: string;
    disabled: string;
}

export const DEFAULT_FIELDS: TreeFieldMapping = {
    label: 'label',
    children: 'children',
    isLeaf: 'isLeaf',
    id: 'id',
    disabled: 'disabled'
}

export type TreeNodeData = Record<string, unknown>;

export type SelectionMode = 'none' | 'single' | 'multiple' | 'checkbox';

export type CheckState = 'checked' | 'unchecked' | 'indeterminate';

export function mergeFields(
    partial?: Partial<TreeFieldMapping>
): TreeFieldMapping {
    return { ...DEFAULT_FIELDS, ...partial }
}

export function getLabel(data: TreeNodeData, fields: TreeFieldMapping): string {
    return String(data[fields.label] ?? '')
}

export function getChildren(
    data: TreeNodeData,
    fields: TreeFieldMapping
): TreeNodeData[] | undefined {
    const val = data[fields.children]
    return Array.isArray(val) ? (val as TreeNodeData[]) : undefined
}

export function getIsLeaf(
    data: TreeNodeData,
    fields: TreeFieldMapping
): boolean {
    const val = data[fields.isLeaf]
    return val !== undefined ? Boolean(val) : false
}

export function getNodeKey(
    data: TreeNodeData,
    fields: TreeFieldMapping
): unknown {
    return data[fields.id]
}

export function isNodeDisabled(
    data: TreeNodeData,
    fields: TreeFieldMapping
): boolean {
    return Boolean(data[fields.disabled])
}

export function getDescendantKeys(
    data: TreeNodeData,
    fields: TreeFieldMapping
): unknown[] {
    const children = getChildren(data, fields)
    if (!children) return []
    const keys: unknown[] = []
    for (const child of children) {
        const k = getNodeKey(child, fields)
        if (k !== undefined && k !== null) keys.push(k)
        keys.push(...getDescendantKeys(child, fields))
    }
    return keys
}

export function computeCheckState(
    data: TreeNodeData,
    checkedKeys: unknown[],
    fields: TreeFieldMapping
): CheckState {
    const children = getChildren(data, fields)
    const key = getNodeKey(data, fields)

    if (!children || children.length === 0) {
        return checkedKeys.includes(key) ? 'checked' : 'unchecked'
    }

    const states = children.map((c) =>
        computeCheckState(c, checkedKeys, fields)
    )
    if (states.every((s) => s === 'checked')) return 'checked'
    if (states.every((s) => s === 'unchecked')) return 'unchecked'
    return 'indeterminate'
}

export function addToChecked(keys: unknown[], toAdd: unknown[]): unknown[] {
    const set = new Set(keys)
    for (const k of toAdd) set.add(k)
    return Array.from(set)
}

export function removeFromChecked(
    keys: unknown[],
    toRemove: unknown[]
): unknown[] {
    const set = new Set(toRemove)
    return keys.filter((k) => !set.has(k))
}

export function matchesFilter(
    data: TreeNodeData,
    filter: string | ((node: TreeNodeData) => boolean),
    fields: TreeFieldMapping
): boolean {
    if (typeof filter === 'function') return filter(data)
    const label = getLabel(data, fields).toLowerCase()
    return label.includes(filter.toLowerCase())
}

export function nodeOrDescendantMatches(
    data: TreeNodeData,
    filter: string | ((node: TreeNodeData) => boolean),
    fields: TreeFieldMapping
): boolean {
    if (matchesFilter(data, filter, fields)) return true
    const children = getChildren(data, fields)
    if (!children) return false
    return children.some((c) => nodeOrDescendantMatches(c, filter, fields))
}
