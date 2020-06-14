<template>
    <section>
        <div class="field">
            <b-tag v-if="isTag1Active"
                type="is-primary"
                closable
                aria-close-label="Close tag"
                @close="isTag1Active = false">
                Colored closable tag label
            </b-tag>
        </div>
        <div class="field">
            <b-tag v-if="isTag2Active"
                type="is-success"
                closable
                closeType='is-danger'
                aria-close-label="Close tag"
                @close="isTag2Active = false">
                Colored closable tag label with colored closed icon
            </b-tag>
        </div>

        <div class="field">
            <b-tag v-if="isTag3Active"
                attached
                closable
                aria-close-label="Close tag"
                @close="isTag3Active = false">
                Attached closable tag label
            </b-tag>
        </div>

        <div class="field">
            <b-tag v-if="isTag4Active"
                type="is-danger"
                attached
                closable
                aria-close-label="Close tag"
                @close="isTag4Active = false">
                Colored attached closable tag label
            </b-tag>
        </div>
        <div class="field">
            <b-tag v-if="isTag5Active"
                close-type='is-danger'
                attached
                closable
                aria-close-label="Close tag"
                @close="isTag5Active = false">
                Attached tag label with colored close type
            </b-tag>
        </div>
        <div class="field">
            <b-tag v-if="isTag6Active"
                close-type='is-warning'
                close-icon-type='is-dark'
                attached
                closable
                close-icon='delete'
                aria-close-label="Close tag"
                @close="isTag6Active = false">
                Attached tag label with custom and colored icon
            </b-tag>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isTag1Active: true,
                isTag2Active: true,
                isTag3Active: true,
                isTag4Active: true,
                isTag5Active: true,
                isTag6Active: true,
            }
        }
    }
</script>
