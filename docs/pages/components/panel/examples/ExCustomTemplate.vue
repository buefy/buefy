<template>
    <section>
        <div class="block">
            <button class="button is-medium is-primary"
                @click="isOpen = !isOpen">
                Toggle
            </button>
        </div>

        <b-panel header="Title"
            has-custom-template
            collapsible
            :open.sync="isOpen">
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
        </b-panel>
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
