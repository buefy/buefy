<template>
    <label class="upload control">
        <template v-if="!dragDrop">
            <slot/>
        </template>

        <div
            v-else
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
            <slot/>
        </div>

        <input
            ref="input"
            type="file"
            v-bind="$attrs"
            :multiple="multiple"
            :accept="accept"
            :disabled="disabled"
            @change="onFileChange">
    </label>
</template>

<script>
    import FormElementMixin from '../../utils/FormElementMixin'
    import { File } from '../../utils/ssr'

    export default {
        name: 'BUpload',
        mixins: [FormElementMixin],
        inheritAttrs: false,
        props: {
            value: {
                type: [Object, Function, File, Array]
            },
            multiple: Boolean,
            disabled: Boolean,
            accept: String,
            dragDrop: Boolean,
            type: {
                type: String,
                default: 'is-primary'
            },
            native: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                newValue: this.value,
                dragDropFocus: false,
                _elementRef: 'input'
            }
        },
        watch: {
            /**
             * When v-model is changed:
             *   1. Set internal value.
             *   2. Reset input value if array is empty
             *   3. If it's invalid, validate again.
             */
            value(value) {
                this.newValue = value
                if (!this.newValue ||
                    (Array.isArray(this.newValue) && this.newValue.length === 0)) {
                    this.$refs.input.value = null
                }
                !this.isValid && !this.dragDrop && this.checkHtml5Validity()
            }
        },
        methods: {

            /**
             * Listen change event on input type 'file',
             * emit 'input' event and validate
             */
            onFileChange(event) {
                if (this.disabled || this.loading) return
                if (this.dragDrop) {
                    this.updateDragDropFocus(false)
                }
                const value = event.target.files || event.dataTransfer.files
                if (value) {
                    if (value.length === 0) {
                        this.newValue = null
                    } else if (!this.multiple) {
                        // only one element in case drag drop mode and isn't multiple
                        if (this.dragDrop && value.length !== 1) return false
                        else {
                            const file = value[0]
                            if (this.checkType(file)) {
                                this.newValue = file
                            }
                        }
                    } else {
                        // always new values if native or undefined local
                        if (this.native || !this.newValue) {
                            this.newValue = []
                        }
                        for (let i = 0; i < value.length; i++) {
                            const file = value[i]
                            if (this.checkType(file)) {
                                this.newValue.push(file)
                            }
                        }
                    }
                }
                this.$emit('input', this.newValue)
                !this.dragDrop && this.checkHtml5Validity()
            },

            /**
             * Listen drag-drop to update internal variable
             */
            updateDragDropFocus(focus) {
                if (!this.disabled && !this.loading) {
                    this.dragDropFocus = focus
                }
            },

            /**
             * Check mime type of file
             */
            checkType(file) {
                if (!this.accept) return true
                const types = this.accept.split(',')
                if (types.length === 0) return true
                let valid = false
                for (let i = 0; i < types.length && !valid; i++) {
                    const type = types[i].trim()
                    if (type) {
                        if (type.substring(0, 1) === '.') {
                            // check extension
                            const extIndex = file.name.lastIndexOf('.')
                            if (extIndex >= 0 && file.name.substring(extIndex) === type) {
                                valid = true
                            }
                        } else {
                            // check mime type
                            if (file.type.match(type)) {
                                valid = true
                            }
                        }
                    }
                }
                return valid
            }
        }
    }
</script>
