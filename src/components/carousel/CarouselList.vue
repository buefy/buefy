<template>
    <div
        class="carousel-list"
        :class="{'has-shadow': activeItem > 0}"
        @mousedown.stop.prevent="dragStart"
        @touchstart="dragStart">
        <div
            class="carousel-slides"
            :class="listClass"
            :style="transformStyle">
            <div
                class="carousel-slide"
                :class="{'is-active': activeItem === index}"
                @click.prevent="checkAsIndicator(index, $event)"
                v-for="(list, index) in data"
                :key="index"
                :style="itemStyle">
                <slot
                    :list="list"
                    :index="index"
                    :active="activeItem"
                    name="item">
                    <figure class="image">
                        <img
                            :src="list.image"
                            :title="list.title">
                    </figure>
                </slot>
            </div>
        </div>
        <div
            v-if="arrow"
            class="carousel-arrow"
            :class="{'is-hovered': arrowHover}">
            <b-icon
                v-show="activeItem > 0"
                class="has-icons-left"
                @click.native.prevent="prev"
                :pack="iconPack"
                :icon="iconPrev"
                :size="iconSize"
                both />
            <b-icon
                v-show="checkArrow(total)"
                class="has-icons-right"
                @click.native.prevent="next"
                :pack="iconPack"
                :icon="iconNext"
                :size="iconSize"
                both />
        </div>
    </div>
</template>

<script>
import { merge, sign } from '../../utils/helpers'
import config from '../../utils/config'

import Icon from '../icon/Icon'

export default {
    name: 'BCarouselList',
    components: {
        [Icon.name]: Icon
    },
    props: {
        config: {
            type: Object,
            default: () => ({})
        },
        data: {
            type: Array,
            default: () => []
        },
        value: {
            type: Number,
            default: 0
        },
        hasDrag: {
            type: Boolean,
            default: true
        },
        hasGrayscale: Boolean,
        hasOpacity: Boolean,
        repeat: Boolean,
        itemsToShow: {
            type: Number,
            default: 4
        },
        itemsToList: {
            type: Number,
            default: 1
        },
        asIndicator: Boolean,
        arrow: {
            type: Boolean,
            default: true
        },
        arrowHover: {
            type: Boolean,
            default: true
        },
        iconPack: String,
        iconSize: String,
        iconPrev: {
            type: String,
            default: () => {
                return config.defaultIconPrev
            }
        },
        iconNext: {
            type: String,
            default: () => {
                return config.defaultIconNext
            }
        },
        refresh: Boolean
    },
    data() {
        return {
            activeItem: this.value,
            breakpoints: {},
            delta: 0,
            dragging: false,
            hold: 0,
            itemWidth: 0,
            total: 0,
            settings: {}
        }
    },
    computed: {
        listClass() {
            return [
                {
                    'has-grayscale': this.settings.hasGrayscale || this.hasGrayscale,
                    'has-opacity': this.settings.hasOpacity || this.hasOpacity,
                    'is-dragging': this.dragging
                }
            ]
        },
        itemStyle() {
            return `width: ${this.itemWidth}px;`
        },
        transformStyle() {
            const translate = this.delta + 1 * (this.activeItem * this.itemWidth)
            const result = this.dragging ? -translate : -Math.abs(translate)
            return `transform: translateX(${result}px);`
        }
    },
    watch: {
        /**
         * When v-model is changed set the new active item.
         */
        value(value) {
            this.switchTo(value)
        },
        /**
         * Only for overlay and as indicator.
         * when call overlay with click.
         */
        refresh(status) {
            if (status && this.asIndicator) {
                this.getWidth()
            }
        }
    },
    methods: {
        initConfig() {
            this.breakpoints = this.config.breakpoints
            this.settings = merge(this.$props, this.config, true)
        },
        getWidth() {
            const rect = this.$el.getBoundingClientRect()
            this.itemWidth = rect.width / this.settings.itemsToShow
        },
        update() {
            if (this.breakpoints) {
                this.updateConfig()
            }
            this.getWidth()
        },
        updateConfig() {
            const breakpoints = Object.keys(this.breakpoints).sort((a, b) => b - a)
            let checking
            breakpoints.some((breakpoint) => {
                checking = window.matchMedia(`(min-width: ${breakpoint}px)`).matches
                if (checking) {
                    this.settings = this.config.breakpoints[breakpoint]
                    return true
                }
            })
            if (!checking) {
                this.settings = this.config
            }
        },
        switchTo(newIndex) {
            if (newIndex < 0 ||
                this.activeItem === newIndex ||
                (!this.repeat && newIndex > this.total)) return
            const result = this.repeat && newIndex > this.total ? 0 : newIndex
            this.activeItem = result
            this.$emit('switch', result)
        },
        next() {
            this.switchTo(this.activeItem + this.itemsToList)
        },
        prev() {
            this.switchTo(this.activeItem - this.itemsToList)
        },
        checkArrow(value) {
            if (this.repeat || this.activeItem !== value) return true
        },
        checkAsIndicator(value, e) {
            if (!this.asIndicator) return
            const timeCheck = new Date().getTime()
            // al solution: holding, 100 - 400 not 100% but 200 is better!
            if (!e.touches && (timeCheck - this.hold) > 200) return
            this.switchTo(value)
        },
        // handle drag event
        dragStart(event) {
            if (!this.hasDrag || (event.button !== 0 && event.type !== 'touchstart')) return
            this.hold = new Date().getTime()
            this.dragging = true
            this.dragStartX = event.touches ? event.touches[0].clientX : event.clientX
            window.addEventListener(event.touches ? 'touchmove' : 'mousemove', this.dragMove)
            window.addEventListener(event.touches ? 'touchend' : 'mouseup', this.dragEnd)
        },
        dragMove(event) {
            this.dragEndX = event.touches ? event.touches[0].clientX : event.clientX
            const deltaX = this.dragEndX - this.dragStartX
            this.delta = deltaX < 0 ? Math.abs(deltaX) : -Math.abs(deltaX)
            if (!event.touches) {
                event.preventDefault()
            }
        },
        dragEnd(event) {
            const signCheck = 1 * sign(this.delta)
            const results = Math.round(Math.abs(this.delta / this.itemWidth) + 0.15)// Hack
            this.switchTo(this.activeItem + signCheck * results)
            this.dragging = false
            this.delta = 0
            window.removeEventListener(event.touches ? 'touchmove' : 'mousemove', this.dragMove)
            window.removeEventListener(event.touches ? 'touchend' : 'mouseup', this.dragEnd)
        }
    },
    created() {
        this.initConfig()
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.update)
        }
    },
    mounted() {
        this.total = this.data.length - 1
        this.$nextTick(() => {
            this.update()
        })
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.update)
    }
}
</script>
