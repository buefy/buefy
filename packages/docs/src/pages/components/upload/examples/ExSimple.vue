<template>
    <b-field class="file is-primary" :class="{'has-name': !!file}">
        <b-upload v-model="file" class="file-label">
            <span class="file-cta">
                <b-icon class="file-icon" icon="upload"></b-icon>
                <span class="file-label">Click to upload</span>
            </span>
            <span class="file-name" v-if="file">
                {{ file.name }}
            </span>
        </b-upload>
    </b-field>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BField, BIcon, BUpload } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BField,
            BIcon,
            BUpload
        },
        data() {
            return {
                file: null as File | null
            }
        }
    });
</script>
