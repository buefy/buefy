<template>
    <div class="taginput control" :class="rootClasses">
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
                :ellipsis="ellipsis"
                :closable="closable"
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
                :autocomplete="nativeAutocomplete"
                :keep-first="!allowNew"
                @typing="onTyping"
                @focus="onFocus"
                @blur="customOnBlur"
                @keydown.native="keydown"
                @select="onSelect">
                <template :slot="headerSlotName">
                    <slot name="header" />
                </template>
                <template
                    :slot="defaultSlotName"
                    slot-scope="props">
                    <slot
                        :option="props.option"
                        :index="props.index" />
                </template>
                <template :slot="emptySlotName">
                    <slot name="empty" />
                </template>
            </b-autocomplete>
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
    import Tag from '../tag/Tag'
    import Autocomplete from '../autocomplete/Autocomplete'
    import FormElementMixin from '../../utils/FormElementMixin'

    export default {
        name: 'BTaginput',
        components: {
            [Autocomplete.name]: Autocomplete,
            [Tag.name]: Tag
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
            nativeAutocomplete: String,
            disabled: Boolean,
            ellipsis: Boolean,
            closable: {
                type: Boolean,
                default: true
            },
            confirmKeyCodes: {
                type: Array,
                default: () => [13, 188]
            },
            removeOnKeys: {
                type: Array,
                default: () => [8]
            },
            allowNew: Boolean,
            onPasteSeparators: {
                type: Array,
                default: () => [',']
            },
            beforeAdding: {
                type: Function,
                default: () => true
            },
            allowDuplicates: {
                type: Boolean,
                default: false
            }
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

            defaultSlotName() {
                return this.hasDefaultSlot ? 'default' : 'dontrender'
            },

            emptySlotName() {
                return this.hasEmptySlot ? 'empty' : 'dontrender'
            },

            headerSlotName() {
                return this.hasHeaderSlot ? 'header' : 'dontrender'
            },

            hasDefaultSlot() {
                return !!this.$scopedSlots.default
            },

            hasEmptySlot() {
                return !!this.$slots.empty
            },

            hasHeaderSlot() {
                return !!this.$slots.header
            },

            /**
             * Show the input field if a maxtags hasn't been set or reached.
             */
            hasInput() {
                return this.maxtags == null || this.tagsLength < this.maxtags
            },

            tagsLength() {
                return this.tags.length
            },

            /**
             * If Taginput has onPasteSeparators prop,
             * returning new RegExp used to split pasted string.
             */
            separatorsAsRegExp() {
                const sep = this.onPasteSeparators

                return sep.length ? new RegExp(sep.map((s) => {
                    return s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : null
                }).join('|'), 'g') : null
            }
        },
        watch: {
            /**
             * When v-model is changed set internal value.
             */
            value(value) {
                this.tags = value
            },

            hasInput() {
                if (!this.hasInput) this.onBlur()
            }
        },
        methods: {
            addTag(tag) {
                const tagToAdd = tag || this.newTag.trim()

                if (tagToAdd) {
                    if (!this.autocomplete) {
                        const reg = this.separatorsAsRegExp
                        if (reg && tagToAdd.match(reg)) {
                            tagToAdd.split(reg)
                                .map((t) => t.trim())
                                .filter((t) => t.length !== 0)
                                .map(this.addTag)
                            return
                        }
                    }

                    // Add the tag input if it is not blank
                    // or previously added (if not allowDuplicates).
                    const add = !this.allowDuplicates ? this.tags.indexOf(tagToAdd) === -1 : true
                    if (add && this.beforeAdding(tagToAdd)) {
                        this.tags.push(tagToAdd)
                        this.$emit('input', this.tags)
                        this.$emit('add', tagToAdd)
                    }
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
                // Add tag on-blur if not select only
                if (!this.autocomplete) this.addTag()

                this.onBlur($event)
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
                    this.removeTag(this.tagsLength - 1)
                }
            },

            keydown(event) {
                if (this.removeOnKeys.indexOf(event.keyCode) !== -1 && !this.newTag.length) {
                    this.removeLastTag()
                }
                // Stop if is to accept select only
                if (this.autocomplete && !this.allowNew) return

                if (this.confirmKeyCodes.indexOf(event.keyCode) >= 0) {
                    event.preventDefault()
                    this.addTag()
                }
            },

            onTyping($event) {
                this.$emit('typing', $event.trim())
            }
        }
    }
</script>
