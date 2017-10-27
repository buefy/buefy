<template>
    <div class="control"
        :class="[iconPosition, {
            'is-expanded': expanded,
            'is-loading': loading,
            'is-clearfix': !hasMessage
        }]">

        <div class="input tag-input"
            :class="[statusType, size, { 'is-focused' : inputFocus }]"
            @click="focus">
            <b-tag v-for="(tag, index) in tags"
                :key="index"
                :type="color"
                :size="size"
                :rounded="rounded"
                :attached="attached"
                closable
                @close="removeTag(index)">
                {{ tag }}
            </b-tag>

            <input ref="input"
                :class="size"
                type="text"
                v-if="showInput"
                v-model="newTag"
                :placeholder="placeholder"
                :maxlength="maxlength"
                @focus="focus"
                @blur="blur"
                @keydown="keydown">
        </div>

        <b-icon v-if="icon"
            class="is-left"
            :icon="icon"
            :pack="iconPack"
            :size="size">
        </b-icon>

        <b-icon v-if="!loading && statusType"
            class="is-right"
            :class="statusType"
            :icon="statusTypeIcon"
            :size="size"
            both>
        </b-icon>

        <small class="help counter" v-if="maxtags || maxlength">
            <template v-if="maxlength && !maxtags || maxlength && valueLength > 0">
                {{ valueLength }} / {{ maxlength }} characters<template v-if="maxlength && maxtags">, </template>
            </template>
            <template v-if="maxtags">
                {{ tagsLength }} / {{ maxtags }} tags
            </template>
        </small>

    </div>
</template>

<script>
    import FormElementMixin from '../../utils/FormElementMixin'

    export default {
        name: 'bTagInput',
        mixins: [FormElementMixin],
        props: {
            value: {
                type: Array,
                default: () => []
            },
            placeholder: {
                type: String,
                default: 'Add a tag'
            },
            color: {
                type: String,
                default: 'is-primary'
            },
            size: {
                type: String,
                default: 'is-medium'
            },
            rounded: {
                type: Boolean,
                default: false
            },
            attached: {
                type: Boolean,
                default: false
            },
            maxtags: {
                type: [Number, String],
                required: false
            },
            maxlength: {
                type: [Number, String],
                required: false
            }
        },
        data() {
            return {
                tags: this.value || [],
                inputFocus: false,
                newTag: '',
                _elementRef: 'input',
                _isDatepicker: true
            }
        },
        computed: {
            /**
             * New tag value without surrounding whitespace.
             */
            trimmedNewTag() {
                return this.newTag.trim()
            },

            valueLength() {
                return this.trimmedNewTag.length
            },

            /**
             * Show the input field if a maxtags hasn't been set or reached.
             */
            showInput() {
                return this.maxtags == null || this.tagsLength < this.maxtags
            },

            /**
             * Count of tags.
             */
            tagsLength() {
                return this.tags.length
            },

            /**
             * Check if have any icon in the right side.
             */
            hasIconRight() {
                return this.loading || this.statusType
            },

            /**
             * Position of the icon or if it's both sides.
             */
            iconPosition() {
                if (this.icon && this.hasIconRight) {
                    return 'has-icons-left has-icons-right'
                } else if (!this.icon && this.hasIconRight) {
                    return 'has-icons-right'
                } else if (this.icon) {
                    return 'has-icons-left'
                }
            },

            /**
             * Icon name (MDI) based on the type.
             */
            statusTypeIcon() {
                switch (this.statusType) {
                    case 'is-success': return 'done'
                    case 'is-danger': return 'error'
                    case 'is-info': return 'info'
                    case 'is-warning': return 'warning'
                }
            },

            /**
             * Check if have any message prop from parent if it's a Field.
             */
            hasMessage() {
                return this.$parent.$data._isField && this.$parent.newMessage
            }
        },
        watch: {
            /**
             * When v-model is changed set internal value.
             */
            value(value) {
                this.tags = value
            }
        },
        methods: {
            focus() {
                if (this.showInput) {
                    this.$refs.input.focus()
                    this.inputFocus = true
                }
            },

            blur() {
                this.$refs.input.blur()
                this.inputFocus = false
                this.addTag()
            },

            addTag() {
                var tag = this.trimmedNewTag

                // Add the tag input if it is not blank or previously added.
                if (tag && this.tags.indexOf(tag) === -1) {
                    this.tags.push(tag)
                    this.$emit('input', this.tags)
                    this.$emit('tagAdded', tag)
                }

                this.newTag = ''
            },

            removeTag(index) {
                var tag = this.tags.splice(index, 1)[0]
                this.$emit('input', this.tags)
                this.$emit('tagRemoved', tag)
                return tag
            },

            removeLastTag() {
                if (this.tagsLength > 0) {
                    this.newTag = this.removeTag(this.tagsLength - 1)
                }
            },

            keydown(event) {
                if (event.keyCode === 13 || event.keyCode === 188) {
                    event.preventDefault()
                    this.addTag()
                } else if (event.keyCode === 8 && event.target.value.trim().length === 0) {
                    event.preventDefault()
                    this.removeLastTag()
                }
            }
        }
    }
</script>
