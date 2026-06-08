<template>
    <section class="component-browser-section">
        <div class="container">
            <h2 class="section-title has-text-centered">
                40+ Components
            </h2>
            <p class="section-sub has-text-centered">
                Everything you need to build modern Vue 3 apps
            </p>
            <div class="component-browser">
                <div
                    v-for="category in categories"
                    :key="category.label"
                    class="category-row"
                >
                    <div class="category-label">
                        {{ category.label }}
                    </div>
                    <div class="chip-row">
                        <router-link
                            v-for="item in category.items"
                            :key="item.name"
                            :to="item.route"
                            class="component-chip"
                        >
                            {{ item.name }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import categories from '@/data/homeComponents'

export default defineComponent({
    name: 'HomeComponentBrowser',
    data() {
        return {
            categories
        }
    }
})
</script>
