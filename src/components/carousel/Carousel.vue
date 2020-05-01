<template>
    <div
        class="carousel"
        :class="{'is-overlay': overlay}"
        @mouseenter="pauseTimer"
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
            <slot />
            <div
                v-if="arrow"
                class="carousel-arrow"
                :class="{'is-hovered': arrowHover}">
                <b-icon
                    v-if="checkArrow(0)"
                    class="has-icons-left"
                    @click.native.prevent="prev"
                    :pack="iconPack"
                    :icon="iconPrev"
                    :size="iconSize"
                    both />
                <b-icon
                    v-if="checkArrow(childItems.length - 1)"
                    class="has-icons-right"
                    @click.native.prevent="next"
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
                v-for="(item, index) in childItems"
                class="indicator-item"
                :class="{'is-active': index === activeChild}"
                @mouseover="modeChange('hover', index)"
                @click="modeChange('click', index)"
                :key="index">
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

export default {
    name: 'BCarousel',
    components: {
        [Icon.name]: Icon
    },
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
        arrowBoth: {
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
            _isCarousel: true,
            activeChild: this.value || 0,
            defaultSlots: [],
            isPause: false,
            dragX: 0,
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
        childItems() {
            return this.defaultSlots
                .filter((vnode) =>
                    vnode.componentInstance &&
                    vnode.componentInstance.$data &&
                    vnode.componentInstance.$data._isCarouselItem)
                .map((vnode) => vnode.componentInstance)
        }
    },
    watch: {
        /**
         * When v-model is changed set the new active item.
         */
        value(value) {
            if (value < this.activeChild) {
                this.changeActive(value)
            } else {
                this.changeActive(value, false)
            }
        },
        /**
         * When carousel-items are updated, set active one.
         */
        childItems() {
            if (this.activeChild < this.childItems.length) {
                let previous = this.activeChild
                this.childItems.map((child, idx) => {
                    if (child.isActive) {
                        previous = idx
                        if (previous < this.childItems.length) {
                            this.childItems[previous].isActive = false
                        }
                    }
                })
                this.childItems[this.activeChild].isActive = true
            } else if (this.activeChild > 0) {
                this.changeActive(this.activeChild - 1)
            }
        },
        /**
         *  When autoplay is change, set by status
         */
        autoplay(status) {
            status ? this.startTimer() : this.pauseTimer()
        }
    },
    methods: {
        refreshSlots() {
            this.defaultSlots = this.$slots.default || []
        },

        startTimer() {
            if (!this.autoplay || this.timer) return
            this.isPause = false
            this.timer = setInterval(() => {
                if (!this.repeat && this.activeChild === this.childItems.length - 1) {
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
        checkPause() {
            if (this.pauseHover && this.autoplay) {
                return this.pauseTimer()
            }
        },
        /**
         * Change the active item and emit change event.
         * action only for animated slide, there true = next, false = prev
         */
        changeActive(newIndex, action = true) {
            if (this.activeChild === newIndex) return

            if (newIndex > this.childItems.length) throw new Error('The index you trying to set is bigger than the childs length')

            if (this.activeChild < this.childItems.length) {
                this.childItems[this.activeChild].status(false, action)
            }
            this.childItems[newIndex].status(true, action)
            this.activeChild = newIndex
            this.$emit('change', newIndex)
        },
        // Indicator trigger when change active item.
        modeChange(trigger, value) {
            if (this.indicatorMode === trigger) {
                this.$emit('input', value)
                return value < this.activeChild
                    ? this.changeActive(value)
                    : this.changeActive(value, false)
            }
        },
        prev() {
            if (this.activeChild === 0) {
                if (this.repeat) this.changeActive(this.childItems.length - 1)
            } else {
                this.changeActive(this.activeChild - 1)
            }
        },
        next() {
            if (this.activeChild === this.childItems.length - 1) {
                if (this.repeat) this.changeActive(0, false)
            } else {
                this.changeActive(this.activeChild + 1, false)
            }
        },
        // checking arrow between both
        checkArrow(value) {
            if (this.arrowBoth) return true
            if (this.activeChild !== value) return true
        },
        // handle drag event
        dragStart(event) {
            if (!this.hasDrag) return
            this.dragx = event.touches ? event.changedTouches[0].pageX : event.pageX
            if (event.touches) {
                this.pauseTimer()
            } else {
                event.preventDefault()
            }
        },
        dragEnd(event) {
            if (!this.hasDrag) return
            const detected = event.touches ? event.changedTouches[0].pageX : event.pageX
            const diffX = detected - this.dragx
            if (Math.abs(diffX) > 50) {
                if (diffX < 0) {
                    this.next()
                } else {
                    this.prev()
                }
            }
            if (event.touches) {
                this.startTimer()
            }
        }
    },
    mounted() {
        if (this.activeChild < this.childItems.length) {
            this.childItems[this.activeChild].isActive = true
        }
        this.refreshSlots()
        this.startTimer()
    },
    beforeDestroy() {
        this.pauseTimer()
    }
}
</script>
