export default [
    {
        title: 'Tree',
        props: [
            {
                name: '<code>data</code>',
                description: 'Array of tree node data objects',
                type: 'TreeNodeData[]',
                values: '—',
                default: '—',
                required: true
            },
            {
                name: '<code>fields</code>',
                description: 'Remap data field names. Supports keys: <code>label</code>, <code>children</code>, <code>id</code>, <code>isLeaf</code>, <code>disabled</code>',
                type: 'Object',
                values: '—',
                default: '<code>{ label: "label", children: "children", id: "id", isLeaf: "isLeaf", disabled: "disabled" }</code>'
            },
            {
                name: '<code>selection-mode</code>',
                description: 'How nodes can be selected',
                type: 'String',
                values: '<code>none</code>, <code>single</code>, <code>multiple</code>, <code>checkbox</code>',
                default: '<code>none</code>'
            },
            {
                name: '<code>v-model:selected</code>',
                description: 'Selected node key(s). Single value for <code>single</code> mode, array for <code>multiple</code>',
                type: 'Any | Any[]',
                values: '—',
                default: '<code>null</code>'
            },
            {
                name: '<code>v-model:expanded-keys</code>',
                description: 'Array of keys whose nodes are expanded',
                type: 'Any[]',
                values: '—',
                default: '<code>[]</code>'
            },
            {
                name: '<code>v-model:checked-keys</code>',
                description: 'Array of checked node keys (checkbox mode). Parents auto-derive tri-state from children.',
                type: 'Any[]',
                values: '—',
                default: '<code>[]</code>'
            },
            {
                name: '<code>default-expand-all</code>',
                description: 'Expand all nodes on initial render',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>expand-on-click-node</code>',
                description: 'Clicking a node row also toggles its expansion. Set to <code>false</code> to require clicking the caret only.',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>lazy</code>',
                description: 'Enable lazy (async) child loading via the <code>load</code> prop',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>load</code>',
                description: 'Async function that receives the node data and returns a Promise resolving to an array of child nodes',
                type: 'Function',
                values: '<code>(node: TreeNodeData) => Promise&lt;TreeNodeData[]&gt;</code>',
                default: '—'
            },
            {
                name: '<code>filter</code>',
                description: 'Filter string (case-insensitive label substring) or predicate function. Non-matching nodes are hidden; ancestors of matches remain visible.',
                type: 'String | Function',
                values: '<code>string</code> or <code>(node: TreeNodeData) => boolean</code>',
                default: '—'
            },
            {
                name: '<code>size</code>',
                description: 'Size modifier applied to the root element',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>aria-label</code>',
                description: 'Accessible label for the tree (<code>aria-label</code> on <code>role="tree"</code>)',
                type: 'String',
                values: '—',
                default: '—'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Custom node content. Renders inside each node row.',
                props: '<code>node: TreeNodeData</code>, <code>data: TreeNodeData</code>, <code>depth: number</code>, <code>expanded: boolean</code>, <code>checked: boolean</code>, <code>indeterminate: boolean</code>, <code>selected: boolean</code>'
            },
            {
                name: '<code>icon</code>',
                description: 'Custom icon area per node, rendered before the label.',
                props: '<code>node: TreeNodeData</code>, <code>expanded: boolean</code>'
            },
            {
                name: '<code>empty</code>',
                description: 'Content shown when <code>data</code> is an empty array',
                props: '—'
            }
        ],
        events: [
            {
                name: '<code>update:selected</code>',
                description: 'Emitted when selected node(s) change',
                parameters: '<code>value: Any | Any[]</code>'
            },
            {
                name: '<code>update:expanded-keys</code>',
                description: 'Emitted when expanded keys change',
                parameters: '<code>keys: Any[]</code>'
            },
            {
                name: '<code>update:checked-keys</code>',
                description: 'Emitted when checked keys change (checkbox mode)',
                parameters: '<code>keys: Any[]</code>'
            },
            {
                name: '<code>select</code>',
                description: 'Emitted when a node is selected or deselected',
                parameters: '<code>data: TreeNodeData, key: Any</code>'
            },
            {
                name: '<code>check</code>',
                description: 'Emitted when a checkbox is toggled',
                parameters: '<code>data: TreeNodeData, checked: boolean, indeterminate: boolean</code>'
            },
            {
                name: '<code>expand</code>',
                description: 'Emitted when a node is expanded',
                parameters: '<code>data: TreeNodeData, key: Any</code>'
            },
            {
                name: '<code>collapse</code>',
                description: 'Emitted when a node is collapsed',
                parameters: '<code>data: TreeNodeData, key: Any</code>'
            },
            {
                name: '<code>node-click</code>',
                description: 'Emitted on any node click (before selection/expand logic)',
                parameters: '<code>data: TreeNodeData, key: Any</code>'
            },
            {
                name: '<code>load-start</code>',
                description: 'Emitted when lazy loading begins for a node',
                parameters: '<code>data: TreeNodeData, key: Any</code>'
            },
            {
                name: '<code>load-error</code>',
                description: 'Emitted when the <code>load</code> function rejects. The rest of the tree remains functional.',
                parameters: '<code>data: TreeNodeData, key: Any, error: any</code>'
            }
        ]
    }
]
