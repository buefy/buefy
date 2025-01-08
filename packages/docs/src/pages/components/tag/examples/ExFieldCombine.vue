<template>
    <section>
        <b-field grouped group-multiline>
            <div class="control">
                <b-taglist attached>
                    <b-tag type="is-dark">npm</b-tag>
                    <b-tag type="is-info">0.5.1</b-tag>
                </b-taglist>
            </div>

            <div class="control">
                <b-taglist attached>
                    <b-tag type="is-dark">downloads</b-tag>
                    <b-tag type="is-success">15k</b-tag>
                </b-taglist>
            </div>

            <div class="control">
                <b-taglist attached>
                    <b-tag type="is-dark">chat</b-tag>
                    <b-tag type="is-primary">on discord</b-tag>
                </b-taglist>
            </div>
        </b-field>
        <br>

        <b-field grouped group-multiline>
            <div class="control">
                <b-tag type="is-primary"
                    attached
                    aria-close-label="Close tag"
                    closable>
                    Technology
                </b-tag>
            </div>

            <div class="control">
                <b-tag type="is-primary"
                    attached
                    aria-close-label="Close tag"
                    closable>
                    Vuejs
                </b-tag>
            </div>

            <div class="control">
                <b-tag type="is-primary"
                    attached
                    aria-close-label="Close tag"
                    closable>
                    CSS
                </b-tag>
            </div>

            <div class="control">
                <b-tag type="is-primary"
                    attached
                    aria-close-label="Close tag"
                    closable>
                    Flexbox
                </b-tag>
            </div>
        </b-field>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BField, BTag, BTaglist } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BField,
        BTag,
        BTaglist
    }
})
</script>
