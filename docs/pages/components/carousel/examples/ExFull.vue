<template>
    <section>
        <div style="padding: 1.5rem">
            <b-field grouped group-multiline position="is-centered">
                <b-switch v-model="autoPlay">Autoplay</b-switch>
                <b-switch v-model="pauseHover" :disabled="!autoPlay">Pause on hover</b-switch>
                <b-switch v-model="pauseInfo" :disabled="!pauseHover">Pause info</b-switch>
                <b-switch v-model="drag">Drag event</b-switch>
            </b-field><br>
            <b-field grouped group-multiline position="is-centered">
                <b-field label="Value">
                    <b-numberinput v-model="carousel" min="0" :max="carousels.length - 1" controls-position="compact"/>
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
            @change="info($event)">
            <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
                <section :class="`hero is-medium is-${carousel.color} is-bold`">
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
            carousel: 0,
            animated: 'fade',
            drag: false,
            autoPlay: false,
            pauseHover: false,
            pauseInfo: false,
            pauseType: 'is-primary',
            interval: 3000,
            carousels: [
                { title: 'Slide 1', color: 'dark' },
                { title: 'Slide 2', color: 'primary' },
                { title: 'Slide 3', color: 'info' },
                { title: 'Slide 4', color: 'success' },
                { title: 'Slide 5', color: 'warning' },
                { title: 'Slide 6', color: 'danger' }
            ]
        }
    },
    methods: {
        info(value) {
            this.carousel = value
            this.$buefy.toast.open({
                message: `This Slide ${value} !`,
                type: 'is-info'
            })
        }
    }
}
</script>
