<template>
    <div class="control"
        :class="{ 'is-expanded': expanded, 'has-icons-left': icon }">
        <span class="select"
            :class="[size, statusType, {
                'is-fullwidth': expanded,
                'is-loading': loading,
                'is-empty': selected === null
            }]">

            <select v-model="selected"
                ref="select"
                :disabled="disabled"
                :readonly="readonly"
                :name="name"
                :required="required"
                @focus="$emit('focus', $event)"
                @blur="blur">

                <option
                    v-if="placeholder"
                    :value="null"
                    selected
                    disabled
                    hidden>
                    {{ placeholder }}
                </option>
                <slot></slot>

            </select>
        </span>

        <b-icon v-if="icon"
            class="is-left"
            :icon="icon"
            :pack="iconPack"
            :size="size">
        </b-icon>
    </div>
</template>

<script>
    import FormElementMixin from '../../utils/FormElementMixin'

    export default {
        name: 'bSelect',
        mixins: [FormElementMixin],
        props: {
            value: {
                type: [String, Number, Boolean, Object, Array, Symbol, Function],
                default: null
            }
        },
        data() {
            return {
                selected: this.value,
                _elementRef: 'select'
            }
        },
        watch: {
            /**
             * When v-model is changed:
             *   1. Set the selected option.
             *   2. If it's invalid, validate again.
             */
            value(value) {
                this.selected = value
                !this.isValid && this.checkHtml5Validity()
            },

            /**
             * When selected:
             *   1. Emit input event to update the user v-model.
             *   3. If it's invalid, validate again.
             */
            selected(value) {
                this.$emit('input', value)
                this.$emit('change', value)
                !this.isValid && this.checkHtml5Validity()
            }
        },
        methods: {
            /**
             * Blur listener.
             * Fire the HTML5 validation.
             */
            blur(event) {
                this.$emit('blur', event)
                this.checkHtml5Validity()
            }
        }
    }
</script>
