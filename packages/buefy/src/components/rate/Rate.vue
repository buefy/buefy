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

<script lang="ts">
import { defineComponent } from 'vue'
import type { ExtractComponentProps } from '../../utils/helpers'
import config from '../../utils/config'
import BIcon from '../icon/Icon.vue'

const Rate = defineComponent({
    name: 'BRate',
    components: {
        BIcon
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
        texts: Array<string>,
        locale: {
            type: [String, Array<string>],
            default: () => {
                return config.defaultLocale
            }
        }
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        change: (newValue: number) => true,
        'update:modelValue': (newValue: number) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
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
                result = this.disabled ? this.modelValue.toString() : this.newValue.toString()
                if (Number(result) === 0) {
                    result = ''
                } else {
                    result = new Intl.NumberFormat(this!.locale)
                        .format(this.modelValue)
                }
            } else if (this.showText && this.texts) {
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
        modelValue(value: number) {
            this.newValue = value
        }
    },
    methods: {
        resetNewValue() {
            if (this.disabled) return
            this.hoverValue = 0
        },
        previewRate(index: number, event: { stopPropagation: () => void }) {
            if (this.disabled) return
            this.hoverValue = index
            event.stopPropagation()
        },
        confirmValue(index: number) {
            if (this.disabled) return
            this.newValue = index
            this.$emit('change', this.newValue)
            this.$emit('update:modelValue', this.newValue)
        },
        checkHalf(index: number) {
            const showWhenDisabled = this.disabled && this.valueDecimal > 0 &&
            index - 1 < this.modelValue && index > this.modelValue
            return showWhenDisabled
        },
        rateClass(index: number) {
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
})

export type RateProps = ExtractComponentProps<typeof Rate>

export default Rate
</script>
