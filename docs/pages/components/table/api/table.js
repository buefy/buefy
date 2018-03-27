export default [
    {
        title: 'Table',
        props: [
            {
                name: '<code>data</code>',
                description: 'Table data',
                type: 'Array<Object>',
                values: '—',
                default: '—'
            },
            {
                name: '<code>columns</code>',
                description: 'Table columns, you can also add <code>renderHtml: true</code> on each column object',
                type: 'Array<Object> (same as TableColumns props)',
                values: '—',
                default: '—'
            },
            {
                name: '<code>default-sort</code>',
                description: `Sets the default sort column and order — e.g. <code>['first_name', 'desc']</code>`,
                type: 'String, Array',
                values: '—',
                default: 'order: <code>default-sort-direction</code> prop'
            },
            {
                name: '<code>default-sort-direction</code>',
                description: `Sets the default sort column direction on the first click`,
                type: 'String',
                values: '<code>asc</code>, <code>desc</code>',
                default: '<code>asc</code>'
            },
            {
                name: '<code>bordered</code>',
                description: 'Border to all cells',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>narrowed</code>',
                description: 'Makes the cells narrower',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>selected</code>',
                description: 'Set which row is selected, use the <code>.sync</code> modifier to make it two-way binding',
                type: 'Object',
                values: '—',
                default: '—'
            },
            {
                name: '<code>focusable</code>',
                description: 'Table can be focused and user can navigate with keyboard arrows (require <code>selected.sync</code>) and rows are highlighted when hovering',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>hoverable</code>',
                description: 'Rows are highlighted when hovering',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>checkable</code>',
                description: 'Rows can be checked (multiple), checked rows will have a <code>.is-checked</code> class if you want to style',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>checked-rows</code>',
                description: 'Set which rows are checked, use the <code>.sync</code> modifier to make it two-way binding',
                type: 'Array<Object>',
                values: '—',
                default: '—'
            },
            {
                name: '<code>mobile-cards</code>',
                description: 'Rows appears as cards on mobile (collapse rows)',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>backend-sorting</code>',
                description: `Columns won't be sorted with Javascript, use with <code>sort</code> event to sort in your backend`,
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>backend-pagination</code>',
                description: `Rows won't be paginated with Javascript, use with <code>page-change</code> event to paginate in your backend`,
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>total</code>',
                description: `Total number of table data if <code>backend-pagination</code> is enabled`,
                type: 'Number',
                values: '—',
                default: '<code>0</code>'
            },
            {
                name: '<code>current-page</code>',
                description: `Current page of table data (if <code>paginated</code>)`,
                type: 'Number',
                values: '—',
                default: '<code>1</code>'
            },
            {
                name: '<code>loading</code>',
                description: 'Loading state',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>paginated</code>',
                description: 'Adds pagination to the table',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>pagination-simple</code>',
                description: 'Simple pagination (if <code>paginated</code>)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>pagination-size</code>',
                description: 'Pagination size (if <code>paginated</code>)',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>per-page</code>',
                description: 'How many rows per page (if <code>paginated</code>)',
                type: 'Number',
                values: '—',
                default: '<code>20</code>'
            },
            {
                name: '<code>row-class</code>',
                description: 'Add a class to row (<code>&lt;tr&gt;</code> element) based on the return',
                type: 'Function (row: Object, index: Number)',
                values: '—',
                default: '—'
            },
            {
                name: '<code>detailed</code>',
                description: 'Allow row details (check scoped slots documentation)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>opened-detailed</code>',
                description: 'Allow pre-defined opened details. Ideal to open details via vue-router. (An unique key is required; check detail-key prop)',
                type: 'Array',
                values: '—',
                default: '<code>[]</code>'
            },
            {
              name: '<code>has-detailed-visible</code>',
              description: 'Controls the visibility of the trigger that toggles the detailed rows.',
              type: 'Function (row: Object)',
              values: '—',
              default: '<code>true</code>'
            },
            {
                name: '<code>detail-key</code>',
                description: 'Use an unique key of your data Object when use detailed or opened detailed. (id recommended)',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>custom-is-checked</code>',
                description: 'Custom method to verify if row is checked, works when is <code>checkable</code>. Useful for backend pagination',
                type: 'Function (a: Object, b: Object)',
                values: '—',
                default: '—'
            },
            {
                name: '<code>is-row-checkable</code>',
                description: 'Custom method to verify if a row is disabled, works when is <code>checkable</code>. ',
                type: 'Function (row: Object)',
                values: '—',
                default: 'true'
            }

        ],
        slots: [
            {
                name: 'default',
                description: '<strong>Required</strong>, table body and header',
                props: '<code>row: Object</code>, <code>index: Number</code>'
            },
            {
                name: '<code>header</code>',
                description: 'Table custom header',
                props: '<code>column: Vue Object</code>, <code>index: Number</code>'
            },
            {
                name: '<code>detail</code>',
                description: 'Row detail (collapsible)',
                props: '<code>row: Object</code>, <code>index: Number</code>'
            },
            {
                name: '<code>empty</code>',
                description: 'Replaces table body when <code>data</code> array prop is empty',
                props: '—'
            },
            {
                name: '<code>footer</code>',
                description: 'Table custom footer',
                props: '—'
            },
            {
                name: '<code>bottom-left</code>',
                description: 'Custom bottom-left (opposite side of pagination)',
                props: '—'
            }
        ],
        events: [
            {
                name: '<code>click</code>',
                description: 'Triggers when a row is clicked',
                parameters: '<code>row: Object</code>'
            },
            {
                name: '<code>dblclick</code>',
                description: 'Triggers when a row is double clicked',
                parameters: '<code>row: Object</code>'
            },
            {
                name: '<code>sort</code>',
                description: 'Triggers when a sortable column is clicked',
                parameters: '<code>field: String</code>, <code>order: String</code>'
            },
            {
                name: '<code>select</code>',
                description: 'Triggers when a row is selected',
                parameters: '<code>row: Object</code>, <code>oldRow: Object</code>'
            },
            {
                name: '<code>check</code>',
                description: 'Triggers when the checkbox in a row is clicked and/or when the header checkbox is clicked',
                parameters: '<code>checkedList: Array</code>, <code>row: Object</code>'
            },
            {
                name: '<code>check-all</code>',
                description: 'Triggers when the header checkbox is clicked',
                parameters: '<code>checkedList: Array</code>'
            },
            {
                name: '<code>page-change</code>',
                description: 'Triggers when pagination page is changed',
                parameters: '<code>page: Number</code>'
            },
            {
                name: '<code>details-open</code>',
                description: 'Triggers when details is opened',
                parameters: '<code>row: Object</code>'
            },
            {
                name: '<code>details-close</code>',
                description: 'Triggers when details is closed',
                parameters: '<code>row: Object</code>'
            }
        ],
        methods: [
            {
                name: '<code>initSort</code>',
                description: 'Sort using <code>default-sort</code> prop parameters'
            },
            {
                name: '<code>focus</code>',
                description: 'Focus table element if is <code>focusable</code>'
            }
        ]
    },
    {
        title: 'Column',
        props: [
            {
                name: '<code>label</code>',
                description: 'Column header text, also used to identify column if <code>custom-key</code> prop is missing',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>custom-key</code>',
                description: 'Unique identifier, use when <code>label</code> is missing or there are duplicate <code>label</code> names',
                type: 'String, Number',
                values: '—',
                default: '<code>this.label</code>'
            },
            {
                name: '<code>field</code>',
                description: 'Property of the object the column is attributed, used for sorting',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>meta</code>',
                description: 'Meta prop to add anything, useful when creating custom headers',
                type: 'Any',
                values: '—',
                default: '—'
            },
            {
                name: '<code>width</code>',
                description: 'Column fixed width in pixels',
                type: 'Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>numeric</code>',
                description: 'Align the cell content to the right, sort icon on left',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>centered</code>',
                description: 'Align the cell content to the center',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>sortable</code>',
                description: 'Whether the column can be sorted',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>visible</code>',
                description: 'Whether the column is visible',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>custom-sort</code>',
                description: 'Custom sort method, works when is <code>sortable</code>',
                type: 'Function (a: Object, b: Object, isAsc: Boolean)',
                values: '—',
                default: '—'
            }
        ]
    }
]
