<template>
    <section class="faq-section">
        <div class="container">
            <h2 class="faq-title">
                Frequently Asked Questions
            </h2>
            <div class="faq-list">
                <b-collapse
                    v-for="(item, index) in faq"
                    :key="index"
                    class="faq-item"
                    animation="slide"
                    :model-value="openItems[index]"
                    :aria-id="'faq-item-' + index"
                    @update:model-value="openItems[index] = $event"
                >
                    <template #trigger="props">
                        <div
                            class="faq-header"
                            role="button"
                            :aria-controls="'faq-item-' + index"
                        >
                            <span class="faq-question">{{ item.question }}</span>
                            <b-icon
                                class="faq-chevron"
                                :icon="props.open ? 'chevron-up' : 'chevron-down'"
                            />
                        </div>
                    </template>
                    <div class="faq-body">
                        <p>{{ item.answer }}</p>
                    </div>
                </b-collapse>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BCollapse, BIcon } from 'buefy'
import faq from '@/data/homeFaq'

export default defineComponent({
    name: 'HomeFaq',
    components: { BCollapse, BIcon },
    data() {
        return {
            faq,
            openItems: faq.map(() => false) as boolean[]
        }
    }
})
</script>
