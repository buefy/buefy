<template>
    <div class="control" :class="{ 'is-expanded': expanded }">
        <label
            class="b-checkbox checkbox button"
            ref="label"
            :class="[checked ? type : null, size, {
                'is-disabled': disabled,
                'is-focused': isFocused
            }]"
            :disabled="disabled"
            @click="focus"
            @keydown.prevent.enter="$refs.label.click()">
            <slot/>
            <input
                v-model="computedValue"
                type="checkbox"
                ref="input"
                @click.stop
                :disabled="disabled"
                :required="required"
                :name="name"
                :value="nativeValue"
                @focus="isFocused = true"
                @blur="isFocused = false">
        </label>
    </div>
</template>

<script>
export default {
    name: 'BCheckboxButton',
    props: {
        value: [String, Number, Boolean, Function, Object, Array],
        nativeValue: [String, Number, Boolean, Function, Object, Array],
        disabled: Boolean,
        required: Boolean,
        expanded: Boolean,
        name: String,
        size: String,
        type: {
            type: String,
            default: 'is-primary'
        }
    },
    data() {
        return {
            newValue: this.value,
            isFocused: false
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.newValue
            },
            set(value) {
                this.newValue = value
                this.$emit('input', value)
            }
        },
        checked() {
            if (Array.isArray(this.newValue)) {
                return this.newValue.indexOf(this.nativeValue) >= 0
            }
            return this.newValue === this.nativeValue
        }
    },
    watch: {
        /**
         * When v-model change, set internal value.
         */
        value(value) {
            this.newValue = value
        }
    },
    methods: {
        focus() {
            // MacOS FireFox and Safari do not focus when clicked
            this.$refs.input.focus()
        }
    }
}
</script>
