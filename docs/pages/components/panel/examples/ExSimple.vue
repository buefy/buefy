<template>
    <section>
        <div class="block">
            <b-switch v-model="isCollapsible">Collapsible</b-switch>
        </div>

        <b-panel :collapsible="isCollapsible">
            <strong slot="header">Title</strong>
            <div class="content">
                <h3>
                    Subtitle
                </h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
                    Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br/>
                    Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
                </p>
            </div>
        </b-panel>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isCollapsible: false
            }
        }
    }
</script>
