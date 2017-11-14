<template>
    <label class="upload control">
        <template v-if="!dragDrop">
            <slot></slot>
        </template>

        <div v-else
            class="upload-draggable"
            :class="[type, {
                'is-loading': loading,
                'is-disabled': disabled,
                'is-hovered': dragDropFocus
            }]"
            @dragover.prevent="updateDragDropFocus(true)"
            @dragleave.prevent="updateDragDropFocus(false)"
            @dragenter.prevent="updateDragDropFocus(true)"
            @drop.prevent="onFileChange">
            <slot></slot>
        </div>

        <input ref="input"
            type="file"
            v-bind="$attrs"
            :multiple="multiple"
            :disabled="disabled"
            @click="upload"
            @change="onFileChange">
    </label>
</template>

<script>
    import FormElementMixin from '../../utils/FormElementMixin'

    export default {
        name: 'bUpload',
        inheritAttrs: false,
        mixins: [FormElementMixin],
        props: {
            value: {
                type: Array,
                default: () => []
            },
            multiple: Boolean,
            disabled: Boolean,
            dragDrop: Boolean,
            type: {
                type: String,
                default: 'is-primary'
            }
        },
        data() {
            return {
                newValue: this.value || [],
                dragDropFocus: false,
                _elementRef: 'input'
            }
        },
        watch: {
            /**
             * When v-model is changed:
             *   1. Set internal value.
             *   2. If it's invalid, validate again.
             */
            value(value) {
                this.newValue = value
                !this.isValid && !this.dragDrop && this.checkHtml5Validity()
            }
        },
        methods: {

            /**
             * Reset input value
             */
            upload() {
                if (!this.disabled && !this.loading) {
                    this.$refs.input.value = null
                }
            },

            /**
             * Listen change event on input type 'file',
             * emit 'input' event and validate
             */
            onFileChange(event) {
                if (!this.disabled && !this.loading) {
                    if (this.dragDrop) {
                        this.updateDragDropFocus(false)
                    }
                    const value = event.target.files || event.dataTransfer.files
                    if (value && value.length) {
                        if (!this.multiple) {
                            // only one element in case drag drop mode and isn't multiple
                            if (this.dragDrop) {
                                if (value.length === 1) {
                                    this.newValue = []
                                } else {
                                    return false
                                }
                            } else {
                                this.newValue = []
                            }
                        }
                        for (let i = 0; i < value.length; i++) {
                            this.newValue.push(value[i])
                        }
                    }
                    this.$emit('input', this.newValue)
                    !this.dragDrop && this.checkHtml5Validity()
                }
            },

            /**
             * Listen drag-drop to update internal variable
             */
            updateDragDropFocus(focus) {
                if (!this.disabled && !this.loading) {
                    this.dragDropFocus = focus
                }
            }
        }
    }
</script>
