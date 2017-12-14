<template>
    <section>

        <b-collapse class="card" :open.sync="isOpen">
            <div slot="trigger" slot-scope="props" class="card-header">
                <p class="card-header-title">
                    Component
                </p>
                <a class="card-header-icon">
                    <b-icon
                        :icon="props.open ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </a>
            </div>
            <div class="card-content">
                <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                    <a>#buefy</a>.
                </div>
            </div>
            <footer class="card-footer">
                <a class="card-footer-item">Save</a>
                <a class="card-footer-item">Edit</a>
                <a class="card-footer-item">Delete</a>
            </footer>
        </b-collapse>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                isOpen: false
            }
        }
    }
</script>
