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

<script lang="ts">
    import { defineComponent } from 'vue'
    import type { Directive } from 'vue'
    // You have to install sortable.js to use it:
    // 'npm install sortablejs'
    // 'npm install --save-dev @types/sortablejs'
    import Sortable from 'sortablejs'

    import { BField, BTaginput } from '@ntohq/buefy-next'

    type BTaginputInstance = InstanceType<typeof BTaginput>

    interface SortableContainer extends HTMLElement {
        _sortable: Sortable
    }

    const createSortable = (
        el: HTMLElement,
        options: Sortable.Options,
        taginput: BTaginputInstance
    ) => {
        return Sortable.create(el, {
            ...options,
            onEnd: function (evt) {
                const data = taginput.$data.tags
                const item = data[evt.oldIndex!]
                if (evt.newIndex! > evt.oldIndex!) {
                    for (let i = evt.oldIndex!; i < evt.newIndex!; i++) {
                        data[i] = data[i + 1]
                    }
                } else {
                    for (let i = evt.oldIndex!; i > evt.newIndex!; i--) {
                        data[i] = data[i - 1]
                    }
                }
                data[evt.newIndex!] = item
                taginput.$emit('update:modelValue', data)
                taginput.$buefy.toast.open(`Moved ${item} from row ${evt.oldIndex! + 1} to ${evt.newIndex! + 1}`)
            }
        })
    }

    /**
     * We add a new instance of Sortable when the element
     * is bound or updated, and destroy it when it's unbound.
     */
    const sortable: Directive<HTMLElement, Sortable.Options> = {
        beforeMount(el, binding) {
            const container = el.querySelector('.taginput-container') as SortableContainer
            container._sortable = createSortable(
                container,
                binding.value,
                binding.instance as BTaginputInstance
            )
        },
        updated(el, binding) {
            const container = el.querySelector('.taginput-container') as SortableContainer
            container._sortable.destroy()
            container._sortable = createSortable(
                container,
                binding.value,
                binding.instance as BTaginputInstance
            )
        },
        unmounted(el) {
            const container = el.querySelector('.taginput-container') as SortableContainer
            container._sortable.destroy()
        }
    }

    export default defineComponent({
        components: {
            BField,
            BTaginput
        },
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
    })
</script>

<style>
.taginput-sortable .tag {
  cursor: grab !important;
}
</style>
