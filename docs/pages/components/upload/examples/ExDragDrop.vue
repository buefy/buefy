<template>
    <section>
        <b-field>
            <b-upload v-model="dropFiles"
                multiple
                drag-drop>
                <section class="section">
                    <div class="content has-text-centered">
                        <p>
                            <b-icon
                                icon="upload"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Drop your files here or click to upload</p>
                    </div>
                </section>
            </b-upload>
        </b-field>

        <div class="tags">
            <span v-for="(file, index) in dropFiles"
                :key="index"
                class="tag is-primary" >
                {{file.name}}
                <b-button no-default-class class="delete" size="is-small" @click="deleteDropFile(index)" />
            </span>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                dropFiles: []
            }
        },
        methods: {
            deleteDropFile(index) {
                this.dropFiles.splice(index, 1)
            }
        }
    }
</script>
