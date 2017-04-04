<template>
    <p class="control is-clearfix" :class="[iconPosition, { 'has-icon': hasIcon, 'is-expanded': expanded, 'is-loading': loading }]">
        <input
            v-if="type !== 'textarea'"
            class="input"
            ref="input"
            :class="statusType"
            :type="newType"
            :name="name"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :maxlength="maxlength"
            :minlength="minlength"
            :autocomplete="autoComplete"
            :required="required"
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
            :required="required"
            :maxlength="maxlength"
            :minlength="minlength"
            :value="newValue"
            @input="input">
        </textarea>

        <slot></slot>

        <b-icon
            v-if="passwordReveal"
            class="is-primary is-clickable is-right"
            :icon="passwordVisibleIcon"
            both
            @click.native="togglePasswordVisibility">
        </b-icon>

        <b-icon
            v-if="hasIconRight"
            :class="[statusType, 'is-right']"
            :icon="statusTypeIcon"
            both
            @click.native="togglePasswordVisibility">
        </b-icon>

        <small class="help counter" :class="{ 'has-message': hasMessage }" v-if="maxlength">{{ characteresCount }} / {{ maxlength }}</small>
    </p>
</template>

<script>
    import Vue from 'vue'
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
            size: String,
            expanded: Boolean,
            passwordReveal: Boolean,
            loading: Boolean,

            // Native options
            autoComplete: {
                type: String,
                default: 'off'
            },
            required: Boolean,
            disabled: Boolean,
            max: [Number, String],
            maxlength: [Number, String],
            min: [Number, String],
            minlength: [Number, String],
            name: String,
            pattern: String,
            placeholder: String,
            readonly: Boolean,
            step: [Number, String]
        },
        data() {
            return {
                newValue: this.value,
                newType: this.type,
                isPasswordVisible: false
            }
        },
        computed: {
            hasIcon() {
                return this.hasIconLeft || this.hasIconRight
            },
            hasIconLeft() {
                return this.$slots.default !== undefined && this.$slots.default.length > 0
            },
            hasIconRight() {
                return this.passwordReveal || this.loading || this.statusType
            },
            iconPosition() {
                if (this.hasIconLeft && this.hasIconRight) {
                    return 'has-both-icon'
                } else if (!this.hasIconLeft && this.hasIconRight) {
                    return 'has-icon-right'
                }
            },
            statusType() {
                if (this.$parent.isField) {
                    return this.$parent.type
                }
            },
            statusTypeIcon() {
                switch (this.statusType) {
                    case 'is-success': return 'done'
                    case 'is-danger': return 'error'
                    case 'is-info': return 'info'
                    case 'is-warning': return 'warning'
                }
            },
            hasMessage() {
                return this.$parent.isField && this.$parent.message
            },
            characteresCount() {
                return this.newValue ? this.newValue.length : 0
            },
            passwordVisibleIcon() {
                return !this.isPasswordVisible ? 'visibility' : 'visibility_off'
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
                this.newValue = val
                this.$emit('input', val)
            },
            togglePasswordVisibility() {
                this.isPasswordVisible = !this.isPasswordVisible
                this.newType = this.isPasswordVisible ? 'text' : 'password'

                Vue.nextTick(() => {
                    this.$refs.input.focus()
                })
            }
        }
    }
</script>
