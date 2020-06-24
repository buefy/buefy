<template>
    <div
        class="carousel-list"
        :class="{'has-shadow': activeItem > 0}"
        @mousedown.stop.prevent="dragStart"
        @touchstart="dragStart">
        <div
            class="carousel-slides"
            :class="listClass"
            :style="'transform:translateX('+translation+'px)'">
            <div
                class="carousel-slide"
                :class="{'is-active': activeItem === index}"
                @click="checkAsIndicator(index, $event)"
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
                            :alt="list.alt"
                            :title="list.title">
                    </figure>
                </slot>
            </div>
        </div>
        <div
            v-if="arrow"
            class="carousel-arrow"
            :class="{'is-hovered': settings.arrowHover}">
            <b-icon
                v-show="hasPrev"
                class="has-icons-left"
                @click.native.prevent="prev"
                :pack="settings.iconPack"
                :icon="settings.iconPrev"
                :size="settings.iconSize"
                both />
            <b-icon
                v-show="hasNext"
                class="has-icons-right"
                @click.native.prevent="next"
                :pack="settings.iconPack"
                :icon="settings.iconNext"
                :size="settings.iconSize"
                both />
        </div>
    </div>
</template>

<script>
import {sign} from '../../utils/helpers'
import config from '../../utils/config'

import Icon from '../icon/Icon'

export default {
    name: 'BCarouselList',
    components: {
        [Icon.name]: Icon
    },
    props: {
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
        refresh: Boolean,
        breakpoints: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            activeItem: this.value,
            delta: 0,
            dragging: false,
            hold: 0,
            windowWidth: 0,
            touch: false
        }
    },
    computed: {
        listClass() {
            return [
                {
                    'has-grayscale': this.settings.hasGrayscale,
                    'has-opacity': this.settings.hasOpacity,
                    'is-dragging': this.dragging
                }
            ]
        },
        itemStyle() {
            return `width: ${this.itemWidth}px;`
        },
        translation() {
            return -Math.max(0, Math.min(
                (this.data.length - this.settings.itemsToShow) * this.itemWidth,
                this.delta + (this.activeItem * this.itemWidth)
            ))
        },
        total() {
            return this.data.length - this.settings.itemsToShow
        },
        hasPrev() {
            return (this.settings.repeat || this.activeItem > 0)
        },
        hasNext() {
            return (this.settings.repeat || this.activeItem < this.total)
        },
        breakpointKeys() {
            return Object.keys(this.breakpoints).sort((a, b) => b - a)
        },
        settings() {
            let breakpoint = this.breakpointKeys.find((breakpoint) => {
                if (this.windowWidth >= breakpoint) {
                    return true
                }
            })
            if (breakpoint) {
                return {...this.$props, ...this.breakpoints[breakpoint]}
            }
            return this.$props
        },
        itemWidth() {
            if (this.windowWidth) { // Ensure component is mounted
                /* eslint-disable-next-line */
                this.asIndicator && this.refresh; // We force the computed property to refresh if this prop is changed

                const rect = this.$el.getBoundingClientRect()
                return rect.width / this.settings.itemsToShow
            }
            return 0
        }
    },
    watch: {
        /**
         * When v-model is changed set the new active item.
         */
        value(value) {
            this.switchTo(value)
        }
    },
    methods: {
        mod(n, mod) {
            return ((n % mod) + mod) % mod // JS modulo bug with negative numbers
        },
        resized() {
            this.windowWidth = window.innerWidth
        },
        switchTo(newIndex) {
            if (newIndex === this.activeItem) { return }

            if (this.settings.repeat) {
                newIndex = this.mod(newIndex, this.total + 1)
            }
            newIndex = Math.min(this.total, Math.max(0, newIndex))
            this.activeItem = newIndex
            if (this.value !== newIndex) {
                this.$emit('input', newIndex)
            }
            this.$emit('switch', newIndex) // BC
        },
        next() {
            this.switchTo(this.activeItem + this.settings.itemsToList)
        },
        prev() {
            this.switchTo(this.activeItem - this.settings.itemsToList)
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
            if (this.dragging || !this.settings.hasDrag || (event.button !== 0 && event.type !== 'touchstart')) return
            this.hold = new Date().getTime()
            this.dragging = true
            this.touch = !!event.touches
            this.dragStartX = this.touch ? event.touches[0].clientX : event.clientX
            window.addEventListener(this.touch ? 'touchmove' : 'mousemove', this.dragMove)
            window.addEventListener(this.touch ? 'touchend' : 'mouseup', this.dragEnd)
        },
        dragMove(event) {
            if (!this.dragging) return
            this.dragEndX = event.touches ? event.touches[0].clientX : event.clientX
            this.delta = this.dragStartX - this.dragEndX
            if (!event.touches) {
                event.preventDefault()
            }
        },
        dragEnd() {
            if (!this.dragging) return
            const signCheck = 1 * sign(this.delta)
            const results = Math.round(Math.abs(this.delta / this.itemWidth) + 0.15)// Hack
            this.switchTo(this.activeItem + signCheck * results)
            this.dragging = false
            this.delta = 0
            window.removeEventListener(this.touch ? 'touchmove' : 'mousemove', this.dragMove)
            window.removeEventListener(this.touch ? 'touchend' : 'mouseup', this.dragEnd)
        }
    },
    mounted() {
        window.addEventListener('resize', this.resized)
        this.resized()
        if (this.$attrs.config) {
            throw new Error('The config prop was removed, you need to use v-bind instead')
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resized)
        this.dragEnd()
    }
}
</script>
