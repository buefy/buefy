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
                <button class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)">
                </button>
            </span>
        </div>
    </section>
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
                dropFiles: [] as Array<File>
            }
        },
        methods: {
            deleteDropFile(index: number): void {
                this.dropFiles.splice(index, 1)
            }
        }
    })
</script>
