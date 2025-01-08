<template>
    <div class="tags" :class="{ 'has-addons': attached }">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BTaglist',
    props: {
        attached: Boolean
    }
})
</script>
