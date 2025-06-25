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

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { ExtractComponentProps } from '../../utils/helpers'
import CompatFallthroughMixin from '../../utils/CompatFallthroughMixin'
import FormElementMixin from '../../utils/FormElementMixin'
import { File } from '../../utils/ssr'

const Upload = defineComponent({
    name: 'BUpload',
    mixins: [CompatFallthroughMixin, FormElementMixin],
    props: {
        modelValue: {
            type: [Object, Function, File, Array] as PropType<File | Array<File> | null>
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
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        invalid: () => true,
        'update:modelValue': (newValue: File | Array<File> | null) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            newValue: this.modelValue,
            dragDropFocus: false,
            _elementRef: 'input'
        }
    },
    computed: {
        disabledOrUndefined() {
            return this.disabled || undefined
        }
    },
    watch: {
        modelValue(value) {
            this.newValue = value
            if (!value || (Array.isArray(value) && value.length === 0)) {
                (this.$refs.input as HTMLInputElement).value = ''
            }
            !this.isValid && !this.dragDrop && this.checkHtml5Validity()
        }
    },
    methods: {
        onFileChange(event: Event) {
            if (this.disabled || this.loading) return
            if (this.dragDrop) this.updateDragDropFocus(false)
            const value = (event.target as HTMLInputElement)!.files ??
                            (event as DragEvent).dataTransfer!.files ??
                            []

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
                    if (this.checkType(file) && Array.isArray(this.newValue)) {
                        this.newValue.push(file)
                        newValues = true
                    }
                }
                if (!newValues) return
            }
            this.$emit('update:modelValue', this.newValue)
            !this.dragDrop && this.checkHtml5Validity()
        },
        clearInput() {
            (this.$refs.input as HTMLInputElement).value = ''
        },
        updateDragDropFocus(focus: boolean) {
            if (!this.disabled && !this.loading) {
                this.dragDropFocus = focus
            }
        },
        checkType(file: File) {
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
})

export type UploadProps = ExtractComponentProps<typeof Upload>

export default Upload
</script>
