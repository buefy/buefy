<template>
    <section>
        <b-field label="What's your favourite food?">
            <b-taginput
                class="taginput-sortable"
                v-sortable="sortableOptions"
                v-model="tags"
                ellipsis
                icon="label"
                placeholder="Add a food">
            </b-taginput>
        </b-field>
        <p class="content"><b>Tags:</b> {{ tags }}</p>
    </section>
</template>

<script>
    // You have to install sortable.js to use it:
    // 'npm install sortablejs'
    import Sortable from 'sortablejs'

    const createSortable = (el, options, vnode) => {
        return Sortable.create(el, {
            ...options,
            onEnd: function (evt) {
                const data = vnode.componentInstance.$data.tags
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
                vnode.componentInstance.$emit('input', data)
                vnode.context.$buefy.toast.open(`Moved ${item} from row ${evt.oldIndex + 1} to ${evt.newIndex + 1}`)
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
            const container = el.querySelector('.taginput-container')
            container._sortable = createSortable(container, binding.value, vnode)
        },
        update(el, binding, vnode) {
            const container = el.querySelector('.taginput-container')
            container._sortable.destroy()
            container._sortable = createSortable(container, binding.value, vnode)
        },
        unbind(el) {
            const container = el.querySelector('.taginput-container')
            container._sortable.destroy()
        }
    }

    export default {
        directives: { sortable },
        data() {
            return {
                sortableOptions: {
                    chosenClass: 'is-primary',
                    draggable: '.tag'
                },
                tags: [
                    'Pizza',
                    'Ice cream',
                    'Cake'
                ]
            }
        }
    }
</script>

<style>
.taginput-sortable .tag {
  cursor: grab !important;
}
</style>
