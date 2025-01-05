<template>
    <section>
        <div class="card" aria-id="contentIdForA11y3">
            <div
                class="card-header"
                role="button"
                aria-controls="contentIdForA11y3">
                <p class="card-header-title">
                    <template v-if="!loading">Component</template>
                    <b-skeleton size="is-large" :active="loading"></b-skeleton>
                </p>
            </div>
            <div class="card-content">
                <div class="content">
                    <template v-if="!loading">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                        <a>#buefy</a>.
                    </template>
                    <b-skeleton size="is-large" :active="loading" :count="2"></b-skeleton>
                </div>
            </div>
            <footer class="card-footer">
                <a class="card-footer-item">
                    <template v-if="!loading">Save</template>
                    <b-skeleton size="is-large" :active="loading"></b-skeleton>
                </a>
                <a class="card-footer-item">
                    <template v-if="!loading">Edit</template>
                    <b-skeleton size="is-large" :active="loading"></b-skeleton>
                </a>
                <a class="card-footer-item">
                    <template v-if="!loading">Delete</template>
                    <b-skeleton size="is-large" :active="loading"></b-skeleton>
                </a>
            </footer>
        </div>

    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BSkeleton } from '@ntohq/buefy-next'

export default defineComponent({
    components: { BSkeleton },
    data() {
        return {
            loading: true
        }
    },
    mounted() {
        setInterval(() => {
            this.loading = !this.loading
        }, 3 * 1000)
    }
})
</script>
