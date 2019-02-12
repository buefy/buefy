<template>
    <section>
        <b-table v-sortable="sortableOptions" 
            :data="data"
            custom-row-key="id"
            @click="(row) => $toast.open(`Clicked ${row.first_name}`)">

            <template slot-scope="props">
                <b-table-column field="id" label="ID" width="40" numeric>
                    {{ props.row.id }}
                </b-table-column>

                <b-table-column field="first_name" label="First Name">
                    {{ props.row.first_name }}
                </b-table-column>

                <b-table-column field="last_name" label="Last Name">
                    {{ props.row.last_name }}
                </b-table-column>

                <b-table-column field="date" label="Date" centered>
                    <span class="tag is-success">
                        {{ new Date(props.row.date).toLocaleDateString() }}
                    </span>
                </b-table-column>

                <b-table-column label="Gender">
                    <b-icon pack="fas"
                        :icon="props.row.gender === 'Male' ? 'mars' : 'venus'">
                    </b-icon>
                    {{ props.row.gender }}
                </b-table-column>
            </template>

        </b-table>
    </section>
</template>

<script>
    // You have to install sorable.js to use it:
    // 'npm install sortablejs'
    import Sortable from 'sortablejs'

    const createSortable = (el, options, vnode) => {
        return Sortable.create(el, {
            ...options,
            onEnd: function (evt) {
                const data = vnode.context.data
                const item = data[evt.oldIndex]
                if (evt.newIndex > evt.oldIndex) {
                    for (let i = evt.oldIndex; i < evt.newIndex; i++) {
                        data[i] = data[i + 1]
                    }
                } else {
                    for (let i = evt.oldIndex; i > evt.newIndex; i--) {
                        data[i] = data[i - 1]
                    }
                }
                data[evt.newIndex] = item
                vnode.context.$toast.open(`Moved ${item.first_name} from row ${evt.oldIndex + 1} to ${evt.newIndex + 1}`)
            }
        })
    }

    /**
     * We add a new instance of Sortable when the element
     * is bound or updated, and destroy it when it's unbound.
     */
    const sortable = {
        name: 'sortable',
        bind(el, binding, vnode) {
            const table = el.querySelector('table')
            table._sortable = createSortable(table.querySelector('tbody'), binding.value, vnode)
        },
        update(el, binding, vnode) {
            const table = el.querySelector('table')
            table._sortable.destroy()
            table._sortable = createSortable(table.querySelector('tbody'), binding.value, vnode)
        },
        unbind(el) {
            const table = el.querySelector('table')
            table._sortable.destroy()
        }
    }

    export default {
        directives: { sortable },
        data() {
            return {
                 sortableOptions: {
                     chosenClass: 'is-selected'
                 },
                 data: [
                    { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016/10/15 13:43:27', 'gender': 'Male' },
                    { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016/12/15 06:00:53', 'gender': 'Male' },
                    { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016/04/26 06:26:28', 'gender': 'Female' },
                    { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016/04/10 10:28:46', 'gender': 'Male' },
                    { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016/12/06 14:38:38', 'gender': 'Female' }
                ]
            }
        }
    }
</script>
