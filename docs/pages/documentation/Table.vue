<template>
    <div class="card">
        <div class="card-content level mb-0">
            <div class="level-left">
                <div class="level-item">
                    <h2 class="title is-4">Multi-select e paginação simples</h2>
                </div>
            </div>

            <div class="level-right">
                <div class="level-item">
                    <p><strong>{{ tableData.length }}</strong> item(s)</p>
                </div>
                <div class="level-item">
                    <div class="field">
                        <p class="control has-icon is-expanded">
                            <input class="input" type="text" placeholder="Pesquisar..." @input="debounceSearch">
                            <b-icon icon="search"></b-icon>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <b-table
            :data="tableData"
            checkable
            default-sort="marca"
            paginated
            per-page="10"
            simple-pagination
            @check="tableCheck">
            <b-table-column
                field="marca"
                label="Marca"
                sortable
                width="280">
            </b-table-column>
            <b-table-column
                field="veiculo"
                label="Nome"
                sortable>
            </b-table-column>
            <b-table-column
                field="ano_final"
                label="Data"
                width="180"
                numeric>
            </b-table-column>
        </b-table>

        <pre>{{ items }}</pre>

        <div class="card-content level mb-0">
            <div class="level-left">
                <div class="level-item">
                    <h2 class="title is-4">Paginação completa e linha selecionável</h2>
                </div>
            </div>

            <div class="level-right">
                <div class="level-item">
                    <p><strong>{{ tableData.length }}</strong> item(s)</p>
                </div>
                <div class="level-item">
                    <div class="field">
                        <p class="control has-icon is-expanded">
                            <input class="input" type="text" placeholder="Pesquisar..." @input="debounceSearch">
                            <b-icon icon="search"></b-icon>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <b-table
            :data="tableData"
            selectable
            default-sort="marca"
            paginated
            per-page="10"
            @check="tableCheck">
            <b-table-column
                field="marca"
                label="Marca"
                sortable
                width="280">
            </b-table-column>
            <b-table-column
                field="veiculo"
                label="Nome"
                sortable>
            </b-table-column>
            <b-table-column
                field="ano_final"
                label="Data"
                width="180"
                numeric>
            </b-table-column>
        </b-table>
    </div>
</template>

<script>
    import tableData from '../../assets/data_test.json'
    import debounce from 'lodash/debounce'

    export default {
        data() {
            return {
                search: '',
                items: []
            }
        },
        computed: {
            tableData() {
                if (this.search === '') return tableData

                return tableData.filter(this.findInTable)
            }
        },
        methods: {
            findInTable(obj) {
                return obj.veiculo
                    .toString()
                    .toLowerCase()
                    .indexOf(this.search.toLowerCase()) >= 0
            },
            debounceSearch: debounce(function (el) {
                this.search = el.target.value
            }, 500),
            tableCheck(items, item) {
                this.items = items
            }
        }
    }
</script>
