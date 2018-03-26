<template>
    <b-field class="file">
        <b-upload v-model="files">
            <a class="button is-primary">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
            </a>
        </b-upload>
        <span class="file-name"
            v-if="files && files.length">
            {{ files[0].name }}
        </span>
    </b-field>
</template>

<script>
    export default {
        data() {
            return {
                files: []
            }
        }
    }
</script>
