<template>
    <b-button
        class="px-2 py-1"
        label="StackBlitz"
        type="is-text"
        size="is-small"
        icon-right="open-in-new"
        @click="openStackBlitz"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BButton } from 'buefy'
import sdk from '@stackblitz/sdk'
import { createCustomVueProject } from '@/utils/stackBlitz'

export default defineComponent({
    components: { BButton },
    props: {
        code: {
            type: String,
            required: true
        },
        title: String
    },
    methods: {
        openStackBlitz() {
            const project = createCustomVueProject(this.code, this.title ?? 'Buefy Stack Blitz')
            sdk.openProject(project, { openFile: 'src/App.vue', newWindow: true })
        }
    }
})
</script>
