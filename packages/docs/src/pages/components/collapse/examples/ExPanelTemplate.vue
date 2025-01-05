<template>
    <section>

        <div class="block">
            <b-button
                label="Toggle"
                type="is-primary"
                size="is-medium"
                @click="isOpen = !isOpen"
                :aria-expanded="isOpen"
                aria-controls="contentIdForA11y2" />
        </div>

        <b-collapse
            aria-id="contentIdForA11y2"
            class="panel"
            animation="slide"
            v-model="isOpen">
            <template #trigger>
                <div
                    class="panel-heading"
                    role="button"
                    aria-controls="contentIdForA11y2"
                    :aria-expanded="isOpen">
                    <strong>Title</strong>
                </div>
            </template>
            <p class="panel-tabs">
                <a class="is-active">All</a>
                <a>Public</a>
                <a>Private</a>
            </p>
            <div class="panel-block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br/>
                Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
            </div>
        </b-collapse>

    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BButton, BCollapse } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BButton,
            BCollapse
        },
        data() {
            return {
                isOpen: true
            }
        }
    })
</script>
