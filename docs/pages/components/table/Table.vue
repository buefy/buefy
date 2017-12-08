<template>
    <div class="container">
        <h1 class="title is-spaced">Table</h1>
        <h2 class="subtitle">Tabulated data are sometimes needed, it's even better when it's <strong>responsive</strong></h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <hr>
        <h2 class="title is-spaced">Selection</h2>
        <div class="content">
            <p>
                You can show a <strong>single selected</strong> row by passing the corresponding object to the <code>selected</code> prop.
                Additionally, adding the <code>.sync</code> modifier will make it two-way binding — selected object will mutate if user clicks on row.
            </p>
            <p>
                Use <code>focusable</code> prop make table to be focused and navigable with a keyboard using <strong>arrow keys</strong>.
            </p>
        </div>
        <Example :component="ExSelection" :code="ExSelectionCode"/>

        <hr>
        <h2 class="title is-spaced">Checkable</h2>
        <div class="content">
            <p>You can add checkboxes to rows by using the <code>checkable</code> prop.</p>
            <p>
                To show which rows are <strong>checked</strong>, you have to pass the corresponding object array to the <code>checked-rows</code> prop.
                Adding the <code>.sync</code> modifier will make it two-way binding — checked object array will mutate if user clicks on checkboxes.
            </p>
            <p>A slot called <code>bottom-left</code> is available whenever the table is checkable or paginated, you can add anything in there.</p>
        </div>
        <Example :component="ExCheckable" :code="ExCheckableCode"/>

        <hr>
        <h2 class="title is-spaced">Pagination and sorting</h2>
        <div class="content">
            <p>To make a column sortable, add the <code>sortable</code> prop on it and specify a <code>field</code> name.</p>
            <p>Moreover, use the <code>default-sort</code> prop to determine the default sort column and order. The column must be <code>sortable</code> to work.</p>
            <p>Eventually, use the <code>default-sort-direction</code> prop to determine the default sort column direction on the first click.</p>
            <p>A slot called <code>bottom-left</code> is available whenever the table is checkable or paginated, you can add anything in there.</p>
        </div>
        <Example :component="ExPaginationSort" :code="ExPaginationSortCode"/>

        <hr>
        <h2 class="title is-spaced">Detailed rows</h2>
        <Example :component="ExDetailedRow" :code="ExDetailedRowCode"/>

        <hr>
        <h2 class="title is-spaced">Row status</h2>
        <p class="content">Use the <code>row-class</code> prop to return a class name. Note that <strong>you have to style the class yourself</strong>.</p>
        <Example :component="ExRowStatus" :code="ExRowStatusCode"/>

        <hr>
        <h2 class="title is-spaced">Custom headers</h2>
        <p class="content">
            By adding a scoped slot named <code>header</code> you can customize the headers.
            Use the <code>meta</code> prop on column to pass anything you may need.
        </p>
        <Example :component="ExCustomHeaders" :code="ExCustomHeadersCode"/>

        <hr>
        <h2 class="title is-spaced">Toggle columns</h2>
        <b-message type="is-warning">
            Always use the <code>visible</code> prop to hide/show columns, and <strong>NOT</strong> <code>v-if</code> or <code>v-show</code>.
        </b-message>
        <Example :component="ExToggleColumns" :code="ExToggleColumnsCode"/>

        <hr>
        <h2 class="title is-spaced">Footer</h2>
        <Example :component="ExFooter" :code="ExFooterCode"/>

        <hr>
        <h2 class="title is-spaced">Async data</h2>
        <div class="content">
            <p>
                Use <code>backend-sorting</code> and <code>backend-pagination</code> props to let those tasks to the backend,
                then manage it with <code>page-change</code> and <code>sort</code> events.
            </p>
            <p><small>API from <a href="https://www.themoviedb.org" target="_blank">TMDb</a>.</small></p>
        </div>
        <Example :component="ExAsyncData" :code="ExAsyncDataCode"/>

        <hr>
        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/Table'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

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
