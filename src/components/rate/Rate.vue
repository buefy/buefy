<template>
    <div class="rate" :class="[size, { 'is-disabled': disabled }]">
        <ul
            class="rate-list"
            @mouseleave="resetNewValue">
            <li
                v-for="(rate, index) in max"
                class="rate-item"
                :class="rateClass(rate)"
                :key="index">
                <i
                    class="rate-icon"
                    :class="icon"
                    @mousemove="previewRate(rate, $event)"
                    @click.prevent="confirmValue(rate)">
                    <span
                        v-if="checkHalf(rate)"
                        class="rate-new"
                        :class="icon"
                        :style="halfStyle"/>
                </i>
            </li>
        </ul>
        <div class="rate-text" v-if="showText || showScore || disabled || customText">
            <span>{{ showMe }}</span>
            <span v-if="customText && !showText">{{ customText }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BRate',
    props: {
        value: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 5
        },
        icon: {
            type: String,
            default: 'fas fa-star'
        },
        size: String,
        disabled: Boolean,
        showScore: Boolean,
        showText: Boolean,
        customText: String,
        texts: {
            type: Array,
            default() {
                return ['Very Bad', 'Bad', 'Good', 'Very Good', 'Awesome']
            }
        }
    },
    data() {
        return {
            newValue: this.value,
            hoverRate: -1
        }
    },
    computed: {
        halfStyle() {
            return `width:${this.valueDecimal}%`
        },
        showMe() {
            let result = ''
            if (this.showScore || this.disabled) {
                result = this.disabled ? this.value : this.newValue
                if (result === 0) {
                    result = ''
                }
            } else if (this.showText) {
                result = this.texts[Math.ceil(this.newValue) - 1]
            }
            return result
        },
        valueDecimal() {
            return this.value * 100 - Math.floor(this.value) * 100
        }
    },
    watch: {
        // When v-model is changed set the new value.
        value(value) {
            this.newValue = value
        }
    },
    methods: {
        resetNewValue() {
            if (this.disabled) return
            this.hoverRate = -1
        },
        previewRate(rate, event) {
            if (this.disabled) return
            // emit hover-change event for preview
            if (rate !== this.hoverRate) {
                this.$emit('on-hover-change', rate)
            }
            this.hoverRate = rate
        },
        confirmValue(rate) {
            if (this.disabled) return
            this.newValue = rate
            this.$emit('change', this.newValue)
            this.$emit('input', this.newValue)
        },
        checkHalf(rate) {
            let showWhenDisabled = this.disabled && this.valueDecimal > 0 &&
            rate - 1 < this.value && rate > this.value
            return showWhenDisabled
        },
        rateClass(rate) {
            const onRate = 'set-on'
            const halfRate = 'set-half'
            const checkHover = this.hoverRate !== -1
            const currentIndex = checkHover ? this.hoverRate : this.newValue
            const lastItemIndex = Math.ceil(currentIndex)
            return {
                [onRate]: this.disabled ? rate < lastItemIndex : rate <= lastItemIndex,
                [halfRate]: (rate === lastItemIndex) && this.disabled
            }
        }
    }
}
</script>
