<template>
    <section>
        <div class="columns is-mobile is-centered is-multiline" style="padding-top:1.5rem">
            <div class="column is-narrow">
                <b-field>
                <b-switch v-model="indicator"><strong>Indicator</strong></b-switch>
                </b-field>
                <b-field>
                <b-switch v-model="indicatorInside" :disabled="!indicator">Inside</b-switch>
                </b-field>
            </div>
            <div class="column is-narrow">
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
            </div>
            <div class="column is-narrow">
                <b-field label="Style">
                    <b-field>
                        <b-radio-button v-model="indicatorStyle" native-value="is-boxs" :disabled="!indicator">
                            <span>Boxs</span>
                        </b-radio-button>
                        <b-radio-button v-model="indicatorStyle" native-value="is-dots" :disabled="!indicator">
                            <span>Dots</span>
                        </b-radio-button>
                        <b-radio-button v-model="indicatorStyle" native-value="is-lines" :disabled="!indicator">
                            <span>Lines</span>
                        </b-radio-button>
                    </b-field>
                </b-field>
            </div>
        </div>

        <b-carousel
            :indicator="indicator"
            :indicator-inside="indicatorInside"
            :indicator-mode="indicatorMode"
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

<script>
export default {
    data() {
        return {
            indicator: true,
            indicatorInside: true,
            indicatorMode: 'hover',
            indicatorStyle: 'is-lines',
            carousels: [
                { title: 'Slide 1', color: 'info' },
                { title: 'Slide 2', color: 'success' },
                { title: 'Slide 3', color: 'warning' },
                { title: 'Slide 4', color: 'danger' }
            ]
        }
    }
}
</script>
