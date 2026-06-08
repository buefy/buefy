<template>
    <section class="stats-bar">
        <template v-for="(stat, index) in stats" :key="stat.label">
            <div class="stat">
                <span class="stat-num">{{ stat.num }}</span>
                <span class="stat-label">{{ stat.label }}</span>
            </div>
            <div v-if="index < stats.length - 1" class="stat-divider" />
        </template>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import stats from '@/data/homeStats'

export default defineComponent({
    name: 'HomeStats',
    data() {
        return {
            stats
        }
    }
})
</script>
