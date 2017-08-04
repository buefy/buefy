<template>
    <div class="b-upload control"
        :class="{ 'is-clearfix': !hasMessage }">

        <a v-if="!dragDrop"
            class="button"
            :class="[buttonSize, buttonType, { 'is-loading': loading }]"
            :disabled="disabled"
            @click="upload">
            <slot></slot>
        </a>

        <div v-else
            class="upload-draggable"
            :class="[dragDropType, {
                'upload-draggable-hover': dragDropFocus,
                'is-loading': loading,
                'is-disabled': disabled
            }]"
            @click="upload"
            @mouseover.prevent="updateDragDropFocus(true)"
            @mouseout.prevent="updateDragDropFocus(false)"
            @dragover.prevent="updateDragDropFocus(true)"
            @dragleave.prevent="updateDragDropFocus(false)"
            @dragenter.prevent="updateDragDropFocus(true)"
            @drop.prevent="onFileChange">
            <slot></slot>
        </div>

        <input ref="input"
            type="file"
            class="is-hidden"
            v-bind="$attrs"
            :accept="accept"
            :multiple="multiple"
            @change="onFileChange">
    </div>
</template>

<script>
    import FormElementMixin from '../../utils/FormElementMixin'

    export default {
        name: 'bUpload',
        mixins: [FormElementMixin],
        props: {
            value: {
                type: Array,
                default: null
            },
            buttonSize: {
                type: String,
                default: ''
            },
            buttonType: {
                type: String,
                default: 'is-primary'
            },
            accept: {
                type: String,
                default: ''
            },
            multiple: Boolean,
            dragDrop: {
                type: Boolean,
                default: false
            },
            dragDropType: {
                type: String,
                default: 'is-primary'
            },
            disabled: Boolean
        },
        data() {
            return {
                newValue: this.value,
                file: this.value,
                dragDropFocus: false,
                _elementRef: 'input'
            }
        },
        computed: {
            /**
             * Check if have any message prop from parent if it's a Field.
             */
            hasMessage() {
                return this.$parent.$data._isField && this.$parent.newMessage
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
             * Show upload file chooser
             */
            upload() {
                if (!this.disabled && !this.loading) {
                    this.$refs.input.value = null
                    this.$refs.input.click()
                }
            },

            /**
             * Listen change event on input type 'file',
             * emit 'input', 'change' event and validate
             */
            onFileChange(event) {
                if (!this.disabled && !this.loading) {
                    if (this.dragDrop) {
                        this.updateDragDropFocus(false)
                    }
                    const value = event.target.files || event.dataTransfer.files
                    const files = []
                    if (value) {
                        for (let i = 0; i < value.length; i++) {
                            files.push(value[i])
                            // first element in case drag drop mode and single
                            if (this.dragDrop && !this.multiple) {
                                break
                            }
                        }
                    }
                    this.newValue = files
                    this.$emit('input', this.newValue)
                    this.$emit('change', this.newValue)
                    !this.dragDrop && this.checkHtml5Validity()
                }
            },

            /**
             * Listen drag-drop and mouse events
             * to update interval variable aim to animate
             */
            updateDragDropFocus(focus) {
                if (!this.disabled && !this.loading) {
                    this.dragDropFocus = focus
                }
            }
        }
    }
</script>
