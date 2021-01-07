<template>
    <div
        class="carousel-list"
        :class="{'has-shadow': scrollIndex > 0}"
        @mousedown.prevent="dragStart"
        @touchstart="dragStart">
        <div
            class="carousel-slides"
            :class="listClass"
            :style="'transform:translateX('+translation+'px)'">
            <div
                v-for="(list, index) in data"
                class="carousel-slide"
                :class="{'is-active': asIndicator ? activeItem === index : scrollIndex === index}"
                @mouseup="checkAsIndicator(index, $event)"
                @touchend="checkAsIndicator(index, $event)"
                :key="index"
                :style="itemStyle">
                <slot
                    :index="index"
                    :active="activeItem"
                    :scroll="scrollIndex"
                    v-bind="list"
                    :list="list"
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
import {sign, mod, bound} from '../../utils/helpers'
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
        scrollValue: {
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
        breakpoints: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            activeItem: this.value,
            scrollIndex: this.asIndicator ? this.scrollValue : this.value,
            delta: 0,
            dragX: false,
            hold: 0,
            windowWidth: 0,
            touch: false,
            observer: null,
            refresh_: 0
        }
    },
    computed: {
        dragging() {
            return this.dragX !== false
        },
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
            return -bound(
                this.delta + (this.scrollIndex * this.itemWidth), 0,
                (this.data.length - this.settings.itemsToShow) * this.itemWidth
            )
        },
        total() {
            return this.data.length - this.settings.itemsToShow
        },
        hasPrev() {
            return (this.settings.repeat || this.scrollIndex > 0)
        },
        hasNext() {
            return (this.settings.repeat || this.scrollIndex < this.total)
        },
        breakpointKeys() {
            return Object.keys(this.breakpoints).sort((a, b) => b - a)
        },
        settings() {
            let breakpoint = this.breakpointKeys.filter((breakpoint) => {
                if (this.windowWidth >= breakpoint) {
                    return true
                }
            })[0]
            if (breakpoint) {
                return {...this.$props, ...this.breakpoints[breakpoint]}
            }
            return this.$props
        },
        itemWidth() {
            if (this.windowWidth) { // Ensure component is mounted
                /* eslint-disable-next-line */
                this.refresh_; // We force the computed property to refresh if this prop is changed

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
            this.switchTo(this.asIndicator ? value - (this.itemsToShow - 3) / 2 : value)
            if (this.activeItem !== value) {
                this.activeItem = bound(value, 0, this.data.length - 1)
            }
        },
        scrollValue(value) {
            this.switchTo(value)
        }
    },
    methods: {
        resized() {
            this.windowWidth = window.innerWidth
        },
        switchTo(newIndex) {
            if (newIndex === this.scrollIndex || isNaN(newIndex)) { return }

            if (this.settings.repeat) {
                newIndex = mod(newIndex, this.total + 1)
            }
            newIndex = bound(newIndex, 0, this.total)
            this.scrollIndex = newIndex
            if (!this.asIndicator && this.value !== newIndex) {
                this.$emit('input', newIndex)
            } else if (this.scrollIndex !== newIndex) {
                this.$emit('updated:scroll', newIndex)
            }
        },
        next() {
            this.switchTo(this.scrollIndex + this.settings.itemsToList)
        },
        prev() {
            this.switchTo(this.scrollIndex - this.settings.itemsToList)
        },
        checkAsIndicator(value, event) {
            if (!this.asIndicator) return

            const dragEndX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX
            if (this.hold - Date.now() > 2000 || Math.abs(this.dragX - dragEndX) > 10) return

            this.dragX = false
            this.hold = 0
            event.preventDefault()

            // Make the item appear in the middle
            this.activeItem = value

            this.$emit('switch', value)
        },
        // handle drag event
        dragStart(event) {
            if (this.dragging || !this.settings.hasDrag || (event.button !== 0 && event.type !== 'touchstart')) return
            this.hold = Date.now()
            this.touch = !!event.touches
            this.dragX = this.touch ? event.touches[0].clientX : event.clientX
            window.addEventListener(this.touch ? 'touchmove' : 'mousemove', this.dragMove)
            window.addEventListener(this.touch ? 'touchend' : 'mouseup', this.dragEnd)
        },
        dragMove(event) {
            if (!this.dragging) return
            const dragEndX = event.touches
                ? (event.changedTouches[0] || event.touches[0]).clientX : event.clientX
            this.delta = this.dragX - dragEndX
            if (!event.touches) {
                event.preventDefault()
            }
        },
        dragEnd() {
            if (!this.dragging && !this.hold) return
            if (this.hold) {
                const signCheck = sign(this.delta)
                const results = Math.round(Math.abs(this.delta / this.itemWidth) + 0.15)// Hack
                this.switchTo(this.scrollIndex + signCheck * results)
            }
            this.delta = 0
            this.dragX = false
            window.removeEventListener(this.touch ? 'touchmove' : 'mousemove', this.dragMove)
            window.removeEventListener(this.touch ? 'touchend' : 'mouseup', this.dragEnd)
        },
        refresh() {
            this.$nextTick(() => {
                this.refresh_++
            })
        }
    },
    mounted() {
        if (typeof window !== 'undefined') {
            if (window.ResizeObserver) {
                this.observer = new ResizeObserver(this.refresh)
                this.observer.observe(this.$el)
            }
            window.addEventListener('resize', this.resized)
            document.addEventListener('animationend', this.refresh)
            document.addEventListener('transitionend', this.refresh)
            document.addEventListener('transitionstart', this.refresh)
            this.resized()
        }
        if (this.$attrs.config) {
            throw new Error('The config prop was removed, you need to use v-bind instead')
        }
    },
    beforeDestroy() {
        if (typeof window !== 'undefined') {
            if (window.ResizeObserver) {
                this.observer.disconnect()
            }
            window.removeEventListener('resize', this.resized)
            document.removeEventListener('animationend', this.refresh)
            document.removeEventListener('transitionend', this.refresh)
            document.removeEventListener('transitionstart', this.refresh)
            this.dragEnd()
        }
    }
}
</script>
