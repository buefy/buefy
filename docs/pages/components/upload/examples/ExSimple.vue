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

<script>
    export default {
        data() {
            return {
                file: null
            }
        }
    }
</script>
