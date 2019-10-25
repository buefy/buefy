<template>
    <div
        class="carousel"
        @mouseenter="pauseTimer"
        @mouseleave="startTimer">
        <div class="carousel-list">
            <slot />
            <div
                v-if="arrow"
                class="carousel-arrow"
                :class="{'is-hovered': arrowHover}">
                <b-icon
                    v-if="checkArrow(0)"
                    class="is-left"
                    @click.native="prev"
                    :pack="iconPack"
                    :icon="IconPrev"
                    :size="iconSize"
                    both />
                <b-icon
                    v-if="checkArrow(items.length - 1)"
                    class="is-right"
                    @click.native="next"
                    :pack="iconPack"
                    :icon="IconNext"
                    :size="iconSize"
                    both />
            </div>
        </div>
        <div
            v-if="pauseHover && pauseInfo && isPause"
            class="carousel-pause is-unselectable">
            <span class="tag">Pause</span>
        </div>
        <div
            v-if="indicator"
            class="carousel-indicator"
            :class="{'is-inside': indicatorInside}">
            <a
                v-for="(item, index) in items"
                class="indicator-item"
                :class="{'is-active': index === activeItem}"
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
    </div>
</template>

<script>
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
        animate: {
            type: String,
            default: 'slide'
        },
        interval: {
            type: Number,
            default: 3500
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
        iconPack: String,
        iconSize: String,
        IconPrev: {
            type: String,
            default: 'chevron-left'
        },
        IconNext: {
            type: String,
            default: 'chevron-right'
        },
        indicator: {
            type: Boolean,
            default: true
        },
        indicatorInside: {
            type: Boolean,
            default: true
        },
        indicatorMode: {
            type: String,
            default: 'click'
        },
        indicatorStyle: {
            type: String,
            default: 'is-dots'
        }
    },
    data() {
        return {
            _isCarousel: true,
            activeItem: this.value,
            isPause: false,
            items: [],
            timer: null
        }
    },
    watch: {
        /**
        * When v-model is changed set the new active tab.
        */
        value(value) {
            this.changeTab(value)
        },

        /**
        * When tab-items are updated, set active one.
        */
        items() {
            if (this.activeItem < this.items.length) {
                this.items[this.activeItem].isActive = true
            }
        },
        autoplay(status) {
            status ? this.startTimer() : this.pauseTimer()
        }
    },
    methods: {
        /*
        clickTrigger(index, data) {
            this.$emit('click', index, data)
        },
        */
        pauseTimer() {
            if (!this.pauseHover && this.autoplay) return
            this.isPause = true
            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }
        },
        startTimer() {
            if (!this.autoplay || this.interval <= 0 || this.timer) return
            this.isPause = false
            this.timer = setInterval(() => {
                if (this.activeItem === this.items.length - 1) {
                    this.changeTab(0)
                } else {
                    this.changeTab(this.activeItem + 1)
                }
            }, this.interval)
        },
        /**
        * Change the active item and emit change event.
        */
        changeTab(newIndex) {
            if (this.activeItem === newIndex) return

            if (this.activeItem < this.items.length) {
                this.items[this.activeItem].deactivate(this.activeItem, newIndex)
            }
            this.items[newIndex].activate(this.activeItem, newIndex)
            this.activeItem = newIndex
            this.$emit('change', newIndex)
        },

        /**
        * Item click listener, emit input event and change active item.
        */
        itemClick(value) {
            this.$emit('input', value)
            this.changeTab(value)
        },
        modeChange(type, value) {
            if (this.indicatorMode === type) {
                this.$emit('input', value)
                this.changeTab(value)
            }
        },
        prev() {
            return this.activeItem === 0
                ? this.changeTab(this.items.length - 1) : this.changeTab(this.activeItem - 1)
        },
        next() {
            return this.activeItem === this.items.length - 1
                ? this.changeTab(0) : this.changeTab(this.activeItem + 1)
        },
        // checking arrow between both
        checkArrow(value) {
            if (this.arrowBoth) return true
            if (this.activeItem !== value) return true
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
