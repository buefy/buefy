<template>
    <div
        class="taginput control"
        :class="rootClasses"
        v-bind="rootAttrs"
    >
        <div
            class="taginput-container"
            :class="[statusType, size, containerClasses]"
            :disabled="disabledOrUndefined"
            @click="hasInput && focus()"
        >
            <slot name="selected" :tags="tags">
                <b-tag
                    v-for="(tag, index) in tags"
                    :key="getNormalizedTagText(tag) + index"
                    :type="type"
                    :close-type="closeType"
                    :size="size"
                    :rounded="rounded"
                    :attached="attached"
                    :tabstop="false"
                    :disabled="disabledOrUndefined"
                    :ellipsis="ellipsis"
                    :closable="closable"
                    :aria-close-label="ariaCloseLabel"
                    :title="ellipsis && getNormalizedTagText(tag)"
                    @close="removeTag(index, $event as Event)"
                >
                    <slot name="tag" :tag="tag">
                        {{ getNormalizedTagText(tag) }}
                    </slot>
                </b-tag>
            </slot>

            <b-autocomplete
                ref="autocomplete"
                v-if="hasInput"
                v-model="newTag"
                v-bind="fallthroughAttrs"
                :data="data"
                :field="field"
                :icon="icon"
                :icon-pack="iconPack"
                :maxlength="maxlength"
                :has-counter="false"
                :size="size"
                :disabled="disabledOrUndefined"
                :loading="loading"
                :autocomplete="nativeAutocomplete"
                :open-on-focus="openOnFocus"
                :keep-open="keepOpen"
                :keep-first="keepFirst"
                :group-field="groupField"
                :group-options="groupOptions"
                :use-html5-validation="useHtml5Validation"
                :check-infinite-scroll="checkInfiniteScroll"
                :append-to-body="appendToBody"
                :confirm-keys="confirmKeys"
                @typing="onTyping"
                @focus="onFocus($event as Event)"
                @blur="customOnBlur($event as Event)"
                @keydown="keydown($event as KeyboardEvent)"
                @compositionstart="isComposing = true"
                @compositionend="isComposing = false"
                @select="onSelect"
                @infinite-scroll="emitInfiniteScroll"
            >
                <template
                    v-if="hasHeaderSlot"
                    #header
                >
                    <slot name="header" />
                </template>
                <template
                    v-if="hasDefaultSlot"
                    #default="props"
                >
                    <slot
                        :option="props.option"
                        :index="props.index"
                    />
                </template>
                <template
                    v-if="hasEmptySlot"
                    #empty
                >
                    <slot name="empty" />
                </template>
                <template
                    v-if="hasFooterSlot"
                    #footer
                >
                    <slot name="footer" />
                </template>
            </b-autocomplete>
        </div>

        <small v-if="hasCounter && (maxtags || maxlength)" class="help counter">
            <template v-if="maxlength && valueLength > 0">
                {{ valueLength }} / {{ maxlength }}
            </template>
            <template v-else-if="maxtags">
                {{ tagsLength }} / {{ maxtags }}
            </template>
        </small>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import { getValueByPath } from '../../utils/helpers'
import BTag from '../tag/Tag.vue'
import BAutocomplete from '../autocomplete/Autocomplete.vue'
import config from '../../utils/config'
import CompatFallthroughMixin from '../../utils/CompatFallthroughMixin'
import FormElementMixin from '../../utils/FormElementMixin'

type BAutocompleteInstance = InstanceType<typeof BAutocomplete>

// Options API does not support generics.
// But we use `T` to represent the type of a tag instead of `any` for marking
// where tags are expected.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type T = any
// `U` represents the type of the inputs to `createTag` and `beforeAdding`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type U = any

export default defineComponent({
    name: 'BTaginput',
    components: {
        BAutocomplete,
        BTag
    },
    mixins: [CompatFallthroughMixin, FormElementMixin],
    props: {
        modelValue: {
            type: Array as PropType<T[]>,
            default: () => []
        },
        data: {
            type: Array as PropType<U[]>,
            default: () => []
        },
        type: String,
        closeType: String,
        attached: {
            type: Boolean,
            default: false
        },
        maxtags: Number,
        hasCounter: {
            type: Boolean,
            default: () => config.defaultTaginputHasCounter
        },
        field: {
            type: String,
            default: 'value'
        },
        autocomplete: Boolean,
        groupField: String,
        groupOptions: String,
        nativeAutocomplete: String,
        openOnFocus: Boolean,
        keepOpen: {
            type: Boolean,
            default: true
        },
        keepFirst: Boolean,
        disabled: Boolean,
        ellipsis: Boolean,
        closable: {
            type: Boolean,
            default: true
        },
        ariaCloseLabel: String,
        confirmKeys: {
            type: Array as PropType<string[]>,
            default: () => [',', 'Tab', 'Enter']
        },
        removeOnKeys: {
            type: Array as PropType<string[]>,
            default: () => ['Backspace']
        },
        allowNew: Boolean,
        onPasteSeparators: {
            type: Array as PropType<string[]>,
            default: () => [',']
        },
        beforeAdding: {
            type: Function as PropType<(tag: U) => boolean>,
            default: () => true
        },
        allowDuplicates: {
            type: Boolean,
            default: false
        },
        checkInfiniteScroll: {
            type: Boolean,
            default: false
        },
        createTag: {
            type: Function as PropType<(tag: U) => T>,
            default: (tag: U) => tag
        },
        appendToBody: Boolean
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        add: (tag: U) => true,
        'infinite-scroll': () => true,
        remove: (tag: T) => true,
        typing: (value: number | string | undefined) => true,
        'update:modelValue': (tags: T[]) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            tags: Array.isArray(this.modelValue)
                ? this.modelValue.slice(0)
                : (this.modelValue || []),
            newTag: '',
            isComposing: false,
            _elementRef: 'autocomplete',
            _isTaginput: true,
            requestID: null as ReturnType<typeof requestAnimationFrame> | null
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

        hasDefaultSlot() {
            return !!this.$slots.default
        },

        hasEmptySlot() {
            return !!this.$slots.empty
        },

        hasHeaderSlot() {
            return !!this.$slots.header
        },

        hasFooterSlot() {
            return !!this.$slots.footer
        },

        /*
         * Show the input field if a maxtags hasn't been set or reached.
         */
        hasInput() {
            return this.maxtags == null || this.maxtags === 1 || this.tagsLength < this.maxtags
        },

        tagsLength() {
            return this.tags.length
        },

        /*
         * If Taginput has onPasteSeparators prop,
         * returning new RegExp used to split pasted string.
         */
        separatorsAsRegExp() {
            const sep = this.onPasteSeparators

            return sep.length
                ? new RegExp(sep.map((s: string) => {
                    return s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : null
                }).join('|'), 'g')
                : null
        },

        disabledOrUndefined() {
            // On Vue 3, setting a boolean attribute `false` does not remove it.
            // `null` or `undefined` has to be given to remove it.
            return this.disabled || undefined
        }
    },
    watch: {
        /*
         * When v-model is changed set internal value.
         */
        modelValue(value) {
            this.tags = Array.isArray(value) ? value.slice(0) : (value || [])
        },

        hasInput() {
            if (!this.hasInput) this.onBlur()
        }
    },
    methods: {
        addTag(tag?: U) {
            const tagToAdd: U = tag || this.newTag.trim()

            if (tagToAdd) {
                if (!this.autocomplete) {
                    const reg = this.separatorsAsRegExp
                    // TODO: won't work if `tagToAdd` is not a string
                    if (reg && tagToAdd.match(reg)) {
                        tagToAdd.split(reg)
                            .map((t: string) => t.trim())
                            .filter((t: string) => t.length !== 0)
                            .map(this.addTag)
                        return
                    }
                }
                // Add the tag input if it is not blank
                // or previously added (if not allowDuplicates).
                const add = !this.allowDuplicates ? this.tags.indexOf(tagToAdd) === -1 : true
                if (add && this.beforeAdding(tagToAdd)) {
                    if (this.maxtags === 1) {
                        this.tags = [] // replace existing tag if only 1 is allowed
                    }
                    this.tags.push(this.createTag(tagToAdd))
                    this.$emit('update:modelValue', this.tags)
                    this.$emit('add', tagToAdd)
                }

                // after autocomplete events
                this.requestID = requestAnimationFrame(() => {
                    this.newTag = ''
                    this.$emit('typing', '')
                })
            }
        },

        getNormalizedTagText(tag: T): string {
            if (typeof tag === 'object') {
                tag = getValueByPath(tag, this.field)
            }

            return `${tag}`
        },

        customOnBlur(event: Event) {
            // Add tag on-blur if not select only
            if (!this.autocomplete) this.addTag()

            this.onBlur(event)
        },

        onSelect(option: U) {
            if (!option) return

            this.addTag(option)
            this.$nextTick(() => {
                this.newTag = ''
            })
        },

        removeTag(index: number, event?: Event) {
            const tag = this.tags.splice(index, 1)[0]
            this.$emit('update:modelValue', this.tags)
            this.$emit('remove', tag)
            if (event) event.stopPropagation()
            if (this.openOnFocus && this.$refs.autocomplete) {
                (this.$refs.autocomplete as BAutocompleteInstance).focus()
            }
            return tag
        },

        removeLastTag() {
            if (this.tagsLength > 0) {
                this.removeTag(this.tagsLength - 1)
            }
        },

        keydown(event: KeyboardEvent) {
            const { key } = event // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
            if (this.removeOnKeys.indexOf(key) !== -1 && !this.newTag.length) {
                this.removeLastTag()
            }
            // Stop if is to accept select only
            if (this.autocomplete && !this.allowNew) return

            if (this.confirmKeys.indexOf(key) >= 0) {
                // Allow Tab to advance to next field regardless
                if (key !== 'Tab') event.preventDefault()
                if (key === 'Enter' && this.isComposing) return
                this.addTag()
            }
        },

        onTyping(event: number | string | null | undefined) {
            this.$emit('typing', typeof event === 'number' ? event : event?.trim())
        },

        emitInfiniteScroll() {
            this.$emit('infinite-scroll')
        }
    },

    beforeUnmount() {
        cancelAnimationFrame(this.requestID!)
    }
})
</script>
