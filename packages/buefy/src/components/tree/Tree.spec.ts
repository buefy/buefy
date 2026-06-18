import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import BTree from './Tree.vue'
import BTreeNode from './TreeNode.vue'
import {
    computeCheckState,
    getDescendantKeys,
    mergeFields,
    DEFAULT_FIELDS
} from '../../utils/TreeHelpers'
import type { TreeNodeData } from '../../utils/TreeHelpers'

const simpleData = [
    {
        id: '1',
        label: 'Root A',
        children: [
            { id: '1-1', label: 'Child A1', isLeaf: true },
            { id: '1-2', label: 'Child A2', isLeaf: true }
        ]
    },
    {
        id: '2',
        label: 'Root B',
        children: [
            { id: '2-1', label: 'Child B1', isLeaf: true }
        ]
    }
]

// ---------------------------------------------------------------------------
// TreeHelpers unit tests (pure functions, no component needed)
// ---------------------------------------------------------------------------

describe('TreeHelpers', () => {
    const fields = DEFAULT_FIELDS

    it('mergeFields applies partial overrides', () => {
        const merged = mergeFields({ label: 'name', children: 'kids' })
        expect(merged.label).toBe('name')
        expect(merged.children).toBe('kids')
        expect(merged.id).toBe('id')
    })

    it('computeCheckState returns checked for leaf in checkedKeys', () => {
        const node = { id: 'a', label: 'A' }
        expect(computeCheckState(node, ['a'], fields)).toBe('checked')
        expect(computeCheckState(node, [], fields)).toBe('unchecked')
    })

    it('computeCheckState returns indeterminate when some children checked', () => {
        const node = {
            id: 'p',
            label: 'Parent',
            children: [
                { id: 'c1', label: 'C1' },
                { id: 'c2', label: 'C2' }
            ]
        }
        expect(computeCheckState(node, ['c1'], fields)).toBe('indeterminate')
        expect(computeCheckState(node, ['c1', 'c2'], fields)).toBe('checked')
        expect(computeCheckState(node, [], fields)).toBe('unchecked')
    })

    it('getDescendantKeys returns all nested keys', () => {
        const node = simpleData[0]
        const keys = getDescendantKeys(node, fields)
        expect(keys).toContain('1-1')
        expect(keys).toContain('1-2')
        expect(keys).not.toContain('1')
    })
})

// ---------------------------------------------------------------------------
// BTree component tests
// ---------------------------------------------------------------------------

describe('BTree', () => {
    it('is called', () => {
        const wrapper = shallowMount(BTree, { props: { data: simpleData } })
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BTree')
    })

    it('renders correctly', () => {
        const wrapper = shallowMount(BTree, { props: { data: simpleData } })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders a role=tree list', () => {
        const wrapper = shallowMount(BTree, { props: { data: simpleData } })
        expect(wrapper.attributes('role')).toBe('tree')
    })

    it('renders empty slot when data is empty', () => {
        const wrapper = mount(BTree, {
            props: { data: [] },
            slots: { empty: '<span class="custom-empty">Nothing here</span>' }
        })
        expect(wrapper.find('.custom-empty').exists()).toBe(true)
    })

    it('applies aria-multiselectable for multiple mode', () => {
        const wrapper = shallowMount(BTree, {
            props: { data: simpleData, selectionMode: 'multiple' }
        })
        expect(wrapper.attributes('aria-multiselectable')).toBe('true')
    })

    it('does not set aria-multiselectable for single mode', () => {
        const wrapper = shallowMount(BTree, {
            props: { data: simpleData, selectionMode: 'single' }
        })
        expect(wrapper.attributes('aria-multiselectable')).toBeUndefined()
    })
})

// ---------------------------------------------------------------------------
// BTree + BTreeNode integration tests
// ---------------------------------------------------------------------------

describe('BTree integration', () => {
    let wrapper: ReturnType<typeof mount>

    beforeEach(() => {
        wrapper = mount(BTree, { props: { data: simpleData } })
    })

    it('renders top-level nodes', () => {
        const items = wrapper.findAll('[role="treeitem"]')
        // At least 2 top-level nodes visible (children start collapsed)
        expect(items.length).toBeGreaterThanOrEqual(2)
    })

    it('sets aria-level on nodes', () => {
        const items = wrapper.findAll('[role="treeitem"]')
        expect(items[0].attributes('aria-level')).toBe('1')
    })

    it('sets aria-setsize and aria-posinset', () => {
        const items = wrapper.findAll('[role="treeitem"]')
        expect(items[0].attributes('aria-setsize')).toBe('2')
        expect(items[0].attributes('aria-posinset')).toBe('1')
        expect(items[1].attributes('aria-posinset')).toBe('2')
    })

    it('starts with nodes collapsed (aria-expanded=false)', () => {
        const items = wrapper.findAll('[role="treeitem"]')
        expect(items[0].attributes('aria-expanded')).toBe('false')
    })

    it('expands a node on click and reveals children', async () => {
        const items = wrapper.findAll('[role="treeitem"]')
        await items[0].trigger('click')
        await wrapper.vm.$nextTick()
        const updated = wrapper.findAll('[role="treeitem"]')
        expect(updated.length).toBeGreaterThan(2)
        expect(items[0].attributes('aria-expanded')).toBe('true')
    })

    it('emits expand event when expanding', async () => {
        const items = wrapper.findAll('[role="treeitem"]')
        await items[0].trigger('click')
        expect(wrapper.emitted('expand')).toBeTruthy()
        expect(wrapper.emitted('expand')![0][1]).toBe('1')
    })

    it('emits collapse event when collapsing', async () => {
        const items = wrapper.findAll('[role="treeitem"]')
        await items[0].trigger('click')
        await items[0].trigger('click')
        expect(wrapper.emitted('collapse')).toBeTruthy()
    })

    it('emits update:expandedKeys', async () => {
        await wrapper.findAll('[role="treeitem"]')[0].trigger('click')
        expect(wrapper.emitted('update:expandedKeys')).toBeTruthy()
        expect(wrapper.emitted('update:expandedKeys')![0][0]).toContain('1')
    })
})

// ---------------------------------------------------------------------------
// Field mapping tests
// ---------------------------------------------------------------------------

describe('BTree field mapping', () => {
    it('renders nodes using custom field names', () => {
        const data = [{ key: 'a', name: 'Alpha', kids: [{ key: 'b', name: 'Beta' }] }]
        const wrapper = mount(BTree, {
            props: {
                data,
                fields: { label: 'name', children: 'kids', id: 'key' }
            }
        })
        expect(wrapper.text()).toContain('Alpha')
    })

    it('expands correctly with custom children field', async () => {
        const data = [{ key: 'a', name: 'Alpha', kids: [{ key: 'b', name: 'Beta', isLeaf: true }] }]
        const wrapper = mount(BTree, {
            props: { data, fields: { label: 'name', children: 'kids', id: 'key' } }
        })
        const node = wrapper.find('[role="treeitem"]')
        await node.trigger('click')
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('Beta')
    })
})

// ---------------------------------------------------------------------------
// Selection tests
// ---------------------------------------------------------------------------

describe('BTree selection', () => {
    it('single mode: emits update:selected on click', async () => {
        const wrapper = mount(BTree, {
            props: { data: simpleData, selectionMode: 'single' }
        })
        await wrapper.findAll('[role="treeitem"]')[0].trigger('click')
        expect(wrapper.emitted('update:selected')).toBeTruthy()
        expect(wrapper.emitted('update:selected')![0][0]).toBe('1')
    })

    it('single mode: deselects on second click', async () => {
        const wrapper = mount(BTree, {
            props: { data: simpleData, selectionMode: 'single', selected: '1' }
        })
        const item = wrapper.findAll('[role="treeitem"]')[0]
        await item.trigger('click')
        const emitted = wrapper.emitted('update:selected')!
        expect(emitted[emitted.length - 1][0]).toBeNull()
    })

    it('multiple mode: emits array', async () => {
        const wrapper = mount(BTree, {
            props: { data: simpleData, selectionMode: 'multiple' }
        })
        const items = wrapper.findAll('[role="treeitem"]')
        await items[0].trigger('click')
        await items[1].trigger('click')
        const emitted = wrapper.emitted('update:selected')!
        const last = emitted[emitted.length - 1][0] as unknown[]
        expect(last).toContain('1')
        expect(last).toContain('2')
    })
})

// ---------------------------------------------------------------------------
// Checkbox / tri-state tests
// ---------------------------------------------------------------------------

describe('BTree checkbox mode', () => {
    it('checking a parent checks all descendants', async () => {
        const wrapper = mount(BTree, {
            props: { data: simpleData, selectionMode: 'checkbox' }
        })
        const nodes = wrapper.findAll('[role="treeitem"]')
        await nodes[0].trigger('click')
        const emitted = wrapper.emitted('update:checkedKeys')!
        const keys = emitted[emitted.length - 1][0] as unknown[]
        expect(keys).toContain('1')
        expect(keys).toContain('1-1')
        expect(keys).toContain('1-2')
    })

    it('aria-checked is "mixed" for indeterminate parent', async () => {
        const wrapper = mount(BTree, {
            props: { data: simpleData, selectionMode: 'checkbox', checkedKeys: ['1-1'] }
        })
        const parent = wrapper.findAll('[role="treeitem"]')[0]
        expect(parent.attributes('aria-checked')).toBe('mixed')
    })

    it('aria-checked is true when fully checked', () => {
        const wrapper = mount(BTree, {
            props: { data: simpleData, selectionMode: 'checkbox', checkedKeys: ['1', '1-1', '1-2'] }
        })
        const parent = wrapper.findAll('[role="treeitem"]')[0]
        expect(parent.attributes('aria-checked')).toBe('true')
    })
})

// ---------------------------------------------------------------------------
// Lazy load tests
// ---------------------------------------------------------------------------

describe('BTree lazy loading', () => {
    it('shows expand toggle for lazy leaf-less node', () => {
        const roots = [{ id: 'root', label: 'Root' }]
        const wrapper = mount(BTree, {
            props: { data: roots, lazy: true, load: vi.fn() }
        })
        const toggle = wrapper.find('.b-tree-node-toggle')
        expect(toggle.exists()).toBe(true)
    })

    it('calls load when node is expanded', async () => {
        const load = vi.fn().mockResolvedValue([{ id: 'child', label: 'Child', isLeaf: true }])
        const roots = [{ id: 'root', label: 'Root' }]
        const wrapper = mount(BTree, { props: { data: roots, lazy: true, load } })
        await wrapper.find('[role="treeitem"]').trigger('click')
        expect(load).toHaveBeenCalledTimes(1)
        expect(load).toHaveBeenCalledWith(roots[0])
    })

    it('renders lazy children after load resolves', async () => {
        const load = vi.fn().mockResolvedValue([{ id: 'c1', label: 'Lazy Child', isLeaf: true }])
        const roots = [{ id: 'root', label: 'Root' }]
        const wrapper = mount(BTree, { props: { data: roots, lazy: true, load } })
        await wrapper.find('[role="treeitem"]').trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('Lazy Child')
    })

    it('emits load-error on rejected load without crashing', async () => {
        const err = new Error('network failure')
        const load = vi.fn().mockRejectedValue(err)
        const roots = [{ id: 'root', label: 'Root' }]
        const wrapper = mount(BTree, { props: { data: roots, lazy: true, load } })
        await wrapper.find('[role="treeitem"]').trigger('click')
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted('load-error')).toBeTruthy()
        // Other nodes still rendered
        expect(wrapper.find('[role="treeitem"]').exists()).toBe(true)
    })
})

// ---------------------------------------------------------------------------
// Disabled node tests
// ---------------------------------------------------------------------------

describe('BTree disabled nodes', () => {
    it('disabled node does not emit select on click', async () => {
        const data = [{ id: 'a', label: 'A', disabled: true, isLeaf: true }]
        const wrapper = mount(BTree, { props: { data, selectionMode: 'single' } })
        await wrapper.find('[role="treeitem"]').trigger('click')
        expect(wrapper.emitted('update:selected')).toBeFalsy()
    })

    it('disabled node has aria-disabled attribute', () => {
        const data = [{ id: 'a', label: 'A', disabled: true, isLeaf: true }]
        const wrapper = mount(BTree, { props: { data } })
        expect(wrapper.find('[role="treeitem"]').attributes('aria-disabled')).toBe('true')
    })
})

// ---------------------------------------------------------------------------
// defaultExpandAll tests
// ---------------------------------------------------------------------------

describe('BTree defaultExpandAll', () => {
    it('expands all nodes on mount', async () => {
        const wrapper = mount(BTree, {
            props: { data: simpleData, defaultExpandAll: true }
        })
        await wrapper.vm.$nextTick()
        const items = wrapper.findAll('[role="treeitem"]')
        // Should include children from both Root A and Root B
        expect(items.length).toBeGreaterThan(2)
    })
})

// ---------------------------------------------------------------------------
// Scoped slot tests
// ---------------------------------------------------------------------------

describe('BTree scoped slot', () => {
    it('renders custom default slot content', () => {
        const wrapper = mount(BTree, {
            props: { data: [{ id: '1', label: 'Hello', isLeaf: true }] },
            slots: {
                default: '<span class="custom">CUSTOM</span>'
            }
        })
        expect(wrapper.find('.custom').exists()).toBe(true)
        expect(wrapper.find('.custom').text()).toBe('CUSTOM')
    })
})

// ---------------------------------------------------------------------------
// BTreeNode direct tests
// ---------------------------------------------------------------------------

describe('BTreeNode', () => {
    function mountNode(nodeData: TreeNodeData, treeProps: object = {}) {
        const tree = mount(BTree, {
            props: { data: [nodeData], ...treeProps }
        })
        return tree.findComponent(BTreeNode)
    }

    it('renders node label', () => {
        const node = mountNode({ id: '1', label: 'Test', isLeaf: true })
        expect(node.text()).toContain('Test')
    })

    it('leaf node has no aria-expanded', () => {
        const node = mountNode({ id: '1', label: 'Leaf', isLeaf: true })
        expect(node.attributes('aria-expanded')).toBeUndefined()
    })

    it('non-leaf node has aria-expanded', () => {
        const node = mountNode({
            id: '1',
            label: 'Parent',
            children: [{ id: '1-1', label: 'Child', isLeaf: true }]
        })
        expect(node.attributes('aria-expanded')).toBeDefined()
    })
})
