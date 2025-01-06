<template>
    <div>
        <b-field>
            <b-button
                label="Launch loading"
                type="is-primary"
                size="is-medium"
                @click="open" />
        </b-field>
        <b-field>
            <b-switch v-model="isFullPage">Display loader over full page</b-switch>
        </b-field>
        <b-notification ref="element" :closable="false">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </b-notification>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import type { ComponentPublicInstance } from 'vue'
    import { BButton, BField, BNotification, BSwitch } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BButton,
            BField,
            BNotification,
            BSwitch
        },
        data() {
            return {
                isFullPage: true,
            }
        },
        methods: {
            open() {
                const loadingComponent = this.$buefy.loading.open({
                    container: this.isFullPage ? null : (this.$refs.element as ComponentPublicInstance).$el
                })
                setTimeout(() => loadingComponent.close(), 3 * 1000)
            }
        }
    })
</script>
