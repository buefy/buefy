<template>
    <b-field class="file is-primary" :class="{'has-name': !!file}">
        <b-upload v-model="file" class="file-label" accept=".tar.gz" required validationMessage="Please select a file">
            <span class="file-cta">
                <b-icon class="file-icon" icon="upload"></b-icon>
                <span class="file-label">Click to upload (Only .tar.gz)</span>
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
                file: null,
            }
        }
    }
</script>
