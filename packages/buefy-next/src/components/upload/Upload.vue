<template>
    <label
        class="upload control"
        v-bind="rootAttrs"
        :class="[{'is-expanded' : expanded, 'is-rounded' : rounded}]"
    >
        <template v-if="!dragDrop">
            <slot />
        </template>

        <div
            v-else
            class="upload-draggable"
            :class="[type, {
                'is-loading': loading,
                'is-disabled': disabled,
                'is-hovered': dragDropFocus,
                'is-expanded': expanded,
            }]"
            @dragover.prevent="updateDragDropFocus(true)"
            @dragleave.prevent="updateDragDropFocus(false)"
            @dragenter.prevent="updateDragDropFocus(true)"
            @drop.prevent="onFileChange"
        >
            <slot />
        </div>

        <input
            ref="input"
            type="file"
            v-bind="fallthroughAttrs"
            :multiple="multiple"
            :accept="accept"
            :disabled="disabledOrUndefined"
            @change="onFileChange"
        >
    </label>
</template>

<script>
import CompatFallthroughMixin from '../../utils/CompatFallthroughMixin'
import FormElementMixin from '../../utils/FormElementMixin'
import { File } from '../../utils/ssr'

export default {
    name: 'BUpload',
    mixins: [CompatFallthroughMixin, FormElementMixin],
    props: {
        modelValue: {
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
        },
        expanded: {
            type: Boolean,
            default: false
        },
        rounded: {
            type: Boolean,
            default: false
        }
    },
    emits: ['invalid', 'update:modelValue'],
    data() {
        return {
            newValue: this.modelValue,
            dragDropFocus: false,
            _elementRef: 'input'
        }
    },
    computed: {
        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it,
            // `true` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    watch: {
        /**
         *   When v-model is changed:
         *   1. Set internal value.
         *   2. Reset internal input file value
         *   3. If it's invalid, validate again.
         */
        modelValue(value) {
            this.newValue = value
            if (!value || (Array.isArray(value) && value.length === 0)) {
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
            if (this.dragDrop) this.updateDragDropFocus(false)
            const value = event.target.files || event.dataTransfer.files
            if (value.length === 0) {
                if (!this.newValue) return
                if (this.native) this.newValue = null
            } else if (!this.multiple) {
                // only one element in case drag drop mode and isn't multiple
                if (this.dragDrop && value.length !== 1) return
                else {
                    const file = value[0]
                    if (this.checkType(file)) this.newValue = file
                    else if (this.newValue) {
                        this.newValue = null
                        this.clearInput()
                    } else {
                        // Force input back to empty state and recheck validity
                        this.clearInput()
                        this.checkHtml5Validity()
                        return
                    }
                }
            } else {
                // always new values if native or undefined local
                let newValues = false
                if (this.native || !this.newValue) {
                    this.newValue = []
                    newValues = true
                }
                for (let i = 0; i < value.length; i++) {
                    const file = value[i]
                    if (this.checkType(file)) {
                        this.newValue.push(file)
                        newValues = true
                    }
                }
                if (!newValues) return
            }
            this.$emit('update:modelValue', this.newValue)
            !this.dragDrop && this.checkHtml5Validity()
        },

        /*
        * Reset file input value
        */
        clearInput() {
            this.$refs.input.value = null
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
                        const extension = file.name.toLowerCase().slice(-type.length)
                        if (extension === type.toLowerCase()) {
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
            if (!valid) this.$emit('invalid')
            return valid
        }
    }
}
</script>
