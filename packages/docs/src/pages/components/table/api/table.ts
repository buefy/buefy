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
                description: 'Table columns',
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
                name: '<code>sort-icon</code>',
                description: `Sets the header sorting icon`,
                type: 'String',
                values: '-',
                default: '<code>arrow-up</code>'
            },
            {
                name: '<code>sort-icon-size</code>',
                description: `Sets the size of the sorting icon`,
                type: 'String',
                values: '<code>is-small</code>, <code></code>, <code>is-medium</code>, <code>is-large</code>',
                default: '<code>is-small</code>'
            },
            {
                name: '<code>bordered</code>',
                description: 'Border to all cells',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>striped</code>',
                description: 'Whether table is striped',
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
                name: '<code>checkbox-position</code>',
                description: 'Position of the checkbox (if <code>checkable</code> is true)',
                type: 'String',
                values: '<code>left</code> or <code>right</code>',
                default: '<code>left</code>'
            },
            {
                name: '<code>sticky-checkbox</code>',
                description: 'Make the checkbox column sticky when <code>checkable</code>',
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
                name: '<code>header-checkable</code>',
                description: 'Show check/uncheck all checkbox in table header when <code>checkable</code>',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>checkbox-type</code>',
                description: 'Type (color) of the checkbox when <code>checkable</code>, optional',
                type: 'String',
                values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                <code>is-warning</code>, <code>is-danger</code>,
                and any other colors you've set in the <code>$colors</code> list on Sass`,
                default: 'is-primary'
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
                name: '<code>pagination-rounded</code>',
                description: 'Rounded pagination (if <code>paginated</code>)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>pagination-order</code>',
                description: 'Buttons order, optional',
                type: 'String',
                values: '<code>is-centered</code>, <code>is-right</code>',
                default: '—'
            },
            {
                name: '<code>pagination-size</code>',
                description: 'Pagination size (if <code>paginated</code>)',
                type: 'String',
                values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                default: '—'
            },
            {
                name: '<code>pagination-position</code>',
                description: 'Pagination position (if <code>paginated</code>)',
                type: 'String',
                values: '<code>bottom</code>, <code>top</code>, <code>both</code>',
                default: '<code>bottom</code>'
            },
            {
                name: '<code>per-page</code>',
                description: 'How many rows per page (if <code>paginated</code>)',
                type: 'Number',
                values: '—',
                default: '<code>20</code>'
            },
            {
                name: '<code>page-input</code>',
                description: `Include page number input.`,
                type: 'Boolean',
                values: '—',
                default: 'false'
            },
            {
                name: '<code>page-input-position</code>',
                description: `Page input position.`,
                type: 'String',
                values: '<code>is-input-right</code>, <code>is-input-left</code>',
                default: '—'
            },
            {
                name: '<code>debounce-page-input</code>',
                description: `Sets the page input debounce time (in milliseconds)`,
                type: 'Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>sort-multiple</code>',
                description: 'Adds multiple column sorting',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>sort-multiple-data</code>',
                description: 'Used in combination with <code>backend-sorting</code>',
                type: 'Object',
                values: '<code>[{field, order}]</code>',
                default: '<code>[]</code>'
            },
            {
                name: '<code>sort-multiple-key</code>',
                description: 'Adds a key which will be required for multi column sorting to work. Will always be enabled if <code>null</code> is selected (default). Requires <code>sort-multiple</code>',
                type: 'String',
                values: '<code>null</code>, <code>shiftKey</code>, <code>altKey</code>, <code>ctrlKey</code>',
                default: '<code>null</code>'
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
                name: '<code>custom-detail-row</code>',
                description: 'Allow a custom detail row',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>show-detail-icon</code>',
                description: 'Allow chevron icon and column to be visible',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>detail-icon</code>',
                description: 'Icon name',
                type: 'String',
                values: '—',
                default: '<code>chevron-right</code>'
            },
            {
                name: '<code>opened-detailed</code>',
                description: 'Allow pre-defined opened details. Ideal to open details via vue-router. (A unique key is required; check detail-key prop)',
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
                description: 'Use a unique key of your data Object when use detailed or opened detailed. (id recommended)',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>detail-transition</code>',
                description: 'Transition name to use when toggling row details.',
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
                description: 'Custom method to verify if a row is checkable, works when is <code>checkable</code>. ',
                type: 'Function (row: Object)',
                values: '—',
                default: 'true'
            },
            {
                name: '<code>is-row-selectable</code>',
                description: 'Custom method to verify if a row is selectable, works when is <code>selected</code>. ',
                type: 'Function (row: Object)',
                values: '—',
                default: 'true'
            },
            {
                name: '<code>icon-pack</code>',
                description: 'Icon pack to use',
                type: 'String',
                values: '<code>mdi</code>, <code>fa</code>, <code>fas</code>, <code>far</code>, <code>fad</code>, <code>fal</code>',
                default: '<code>mdi</code>'
            },
            {
                name: '<code>mobile-sort-placeholder</code>',
                description: 'Text when nothing is selected',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>custom-row-key</code>',
                description: 'Use a unique key of your <code>data</code> Object for each row. Useful if your <code>data</code> prop has dynamic indices. (id recommended)',
                type: 'String',
                values: '-',
                default: '-'
            },
            {
                name: '<code>draggable</code>',
                description: 'Allows rows to be draggable',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>draggable-column</code>',
                description: 'Allows columns to be draggable',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>backend-filtering</code>',
                description: `Columns won't be filtered with Javascript, use with <code>searchable</code> prop to the columns to filter in your backend`,
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>sticky-header</code>',
                description: 'Show a sticky table header',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>scrollable</code>',
                description: 'Add a horizontal scrollbar when table is too wide',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>height</code>',
                description: 'Table fixed height in pixels',
                type: 'Number, String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>filters-event</code>',
                description: 'Add a native event to filter',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>card-layout</code>',
                description: 'Rows appears as cards (collapse rows)',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>show-header</code>',
                description: 'Show table column header',
                type: 'Boolean',
                values: '—',
                default: '<code>true</code>'
            },
            {
                name: '<code>aria-next-label</code>',
                description: 'Accessibility label for the next page link (if <code>paginated</code>)',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>aria-previous-label</code>',
                description: 'Accessibility label for the previous page link (if <code>paginated</code>)',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>aria-page-label</code>',
                description: 'Accessibility label for the page link. If passed, this text will be prepended to the number of the page (if <code>paginated</code>)',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>aria-current-label</code>',
                description: 'Accessibility label for the current page link. If passed, this text will be prepended to the current page (if <code>paginated</code>)',
                type: 'String',
                values: '—',
                default: '—'
            },
            {
                name: '<code>debounce-search</code>',
                description: 'Sets the filtering debounce time (in milliseconds)',
                type: 'Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>compat-fallthrough</code>',
                description: 'Whether the <code>class</code>, <code>style</code>, and <code>id</code> attributes are applied to the root &lt;div&gt; element or the underlying pagination components. If <code>true</code>, they are applied to the root &lt;div&gt; element, which is compatible with Buefy for Vue 2.',
                type: 'Boolean',
                values: '-',
                default: '<code>true</code>. Can be changed via the <code>defaultCompatFallthrough</code> config option.'
            }
        ],
        slots: [
            {
                name: 'default',
                description: '<strong>Required</strong>, table body and header',
                props: '<code>toggleDetails: Function (row: Object)</code>'
            },
            {
                name: '<code>header</code>',
                description: 'Table custom header',
                props: '<code>column: Vue Object</code>, <code>index: Number</code>'
            },
            {
                name: '<code>subheading</code>',
                description: 'Table subheading',
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
                description: 'Custom bottom-left (opposite side of bottom pagination)',
                props: '—'
            },
            {
                name: '<code>top-left</code>',
                description: 'Custom top-left (opposite side of top pagination)',
                props: '—'
            },
            {
                name: '<code>pagination</code>',
                description: 'Table custom pagination',
                props: '—'
            },
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
                name: '<code>cellclick</code>',
                description: 'Triggers when a cell is clicked',
                parameters: '<code>row: Object</code>, <code>column: Vue Object</code>, <code>rowIndex: Number</code>, <code>columnIndex: Number</code>,'
            },
            {
                name: '<code>sort</code>',
                description: 'Triggers when a sortable column is clicked',
                parameters: '<code>field: String</code>, <code>order: String</code>'
            },
            {
                name: '<code>sorting-priority-removed</code>',
                description: 'Triggers when a multiselect sortable column remove button has been clicked ',
                parameters: '<code>field: String</code>'
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
            },
            {
                name: '<code>contextmenu</code>',
                description: 'Triggers when right-click on a row',
                parameters: '<code>row: Object</code>, <code>contextMenuNativeEvent: Event</code>'
            },
            {
                name: '<code>dragstart</code>',
                description: 'Triggers when starting to drag a row',
                parameters: '<code> row: Object </code>, <code> dragEvent: Event </code>, <code> index: Number </code>'
            },
            {
                name: '<code>dragend</code>',
                description: 'Triggers when ending to drag a row',
                parameters: '<code> row: Object </code>, <code> dragEvent: Event </code>, <code> index: Number </code>'
            },
            {
                name: '<code>drop</code>',
                description: 'Triggers when dropping on a row',
                parameters: '<code> row: Object </code>, <code> drop: Event </code>, <code> index: Number </code>'
            },
            {
                name: '<code>dragover</code>',
                description: 'Triggers when dragging over a row',
                parameters: '<code> row: Object </code>, <code> dragover: Event </code>, <code> index: Number </code>'
            },
            {
                name: '<code>dragleave</code>',
                description: 'Triggers after dragging over a row',
                parameters: '<code> row: Object </code>, <code> dragover: Event </code>, <code> index: Number </code>'
            },
            {
                name: '<code>columndragstart</code>',
                description: 'Triggers when starting to drag a column',
                parameters: '<code> column: Object </code>, <code> dragEvent: Event </code>, <code> index: Number </code>'
            },
            {
                name: '<code>columndragend</code>',
                description: 'Triggers when ending to drag a column',
                parameters: '<code> column: Object </code>, <code> dragEvent: Event </code>, <code> index: Number </code>'
            },
            {
                name: '<code>columndrop</code>',
                description: 'Triggers when dropping on a column',
                parameters: '<code> column: Object </code>, <code> drop: Event </code>, <code> index: Number </code>'
            },
            {
                name: '<code>columndragover</code>',
                description: 'Triggers when dragging over a column',
                parameters: '<code> column: Object </code>, <code> dragover: Event </code>, <code> index: Number </code>'
            },
            {
                name: '<code>columndragleave</code>',
                description: 'Triggers after dragging over a column',
                parameters: '<code> column: Object </code>, <code> dragover: Event </code>, <code> index: Number </code>'
            },
            {
                name: '<code>mouseenter</code>',
                description: 'Triggers when mouse enters a row',
                parameters: '<code> row: Object </code>, <code> event: Event </code>'
            },
            {
                name: '<code>mouseleave</code>',
                description: 'Triggers when mouse leaves a row',
                parameters: '<code> row: Object </code>'
            },
            {
                name: '<code>filters-change</code>',
                description: 'Triggers when filter change',
                parameters: '<code> filter: Object </code>'
            },
            {
                name: '<code>filters-event-[filters-event]</code>',
                description: 'Triggers <code>filters-event</code> event from filter (it works only with Vue 2.6.x)',
                parameters: '<code> event: Event </code>, <code> filter: Object </code>'
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
            },
            {
                name: '<code>toggleDetails</code>',
                description: 'Toggle row detail if table is <code>detailed</code>',
                parameters: '<code>row: Object</code>'
            },
            {
                name: '<code>openDetailRow</code>',
                description: 'Open row detail if table is <code>detailed</code>',
                parameters: '<code>row: Object</code>'
            },
            {
                name: '<code>closeDetailRow</code>',
                description: 'Close row detail if table is <code>detailed</code>',
                parameters: '<code>row: Object</code>'
            },
            {
                name: '<code>resetMultiSorting</code>',
                description: 'Resets the multi column sorting'
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
                description: 'Column fixed width in any unit, or pixels when none is provided',
                type: 'Number, String',
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
                description: 'Custom sort method, works when column is <code>sortable</code>',
                type: 'Function (a: Object, b: Object, isAsc: Boolean)',
                values: '—',
                default: '—'
            },
            {
                name: '<code>searchable</code>',
                description: 'Add a input below the header to filter data',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>custom-search</code>',
                description: 'Custom search method, works when column is <code>searchable</code>',
                type: 'Function (a: Object, input: String)',
                values: '—',
                default: '—'
            },
            {
                name: '<code>subheading</code>',
                description: 'Column subheading text',
                type: 'String, Number',
                values: '—',
                default: '—'
            },
            {
                name: '<code>sticky</code>',
                description: 'Show a sticky column',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>header-selectable</code>',
                description: 'Whether the header text is selectable, works when column is <code>sortable</code>.',
                type: 'Boolean',
                values: '—',
                default: '<code>false</code>'
            },
            {
                name: '<code>header-class</code>',
                description: 'CSS classes to be applied on header',
                type: 'String',
                values: '—',
                default: '-'
            },
            {
                name: '<code>cell-class</code>',
                description: 'CSS classes to be applied on cell',
                type: 'String',
                values: '—',
                default: '-'
            },
            {
                name: '<code>th-attrs</code>',
                description: 'Adds native attributes to th <code>:th-attrs="(column)" => ({})"</code>',
                type: 'Function',
                values: '—',
                default: '-'
            },
            {
                name: '<code>td-attrs</code>',
                description: 'Adds native attributes to td. <div class="notification is-warning">Do not specify an inline arrow function to this prop. Otherwise, you will face infinite updates.</div>',
                type: 'Function: <code>(row, column) => Record&lt;string, any&gt;</code>',
                values: '—',
                default: '-'
            }
        ],
        slots: [
            {
                name: 'default',
                description: '<strong>Required</strong>, table column body',
                props: '<code>row: Object</code>, <code>column: Vue Object</code>, <code>index: Number</code>, <code>colindex: Number</code>, <code>toggleDetails: Function</code>, <code>isActiveDetailRow: Function</code>'
            },
            {
                name: '<code>header</code>',
                description: 'Table column custom header',
                props: '<code>column: Vue Object</code>, <code>index: Number</code>'
            },
            {
                name: '<code>subheading</code>',
                description: 'Table column custom subheading',
                props: '<code>column: Vue Object</code>, <code>index: Number</code>'
            },
            {
                name: '<code>searchable</code>',
                description: 'This is to customize the search input when searchable.',
                props: '<code>column: Vue Object</code>, <code>filters: Object</code>'
            }
        ]
    }
]
