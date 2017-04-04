<template>
    <div class="field">
        <label class="label" v-if="label">{{ label }}</label>
        <p class="control" :class="[iconPosition, { 'has-icon': hasIcon }]">
            <input
                v-if="type !== 'textarea'"
                class="input"
                :class="statusType"
                :type="type"
                :name="name"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="readonly"
                :maxlength="maxlength"
                :minlength="minlength"
                :autocomplete="autoComplete"
                :autofocus="autofocus"
                :min="min"
                :max="max"
                :step="step"
                :pattern="pattern"
                :value="newValue"
                @input="input">

            <textarea
                v-else
                class="textarea"
                :name="name"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="readonly"
                :autofocus="autofocus"
                :maxlength="maxlength"
                :minlength="minlength"
                :value="newValue">
            </textarea>

            <slot></slot>
        </p>
        <p class="help" :class="statusType" v-if="statusMessage">{{ statusMessage }}</p>
    </div>
</template>

<script>
    import Icon from '../icon'

    export default {
        name: 'bInput',
        components: {
            [Icon.name]: Icon
        },
        props: {
            value: [Number, String],
            type: {
                type: String,
                default: 'text'
            },
            statusType: String,
            statusMessage: String,
            size: String,
            hasIconRight: Boolean,
            label: String,

            // Native options
            autoComplete: {
                type: String,
                default: 'off'
            },
            autofocus: Boolean,
            disabled: Boolean,
            max: Number,
            maxlength: Number,
            min: Number,
            minlength: Number,
            name: String,
            pattern: String,
            placeholder: String,
            readonly: Boolean,
            step: Number
        },
        data() {
            return {
                newValue: this.value
            }
        },
        computed: {
            iconPosition() {
                if (this.hasIconRight) {
                    return 'has-icon-right'
                } else {
                    return 'has-icon-left'
                }
            },
            hasIcon() {
                return this.$slots.default !== undefined && this.$slots.default.length > 0
            }
        },
        watch: {
            value(val) {
                this.newValue = val
            },
            newValue(val) {
                this.$emit('change', val)
            }
        },
        methods: {
            input(event) {
                const val = event.target.value
                this.$emit('input', val)
            }
        }
    }
</script>
