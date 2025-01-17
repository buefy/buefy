<template>
    <div>
        <div class="buttons">
            <a
                class="button"
                href="https://sortablejs.github.io/Sortable/"
                target="_blank">
                Website
            </a>
            <a
                class="button"
                href="https://github.com/SortableJS/Sortable"
                target="_blank">
                Docs
            </a>
        </div>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical>
            <b-message type="is-info">
                <p><strong>Sortable is not included in Buefy</strong>, you have to install it:</p>
                <CodeView code="npm install sortablejs" expanded/>
            </b-message>
        </Example>
    </div>
</template>

<script lang="ts">
    import { defineComponent, shallowRef } from 'vue'

    import { BMessage } from '@ntohq/buefy-next'

    import CodeView from '@/components/CodeView.vue'
    import Example from '@/components/Example.vue'
    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    export default defineComponent({
        components: {
            BMessage,
            CodeView,
            Example
        },
        data() {
            return {
                ExSimple: shallowRef(ExSimple),
                ExSimpleCode
            }
        }
    })
</script>
