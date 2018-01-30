<template>
    <div class="taginput control" :class="[size, rootClasses]">
        <div
            class="taginput-container"
            :class="[statusType, size, containerClasses]"
            :disabled="disabled"
            @click="hasInput && focus($event)">
            <b-tag
                v-for="(tag, index) in tags"
                :key="index"
                :type="type"
                :size="size"
                :rounded="rounded"
                :attached="attached"
                :tabstop="false"
                :disabled="disabled"
                closable
                @close="removeTag(index)">
                {{ getNormalizedTagText(tag) }}
            </b-tag>

            <b-autocomplete
                ref="autocomplete"
                v-if="hasInput"
                v-model="newTag"
                v-bind="$attrs"
                :data="data"
                :field="field"
                :icon="icon"
                :icon-pack="iconPack"
                :maxlength="maxlength"
                :has-counter="false"
                :size="size"
                :disabled="disabled"
                :loading="loading"
                keep-first
                @focus="onFocus"
                @blur="customOnBlur"
                @keydown.native="keydown"
                @select="onSelect"/>
        </div>

        <p v-if="maxtags || maxlength" class="help counter">
            <template v-if="maxlength && valueLength > 0">
                {{ valueLength }} / {{ maxlength }}
            </template>
            <template v-else-if="maxtags">
                {{ tagsLength }} / {{ maxtags }}
            </template>
        </p>
    </div>
</template>

<script>
    import { getValueByPath } from '../../utils/helpers'
    import Autocomplete from '../autocomplete'
    import FormElementMixin from '../../utils/FormElementMixin'

    export default {
        name: 'BTaginput',
        components: {
            [Autocomplete.name]: Autocomplete
        },
        mixins: [FormElementMixin],
        inheritAttrs: false,
        props: {
            value: {
                type: Array,
                default: () => []
            },
            data: {
                type: Array,
                default: () => []
            },
            type: String,
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
            field: {
                type: String,
                default: 'value'
            },
            autocomplete: Boolean,
            disabled: Boolean,
            confirmKeyCodes: {
                type: Array,
                default: () => [13, 188]
            },
            allowNew: Boolean
        },
        data() {
            return {
                tags: this.value || [],
                newTag: '',
                _elementRef: 'input',
                _isTaginput: true
            }
        },
        computed: {
            rootClasses() {
                return {
                    'is-expanded': this.expanded
                }
            },

            containerClasses() {
                return {
                    'is-focused': this.isFocused,
                    'is-focusable': this.hasInput
                }
            },

            valueLength() {
                return this.newTag.trim().length
            },

            /**
             * Show the input field if a maxtags hasn't been set or reached.
             */
            hasInput() {
                return this.maxtags == null || this.tagsLength < this.maxtags
            },

            tagsLength() {
                return this.tags.length
            }
        },
        watch: {
            /**
             * When v-model is changed set internal value.
             */
            value(value) {
                this.tags = value
            },

            newTag(value) {
                this.$emit('typing', value.trim())
            },

            hasInput() {
                if (!this.hasInput) this.onBlur()
            }
        },
        methods: {
            addTag(tag) {
                const tagToAdd = tag || this.newTag.trim()

                // Add the tag input if it is not blank or previously added.
                if (tagToAdd && this.tags.indexOf(tagToAdd) === -1) {
                    this.tags.push(tagToAdd)
                    this.$emit('input', this.tags)
                    this.$emit('add', tagToAdd)
                }

                this.newTag = ''
            },

            getNormalizedTagText(tag) {
                if (typeof tag === 'object') {
                    return getValueByPath(tag, this.field)
                }

                return tag
            },

            customOnBlur($event) {
                this.onBlur($event)

                // Add tag on-blur if not select only
                if (!this.autocomplete) this.addTag()
            },

            onSelect(option) {
                if (!option) return

                this.addTag(option)
                this.$nextTick(() => {
                    this.newTag = ''
                })
            },

            removeTag(index) {
                var tag = this.tags.splice(index, 1)[0]
                this.$emit('input', this.tags)
                this.$emit('remove', tag)
                return tag
            },

            removeLastTag() {
                if (this.tagsLength > 0) {
                    this.newTag = this.removeTag(this.tagsLength - 1)
                }
            },

            keydown(event) {
                // Stop if is to accept select only
                if (this.autocomplete && !this.allowNew) return

                if (this.confirmKeyCodes.indexOf(event.keyCode) >= 0) {
                    event.preventDefault()
                    this.addTag()
                }
            }
        }
    }
</script>
