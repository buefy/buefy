<template>
    <section>
        <div style="padding: 1.5rem">
            <b-field grouped group-multiline position="is-centered">
                <b-field label="Value">
                    <b-numberinput v-model="carousel" min="0" :max="carousels.length - 1" controls-position="compact"/>
                </b-field>
                <b-field label="Interval">
                    <b-numberinput v-model="interval" min="0" controls-position="compact" step="1000"/>
                </b-field>
                <b-field label="animate">
                    <b-field>
                        <b-radio-button v-model="animate"
                            native-value="fade">
                            Fade
                        </b-radio-button>
                        <b-radio-button v-model="animate"
                            native-value="slide">
                            Slide
                        </b-radio-button>
                    </b-field>
                </b-field>
            </b-field>
            <hr>
            <div class="columns">
                <div class="column is-narrow">
                    <b-switch v-model="autoPlay">Autoplay</b-switch><br>
                    <b-switch v-model="pauseHover">Pause on hover</b-switch>
                    <b-switch v-model="pauseInfo">Pause info</b-switch>
                    <hr>
                    <b-switch v-model="indicator"><strong>Indicator</strong></b-switch>
                    <b-switch v-model="indicatorInside" :disabled="!indicator">Inside</b-switch>
                    <b-field horizontal label="Mode:">
                        <b-field>
                            <b-radio-button v-model="indicatorMode"
                                native-value="click"
                                :disabled="!indicator">
                                <span>Click</span>
                            </b-radio-button>
                            <b-radio-button v-model="indicatorMode"
                                native-value="hover"
                                :disabled="!indicator">
                                <span>Hover</span>
                            </b-radio-button>
                        </b-field>
                    </b-field>
                    <b-field horizontal label="Style:">
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
                <div class="is-hidden-mobile" style="border-left: whitesmoke solid 2px"></div>
                <div class="column">
                    <b-switch v-model="arrow"><strong>Arrow</strong></b-switch>
                    <b-switch v-model="arrowBoth" :disabled="!arrow">Both</b-switch>
                    <b-switch v-model="arrowHover" :disabled="!arrow">Hover</b-switch>
                    <b-field grouped group-multiline position="is-centered">
                        <b-field label="Arrow Icon Pack">
                            <b-input v-model="iconPack" placeholder="e.g. mdi, fa or other"/>
                        </b-field>
                        <b-field label="Arrow Icon Size">
                            <b-select v-model="iconSize">
                                <option value="">default</option>
                                <option value="is-small">is-small</option>
                                <option value="is-medium">is-medium</option>
                                <option value="is-large">is-large</option>
                            </b-select>
                        </b-field>
                    </b-field>

                    <b-field grouped group-multiline  position="is-centered">
                        <b-field label="Arrow Icon Prev">
                            <b-input v-model="iconPrev"/>
                        </b-field>
                        <b-field label="Arrow Icon Next">
                            <b-input v-model="iconNext"/>
                        </b-field>
                    </b-field>
                </div>
            </div>
        </div>
        
        <b-carousel
            v-model="carousel"
            :animate="animate"
            :autoplay="autoPlay"
            :pause-hover="pauseHover"
            :pause-info="pauseInfo"
            :arrow="arrow"
            :arrow-both="arrowBoth"
            :arrow-hover="arrowHover"
            :icon-pack="iconPack"
            :icon-prev="iconPrev"
            :icon-next="iconNext"
            :icon-size="iconSize"
            :interval="interval"
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
            carousel: 0,
            animate: 'slide',
            autoPlay: false,
            pauseHover: false,
            pauseInfo: false,
            arrow: true,
            arrowBoth: false,
            arrowHover: false,
            interval: 3000,
            iconPack: 'mdi',
            iconPrev: 'chevron-left',
            iconNext: 'chevron-right',
            iconSize: '',
            indicator: true,
            indicatorInside: true,
            indicatorMode: 'click',
            indicatorStyle: 'is-dots',
            carousels: [
                { title: 'Slide 1', color: 'dark' },
                { title: 'Slide 2', color: 'primary' },
                { title: 'Slide 3', color: 'info' },
                { title: 'Slide 4', color: 'success' },
                { title: 'Slide 5', color: 'warning' },
                { title: 'Slide 6', color: 'danger' }
            ]
        }
    }
}
</script>
