<template>
    <b-field>
        <b-upload v-model="files">
            <a class="button is-primary">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
            </a>
        </b-upload>
        <div v-if="files && files.length">
            <span class="file-name">
                {{ files[0].name }}
            </span>
        </div>
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
