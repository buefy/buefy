<template>
    <div
        class="rate"
        :class="{ 'is-disabled': disabled, 'is-spaced': spaced, 'is-rtl': rtl }"
    >
        <div
            v-for="(item, index) in max"
            class="rate-item"
            :class="rateClass(item)"
            :key="index"
            @mousemove="previewRate(item, $event)"
            @mouseleave="resetNewValue"
            @click.prevent="confirmValue(item)"
        >
            <b-icon
                :pack="iconPack"
                :icon="icon"
                :size="size"
            />
            <b-icon
                v-if="checkHalf(item)"
                class="is-half"
                :pack="iconPack"
                :icon="icon"
                :size="size"
                :style="halfStyle"
            />
        </div>
        <div
            class="rate-text"
            :class="size"
            v-if="showText || showScore || customText"
        >
            <span>{{ showMe }}</span>
            <span v-if="customText && !showText">{{ customText }}</span>
        </div>
    </div>
</template>

<script>
import config from '../../utils/config'
import Icon from '../icon/Icon'

export default {
    name: 'BRate',
    components: {
        [Icon.name]: Icon
    },
    props: {
        modelValue: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 5
        },
        icon: {
            type: String,
            default: 'star'
        },
        iconPack: String,
        size: String,
        spaced: Boolean,
        rtl: Boolean,
        disabled: Boolean,
        showScore: Boolean,
        showText: Boolean,
        customText: String,
        texts: Array,
        locale: {
            type: [String, Array],
            default: () => {
                return config.defaultLocale
            }
        }
    },
    emits: ['change', 'update:modelValue'],
    data() {
        return {
            newValue: this.modelValue,
            hoverValue: 0
        }
    },
    computed: {
        halfStyle() {
            return `width:${this.valueDecimal}%`
        },
        showMe() {
            let result = ''
            if (this.showScore) {
                result = this.disabled ? this.modelValue : this.newValue
                if (result === 0) {
                    result = ''
                } else {
                    result = new Intl.NumberFormat(this.locale).format(this.modelValue)
                }
            } else if (this.showText) {
                result = this.texts[Math.ceil(this.newValue) - 1]
            }
            return result
        },
        valueDecimal() {
            return this.modelValue * 100 - Math.floor(this.modelValue) * 100
        }
    },
    watch: {
        // When v-model is changed set the new value.
        modelValue(value) {
            this.newValue = value
        }
    },
    methods: {
        resetNewValue() {
            if (this.disabled) return
            this.hoverValue = 0
        },
        previewRate(index, event) {
            if (this.disabled) return
            this.hoverValue = index
            event.stopPropagation()
        },
        confirmValue(index) {
            if (this.disabled) return
            this.newValue = index
            this.$emit('change', this.newValue)
            this.$emit('update:modelValue', this.newValue)
        },
        checkHalf(index) {
            const showWhenDisabled = this.disabled && this.valueDecimal > 0 &&
            index - 1 < this.modelValue && index > this.modelValue
            return showWhenDisabled
        },
        rateClass(index) {
            let output = ''
            const currentValue = this.hoverValue !== 0 ? this.hoverValue : this.newValue
            if (index <= currentValue) {
                output = 'set-on'
            } else if (this.disabled && (Math.ceil(this.modelValue) === index)) {
                output = 'set-half'
            }
            return output
        }
    }
}
</script>
