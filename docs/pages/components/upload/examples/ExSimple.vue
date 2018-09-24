<template>
    <b-field class="file">
        <b-upload v-model="file">
            <a class="button is-primary">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
            </a>
        </b-upload>
        <span class="file-name" v-if="file">
            {{ file.name }}
        </span>
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
