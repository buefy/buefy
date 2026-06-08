<template>
    <section class="features-section">
        <div class="container">
            <div class="features-grid">
                <div
                    v-for="feature in features"
                    :key="feature.title"
                    class="feature-card features"
                >
                    <div class="card-icon">
                        <b-icon :icon="feature.icon" />
                    </div>
                    <h3>{{ feature.title }}</h3>
                    <p>{{ feature.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BIcon } from 'buefy'
import features from '@/data/homeFeatures'

export default defineComponent({
    name: 'HomeFeatures',
    components: { BIcon },
    data() {
        return {
            features
        }
    },
    mounted() {
        this.$nextTick(() => {
            const featuresElements = document.querySelectorAll('.features')
            featuresElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('reveal-animation')
                }, 500 + index * 200)
            })
        })
    }
})
</script>

<style scoped>
.features {
    opacity: 0;
    transform: translateY(20px);
    transition: transform 0.6s ease-out;
}

.features.reveal-animation {
    opacity: 1;
    transform: translateY(0);
}
</style>
