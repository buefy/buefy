<template>
    <section>
        <div class="example-component">
            <b-field grouped group-multiline>
                <div class="control">
                    <b-switch v-model="indicator"><strong>Indicator</strong></b-switch>
                </div>
                <div class="control">
                    <b-switch v-model="indicatorBackground" :disabled="!indicator">Background</b-switch>
                </div>
                <div class="control">
                    <b-switch v-model="indicatorInside" :disabled="!indicator">Inside</b-switch>
                </div>
            </b-field>
            <b-field grouped group-multiline>
                <b-field label="Position" :disabled="!indicator">
                    <b-select v-model="indicatorPosition">
                        <option value="is-bottom">is-bottom</option>
                        <option value="is-top">is-top</option>
                    </b-select>
                </b-field>
                <b-field label="Mode">
                    <b-field>
                        <b-radio-button v-model="indicatorMode" native-value="click" :disabled="!indicator">
                            <span>Click</span>
                        </b-radio-button>
                        <b-radio-button v-model="indicatorMode" native-value="hover" :disabled="!indicator">
                            <span>Hover</span>
                        </b-radio-button>
                    </b-field>
                </b-field>
                <b-field label="Style">
                    <b-field>
                        <b-radio-button v-model="indicatorStyle" native-value="is-boxes" :disabled="!indicator">
                            <span>Boxes</span>
                        </b-radio-button>
                        <b-radio-button v-model="indicatorStyle" native-value="is-dots" :disabled="!indicator">
                            <span>Dots</span>
                        </b-radio-button>
                        <b-radio-button v-model="indicatorStyle" native-value="is-lines" :disabled="!indicator">
                            <span>Lines</span>
                        </b-radio-button>
                    </b-field>
                </b-field>
            </b-field>
        </div>

        <b-carousel
            :indicator="indicator"
            :indicator-background="indicatorBackground"
            :indicator-inside="indicatorInside"
            :indicator-mode="indicatorMode"
            :indicator-position="indicatorPosition"
            :indicator-style="indicatorStyle">
            <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
                <section :class="`hero is-medium is-${carousel.color}`">
                    <div class="hero-body has-text-centered">
                        <h1 class="title">{{carousel.title}}</h1>
                    </div>
                </section>
            </b-carousel-item>
        </b-carousel>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BCarousel, BCarouselItem, BField, BRadioButton, BSelect, BSwitch } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BCarousel,
        BCarouselItem,
        BField,
        BRadioButton,
        BSelect,
        BSwitch
    },
    data() {
        return {
            indicator: true,
            indicatorBackground: true,
            indicatorInside: true,
            indicatorMode: 'hover' as 'click' | 'hover',
            indicatorPosition: 'is-top',
            indicatorStyle: 'is-lines',
            carousels: [
                { title: 'Slide 1', color: 'info' },
                { title: 'Slide 2', color: 'success' },
                { title: 'Slide 3', color: 'warning' },
                { title: 'Slide 4', color: 'danger' }
            ]
        }
    }
})
</script>
