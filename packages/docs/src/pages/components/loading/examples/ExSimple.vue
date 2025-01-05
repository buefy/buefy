<template>
    <section>
        <b-field>
            <b-button
                label="Launch loading"
                type="is-primary"
                size="ismedium"
                @click="openLoading" />
        </b-field>
        <b-field>
            <b-switch v-model="isFullPage">Display loader over full page</b-switch>
        </b-field>
        <b-notification :closable="false">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
            <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>
        </b-notification>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BButton, BField, BLoading, BNotification, BSwitch } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BButton,
            BField,
            BLoading,
            BNotification,
            BSwitch
        },
        data() {
            return {
                isLoading: false,
                isFullPage: true
            }
        },
        methods: {
            openLoading() {
                this.isLoading = true
                setTimeout(() => {
                    this.isLoading = false
                }, 10 * 1000)
            }
        }
    })
</script>
