<template>
    <div class="default-container">
        <h1 class="title is-spaced">Table</h1>
        <h2 class="subtitle">Tabulated data are sometimes needed, it's even better when it's <strong>responsive</strong></h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode">
            <p>To show a data table is very simple, you just need a <code>data</code> and a <code>columns</code> prop.</p>
        </Example>

        <Example :component="ExSandbox" :code="ExSandboxCode" title="Sandbox with custom template">
            <p>To show a custom row template, you <b>should not use the <code>columns</code> prop</b>, but add it within the scoped slot as a component.</p>
            <p>Also you can add an <code>empty</code> named slot to show when there's no data.</p>
        </Example>

        <Example :component="ExSelection" :code="ExSelectionCode" title="Selection">
            <p>
                You can show a <strong>single selected</strong> row by passing the corresponding object to the <code>selected</code> prop.
                Additionally, adding the <code>.sync</code> modifier will make it two-way binding — selected object will mutate if user clicks on row.
            </p>
            <p>Use <code>focusable</code> prop make table to be focused and navigable with a keyboard using <strong>arrow keys</strong>.</p>
        </Example>

        <Example :component="ExCheckable" :code="ExCheckableCode" title="Checkable">
            <p>You can add checkboxes to rows by using the <code>checkable</code> prop.</p>
            <p>
                To show which rows are <strong>checked</strong>, you have to pass the corresponding object array to the <code>checked-rows</code> prop.
                Adding the <code>.sync</code> modifier will make it two-way binding — checked object array will mutate if user clicks on checkboxes.
            </p>
            <p>A slot called <code>bottom-left</code> is available whenever the table is checkable or paginated, you can add anything in there.</p>
            <p>You can disable a checkbox by adding the property <code>disabled: true</code> to the object row.</p>
        </Example>

        <Example :component="ExPaginationSort" :code="ExPaginationSortCode" title="Pagination and sorting">
            <p>To make a column sortable, add the <code>sortable</code> prop on it and specify a <code>field</code> name.</p>
            <p>You can also use the <code>default-sort</code> prop to determine the default sort column and order. The column must be <code>sortable</code> to work.</p>
            <p>The <code>default-sort-direction</code> prop can be set to determine the default sort column direction on the first click.</p>
            <p>A slot called <code>bottom-left</code> is available whenever the table is checkable or paginated, you can add anything in there.</p>
        </Example>

        <Example :component="ExDetailedRow" :code="ExDetailedRowCode" title="Detailed rows">
            <p>You can have detailed rows by adding a <code>detail</code> named scoped slot and the <code>detailed</code> prop.</p>
        </Example>

        <Example :component="ExRowStatus" :code="ExRowStatusCode" title="Row status">
            <p>Use the <code>row-class</code> prop to return a class name. It's a function that receives <code>row</code> and <code>index</code> parameters.</p>
            <p>Note that <strong>you have to style the class yourself</strong>.</p>
        </Example>

        <Example :component="ExCustomHeaders" :code="ExCustomHeadersCode" title="Custom headers">
            <p>
                By adding a scoped slot named <code>header</code> you can customize the headers.
                Use the <code>meta</code> prop on column to pass anything you may need.
            </p>
        </Example>

        <Example :component="ExToggleColumns" :code="ExToggleColumnsCode" title="Toggle columns">
            <b-message type="is-danger">
                Always use the <code>visible</code> prop to hide/show columns, and <strong>NOT</strong> <code>v-if</code> or <code>v-show</code>.
            </b-message>
        </Example>

        <Example :component="ExFooter" :code="ExFooterCode" title="Footer"/>

        <Example :component="ExAsyncData" :code="ExAsyncDataCode" title="Async data">
            <p>
                Use <code>backend-sorting</code> and <code>backend-pagination</code> props to let those tasks to the backend,
                then manage it with <code>page-change</code> and <code>sort</code> events.
            </p>
            <p><small>API from <a href="https://www.themoviedb.org" target="_blank">TMDb</a>.</small></p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/table'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExSandbox from './examples/ExSandbox'
    import ExSandboxCode from '!!raw-loader!./examples/ExSandbox'

    import ExSelection from './examples/ExSelection'
    import ExSelectionCode from '!!raw-loader!./examples/ExSelection'

    import ExCheckable from './examples/ExCheckable'
    import ExCheckableCode from '!!raw-loader!./examples/ExCheckable'

    import ExPaginationSort from './examples/ExPaginationSort'
    import ExPaginationSortCode from '!!raw-loader!./examples/ExPaginationSort'

    import ExDetailedRow from './examples/ExDetailedRow'
    import ExDetailedRowCode from '!!raw-loader!./examples/ExDetailedRow'

    import ExRowStatus from './examples/ExRowStatus'
    import ExRowStatusCode from '!!raw-loader!./examples/ExRowStatus'

    import ExCustomHeaders from './examples/ExCustomHeaders'
    import ExCustomHeadersCode from '!!raw-loader!./examples/ExCustomHeaders'

    import ExToggleColumns from './examples/ExToggleColumns'
    import ExToggleColumnsCode from '!!raw-loader!./examples/ExToggleColumns'

    import ExFooter from './examples/ExFooter'
    import ExFooterCode from '!!raw-loader!./examples/ExFooter'

    import ExAsyncData from './examples/ExAsyncData'
    import ExAsyncDataCode from '!!raw-loader!./examples/ExAsyncData'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSandbox,
                ExSelection,
                ExCheckable,
                ExPaginationSort,
                ExDetailedRow,
                ExRowStatus,
                ExCustomHeaders,
                ExToggleColumns,
                ExFooter,
                ExAsyncData,
                ExSimpleCode,
                ExSandboxCode,
                ExSelectionCode,
                ExCheckableCode,
                ExPaginationSortCode,
                ExDetailedRowCode,
                ExRowStatusCode,
                ExCustomHeadersCode,
                ExToggleColumnsCode,
                ExFooterCode,
                ExAsyncDataCode
            }
        }
    }
</script>
