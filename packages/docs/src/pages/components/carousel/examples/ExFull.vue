<template>
    <section>

        <div class="example-component">
            <b-field grouped group-multiline>
                <div class="control">
                    <b-switch v-model="autoPlay">Autoplay</b-switch>
                </div>
                <div class="control">
                    <b-switch v-model="pauseHover" :disabled="!autoPlay">Pause on hover</b-switch>
                </div>
                <div class="control">
                    <b-switch v-model="pauseInfo" :disabled="!pauseHover">Pause info</b-switch>
                </div>
                <div class="control">
                    <b-switch v-model="drag">Drag event</b-switch>
                </div>
                <div class="control">
                    <b-switch v-model="repeat" :disabled="!autoPlay">Repeat</b-switch>
                </div>
                <div class="control">
                    <b-switch
                        :model-value="carousels[3].isHidden"
                        @update:model-value="carousels[3].isHidden = !carousels[3].isHidden"
                    >
                        Hide Slide 4
                    </b-switch>
                </div>
            </b-field>
            <b-field grouped group-multiline>
                <b-field label="Value">
                    <b-numberinput v-model="carousel" min="0" :max="visibleCarousels.length - 1" controls-position="compact"/>
                </b-field>
                <b-field label="Interval">
                    <b-numberinput v-model="interval" min="0" controls-position="compact" step="1000" :disabled="!autoPlay"/>
                </b-field>
                <b-field label="Animated">
                    <b-field>
                        <b-radio-button v-model="animated"
                            native-value="fade">
                            Fade
                        </b-radio-button>
                        <b-radio-button v-model="animated"
                            native-value="slide">
                            Slide
                        </b-radio-button>
                    </b-field>
                </b-field>
                <b-field label="Pause Type">
                    <b-select v-model="pauseType" :disabled="!pauseInfo">
                        <option value="is-white">is-white</option>
                        <option value="is-dark">is-dark</option>
                        <option value="is-primary">is-primary</option>
                    </b-select>
                </b-field>
            </b-field>
        </div>

        <b-carousel
            v-model="carousel"
            :animated="animated"
            :has-drag="drag"
            :autoplay="autoPlay"
            :pause-hover="pauseHover"
            :pause-info="pauseInfo"
            :pause-info-type="pauseType"
            :interval="interval"
            :repeat="repeat"
            @change="info($event)">
            <b-carousel-item
                v-for="(carousel, i) in visibleCarousels"
                :key="carousel.order"
                :order="i"
            >
                <section :class="`hero is-medium is-${carousel.color} is-bold`">
                    <div class="hero-body has-text-centered">
                        <h1 class="title">{{carousel.title}}</h1>
                        <b-input :placeholder="carousel.title"></b-input>
                        <p>A link that <a href="#arrow">goes to arrow</a></p>
                    </div>
                </section>
            </b-carousel-item>
        </b-carousel>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
    BCarousel,
    BCarouselItem,
    BField,
    BInput,
    BNumberinput,
    BRadioButton,
    BSelect,
    BSwitch
} from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BCarousel,
        BCarouselItem,
        BField,
        BInput,
        BNumberinput,
        BRadioButton,
        BSelect,
        BSwitch
    },
    data() {
        return {
            carousel: 0,
            animated: 'fade',
            drag: false,
            autoPlay: false,
            pauseHover: false,
            pauseInfo: false,
            repeat: false,
            pauseType: 'is-primary',
            interval: 3000,
            carousels: [
                { title: 'Slide 1', color: 'dark', order: 0 },
                { title: 'Slide 2', color: 'primary', order: 1 },
                { title: 'Slide 3', color: 'info', order: 2 },
                { title: 'Slide 4', color: 'success', isHidden: false, order: 3 },
                { title: 'Slide 5', color: 'warning', order: 4 },
                { title: 'Slide 6', color: 'danger', order: 5 }
            ]
        }
    },
    computed: {
        visibleCarousels() {
            return this.carousels.filter(carousel => !carousel.isHidden)
        }
    },
    methods: {
        info(value: number) {
            this.carousel = value
            this.$buefy.toast.open({
                message: `This Slide ${value} !`,
                type: 'is-info'
            })
        }
    }
})
</script>
