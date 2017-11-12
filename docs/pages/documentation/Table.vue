<template>
    <div>
        <h1 class="title is-spaced">Table</h1>
        <h2 class="subtitle">Tabulated data are sometimes needed, it's even better when it's <strong>responsive</strong></h2>
        <hr>

        <div class="example">
            <ex-simple></ex-simple>
        </div>
        <CodeView :code="ExSimpleCode" bordered />

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
        <div class="example">
            <ex-selection></ex-selection>
        </div>
        <CodeView :code="ExSelectionCode" bordered />

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
        <div class="example">
            <ex-checkable></ex-checkable>
        </div>
        <CodeView :code="ExCheckableCode" bordered />

        <hr>
        <h2 class="title is-spaced">Pagination and sorting</h2>
        <div class="content">
            <p>To make a column sortable, add the <code>sortable</code> prop on it and specify a <code>field</code> name.</p>
            <p>Moreover, use the <code>default-sort</code> prop to determine the default sort column and order. The column must be <code>sortable</code> to work.</p>
            <p>Eventually, use the <code>default-sort-direction</code> prop to determine the default sort column direction on the first click.</p>
            <p>A slot called <code>bottom-left</code> is available whenever the table is checkable or paginated, you can add anything in there.</p>
        </div>
        <div class="example">
            <ex-pagination-sort></ex-pagination-sort>
        </div>
        <CodeView :code="ExPaginationSortCode" bordered />

        <hr>
        <h2 class="title is-spaced">Detailed rows</h2>
        <div class="example">
            <ex-detailed-row></ex-detailed-row>
        </div>
        <CodeView :code="ExDetailedRowCode" bordered />

        <hr>
        <h2 class="title is-spaced">Row status</h2>
        <p class="content">Use the <code>row-class</code> prop to return a class name. Note that <strong>you have to style the class yourself</strong>.</p>
        <div class="example">
            <ex-row-status></ex-row-status>
        </div>
        <CodeView :code="ExRowStatusCode" bordered />

        <hr>
        <h2 class="title is-spaced">Custom headers</h2>
        <p class="content">
            By adding a scoped slot named <code>header</code> you can customize the headers.
            Use the <code>meta</code> prop on column to pass anything you may need.
        </p>
        <div class="example">
            <ex-custom-headers></ex-custom-headers>
        </div>
        <CodeView :code="ExCustomHeadersCode" bordered />

        <hr>
        <h2 class="title is-spaced">Toggle columns</h2>
        <b-message type="is-warning">
            Always use the <code>visible</code> prop to hide/show columns, and <strong>NOT</strong> <code>v-if</code> or <code>v-show</code>.
        </b-message>
        <div class="example">
            <ex-toggle-columns></ex-toggle-columns>
        </div>
        <CodeView :code="ExToggleColumnsCode" bordered />

        <hr>
        <h2 class="title is-spaced">Footer</h2>
        <div class="example">
            <ex-footer></ex-footer>
        </div>
        <CodeView :code="ExFooterCode" bordered />

        <hr>
        <h2 class="title is-spaced">Async data</h2>
        <div class="content">
            <p>
                Use <code>backend-sorting</code> and <code>backend-pagination</code> props to let those tasks to the backend,
                then manage it with <code>page-change</code> and <code>sort</code> events.
            </p>
            <p><small>API from <a href="https://www.themoviedb.org" target="_blank">TMDb</a>.</small></p>
        </div>
        <div class="example">
            <ex-async-data></ex-async-data>
        </div>
        <CodeView :code="ExAsyncDataCode" bordered />

        <hr>
        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiTable'

    import ExSimple from '@/examples/table/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/table/ExSimple'

    import ExSelection from '@/examples/table/ExSelection'
    import ExSelectionCode from '!!raw-loader!@/examples/table/ExSelection'

    import ExCheckable from '@/examples/table/ExCheckable'
    import ExCheckableCode from '!!raw-loader!@/examples/table/ExCheckable'

    import ExPaginationSort from '@/examples/table/ExPaginationSort'
    import ExPaginationSortCode from '!!raw-loader!@/examples/table/ExPaginationSort'

    import ExDetailedRow from '@/examples/table/ExDetailedRow'
    import ExDetailedRowCode from '!!raw-loader!@/examples/table/ExDetailedRow'

    import ExRowStatus from '@/examples/table/ExRowStatus'
    import ExRowStatusCode from '!!raw-loader!@/examples/table/ExRowStatus'

    import ExCustomHeaders from '@/examples/table/ExCustomHeaders'
    import ExCustomHeadersCode from '!!raw-loader!@/examples/table/ExCustomHeaders'

    import ExToggleColumns from '@/examples/table/ExToggleColumns'
    import ExToggleColumnsCode from '!!raw-loader!@/examples/table/ExToggleColumns'

    import ExFooter from '@/examples/table/ExFooter'
    import ExFooterCode from '!!raw-loader!@/examples/table/ExFooter'

    import ExAsyncData from '@/examples/table/ExAsyncData'
    import ExAsyncDataCode from '!!raw-loader!@/examples/table/ExAsyncData'

    export default {
        components: {
            ExSimple,
            ExSelection,
            ExCheckable,
            ExPaginationSort,
            ExDetailedRow,
            ExRowStatus,
            ExCustomHeaders,
            ExToggleColumns,
            ExFooter,
            ExAsyncData
        },
        data() {
            return {
                api,
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
