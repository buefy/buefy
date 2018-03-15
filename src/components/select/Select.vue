<template>
    <div
        class="control"
        :class="{ 'is-expanded': expanded, 'has-icons-left': icon }">
        <span class="select" :class="spanClasses">

            <select
                v-model="selected"
                ref="select"
                :multiple="multiple"
                :size="nativeSize"
                v-bind="$attrs"
                @blur="$emit('blur', $event) && checkHtml5Validity()"
                @focus="$emit('focus', $event)">

                <option
                    v-if="placeholder"
                    :value="null"
                    selected
                    disabled
                    hidden>
                    {{ placeholder }}
                </option>
                <slot/>

            </select>
        </span>

        <b-icon
            v-if="icon"
            class="is-left"
            :icon="icon"
            :pack="iconPack"
            :size="iconSize"/>
    </div>
</template>

<script>
    import FormElementMixin from '../../utils/FormElementMixin'

    export default {
        name: 'BSelect',
        mixins: [FormElementMixin],
        inheritAttrs: false,
        props: {
            value: {
                type: [String, Number, Boolean, Object, Array, Symbol, Function],
                default: null
            },
            placeholder: String,
            multiple: Boolean,
            nativeSize: [String, Number]
        },
        data() {
            return {
                _isSelect: true,
                _elementRef: 'select'
            }
        },
        computed: {
            selected: {
                get() {
                    this.$nextTick(() => {
                        !this.isValid && this.checkHtml5Validity()
                    })
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                    !this.isValid && this.checkHtml5Validity()
                }
            },
            spanClasses() {
                return [this.size, this.statusType, {
                    'is-fullwidth': this.expanded,
                    'is-loading': this.loading,
                    'is-multiple': this.multiple,
                    'is-rounded': this.rounded,
                    'is-empty': this.selected === null
                }]
            }
        }
    }
</script>
