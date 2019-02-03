<template>
    <section>

        <div class="block">
            <button
                class="button is-medium is-primary"
                @click="isOpen = !isOpen"
                aria-controls="contentIdForA11y2">
                Toggle
            </button>
        </div>

        <b-collapse
                aria-id="contentIdForA11y2"
                class="panel"
                :open.sync="isOpen">
            <div
                slot="trigger"
                class="panel-heading"
                role="button"
                aria-controls="contentIdForA11y2">
                <strong>Title</strong>
            </div>
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

<script>
    export default {
        data() {
            return {
                isOpen: true
            }
        }
    }
</script>
