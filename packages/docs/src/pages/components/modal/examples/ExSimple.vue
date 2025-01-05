<template>
    <section>
        <div class="buttons">
            <b-button
                label="Launch image modal"
                type="is-primary"
                size="is-medium"
                @click="isImageModalActive = true" />
            <b-button
                label="Launch card modal (keep scroll)"
                type="is-primary"
                size="is-medium"
                @click="isCardModalActive = true" />
        </div>

        <b-modal v-model="isImageModalActive">
            <p class="image is-4by3">
                <img src="/static/img/placeholder-1280x960.png">
            </p>
        </b-modal>

        <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img src="/static/img/placeholder-1280x960.png" alt="Image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <img src="/static/img/placeholder-1280x960.png" alt="Image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">John Smith</p>
                            <p class="subtitle is-6">@johnsmith</p>
                        </div>
                    </div>

                    <div class="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                        <a>#css</a> <a>#responsive</a>
                        <br>
                        <small>11:09 PM - 1 Jan 2016</small>
                    </div>
                </div>
            </div>
        </b-modal>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BButton, BModal } from '@ntohq/buefy-next'

    export default {
        components: {
            BButton,
            BModal
        },
        data() {
            return {
                isImageModalActive: false,
                isCardModalActive: false
            }
        }
    }
</script>
