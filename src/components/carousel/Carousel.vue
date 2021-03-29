<template>
    <div
        class="carousel"
        :class="{'is-overlay': overlay}"
        @mouseenter="checkPause"
        @mouseleave="startTimer">
        <progress
            v-if="progress"
            class="progress"
            :class="progressType"
            :value="activeChild"
            :max="childItems.length - 1">
            {{ childItems.length - 1 }}
        </progress>
        <div
            class="carousel-items"
            @mousedown="dragStart"
            @mouseup="dragEnd"
            @touchstart.stop="dragStart"
            @touchend.stop="dragEnd">
            <slot/>
            <div
                v-if="arrow"
                class="carousel-arrow"
                :class="{'is-hovered': arrowHover}">
                <b-icon
                    v-show="hasPrev"
                    class="has-icons-left"
                    @click.native="prev"
                    :pack="iconPack"
                    :icon="iconPrev"
                    :size="iconSize"
                    both />
                <b-icon
                    v-show="hasNext"
                    class="has-icons-right"
                    @click.native="next"
                    :pack="iconPack"
                    :icon="iconNext"
                    :size="iconSize"
                    both />
            </div>
        </div>
        <div
            v-if="autoplay && pauseHover && pauseInfo && isPause"
            class="carousel-pause">
            <span
                class="tag"
                :class="pauseInfoType">
                {{ pauseText }}
            </span>
        </div>
        <template v-if="withCarouselList && !indicator">
            <slot
                :active="activeChild"
                :switch="changeActive"
                name="list"/>
        </template>
        <div
            v-if="indicator"
            class="carousel-indicator"
            :class="indicatorClasses">
            <a
                v-for="(item, index) in sortedItems"
                class="indicator-item"
                :class="{'is-active': item.isActive}"
                @mouseover="modeChange('hover', index)"
                @click="modeChange('click', index)"
                :key="item._uid">
                <slot
                    :i="index"
                    name="indicators">
                    <span class="indicator-style" :class="indicatorStyle"/>
                </slot>
            </a>
        </div>
        <template v-if="overlay">
            <slot name="overlay"/>
        </template>
    </div>
</template>

<script>
import config from '../../utils/config'

import Icon from '../icon/Icon'
import {default as ProviderParentMixin, Sorted} from '../../utils/ProviderParentMixin'
import {mod, bound} from '../../utils/helpers'

export default {
    name: 'BCarousel',
    components: {
        [Icon.name]: Icon
    },
    mixins: [ProviderParentMixin('carousel', Sorted)],
    props: {
        value: {
            type: Number,
            default: 0
        },
        animated: {
            type: String,
            default: 'slide'
        },
        interval: Number,
        hasDrag: {
            type: Boolean,
            default: true
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        pauseHover: {
            type: Boolean,
            default: true
        },
        pauseInfo: {
            type: Boolean,
            default: true
        },
        pauseInfoType: {
            type: String,
            default: 'is-white'
        },
        pauseText: {
            type: String,
            default: 'Pause'
        },
        arrow: {
            type: Boolean,
            default: true
        },
        arrowHover: {
            type: Boolean,
            default: true
        },
        repeat: {
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
        indicator: {
            type: Boolean,
            default: true
        },
        indicatorBackground: Boolean,
        indicatorCustom: Boolean,
        indicatorCustomSize: {
            type: String,
            default: 'is-small'
        },
        indicatorInside: {
            type: Boolean,
            default: true
        },
        indicatorMode: {
            type: String,
            default: 'click'
        },
        indicatorPosition: {
            type: String,
            default: 'is-bottom'
        },
        indicatorStyle: {
            type: String,
            default: 'is-dots'
        },
        overlay: Boolean,
        progress: Boolean,
        progressType: {
            type: String,
            default: 'is-primary'
        },
        withCarouselList: Boolean
    },
    data() {
        return {
            transition: 'next',
            activeChild: this.value || 0,
            isPause: false,
            dragX: false,
            timer: null
        }
    },
    computed: {
        indicatorClasses() {
            return [
                {
                    'has-background': this.indicatorBackground,
                    'has-custom': this.indicatorCustom,
                    'is-inside': this.indicatorInside
                },
                this.indicatorCustom && this.indicatorCustomSize,
                this.indicatorInside && this.indicatorPosition
            ]
        },

        // checking arrows
        hasPrev() {
            return this.repeat || this.activeChild !== 0
        },
        hasNext() {
            return this.repeat || this.activeChild < this.childItems.length - 1
        }
    },
    watch: {
        /**
         * When v-model is changed set the new active item.
         */
        value(value) {
            this.changeActive(value)
        },
        /**
         * When carousel-items are updated, set active one.
         */
        sortedItems(items) {
            if (this.activeChild >= items.length && this.activeChild > 0) {
                this.changeActive(this.activeChild - 1)
            }
        },
        /**
         *  When autoplay is changed, start or pause timer accordingly
         */
        autoplay(status) {
            status ? this.startTimer() : this.pauseTimer()
        },
        /**
         *  Since the timer can get paused at the end, if repeat is changed we need to restart it
         */
        repeat(status) {
            if (status) { this.startTimer() }
        }
    },

    methods: {
        startTimer() {
            if (!this.autoplay || this.timer) return
            this.isPause = false
            this.timer = setInterval(() => {
                if (!this.repeat && this.activeChild >= this.childItems.length - 1) {
                    this.pauseTimer()
                } else {
                    this.next()
                }
            }, (this.interval || config.defaultCarouselInterval))
        },
        pauseTimer() {
            this.isPause = true
            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }
        },
        restartTimer() {
            this.pauseTimer()
            this.startTimer()
        },
        checkPause() {
            if (this.pauseHover && this.autoplay) {
                this.pauseTimer()
            }
        },
        /**
         * Change the active item and emit change event.
         * action only for animated slide, there true = next, false = prev
         */
        changeActive(newIndex, direction = 0) {
            if (this.activeChild === newIndex || isNaN(newIndex)) return

            direction = direction || (newIndex - this.activeChild)

            newIndex = this.repeat ? mod(newIndex, this.childItems.length)
                : bound(newIndex, 0, this.childItems.length - 1)

            this.transition = direction > 0 ? 'prev' : 'next'
            // Transition names are reversed from the actual direction for correct effect

            this.activeChild = newIndex
            if (newIndex !== this.value) {
                this.$emit('input', newIndex)
            }
            this.restartTimer()
            this.$emit('change', newIndex) // BC
        },
        // Indicator trigger when change active item.
        modeChange(trigger, value) {
            if (this.indicatorMode === trigger) {
                return this.changeActive(value)
            }
        },
        prev() {
            this.changeActive(this.activeChild - 1, -1)
        },
        next() {
            this.changeActive(this.activeChild + 1, 1)
        },
        // handle drag event
        dragStart(event) {
            if (!this.hasDrag ||
                !event.target.draggable) return
            this.dragX = event.touches ? event.changedTouches[0].pageX : event.pageX
            if (event.touches) {
                this.pauseTimer()
            } else {
                event.preventDefault()
            }
        },
        dragEnd(event) {
            if (this.dragX === false) return
            const detected = event.touches ? event.changedTouches[0].pageX : event.pageX
            const diffX = detected - this.dragX
            if (Math.abs(diffX) > 30) {
                if (diffX < 0) {
                    this.next()
                } else {
                    this.prev()
                }
            } else {
                event.target.click()
                this.sortedItems[this.activeChild].$emit('click')
                this.$emit('click')
            }
            if (event.touches) {
                this.startTimer()
            }
            this.dragX = false
        }
    },
    mounted() {
        this.startTimer()
    },
    beforeDestroy() {
        this.pauseTimer()
    }
}
</script>
