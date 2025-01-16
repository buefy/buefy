<template>
    <div v-if="attached && closable" class="tags has-addons inline-tags">
        <span
            class="tag"
            :class="[type, size, { 'is-rounded': rounded }]"
        >
            <b-icon
                v-if="icon"
                :icon="icon"
                :size="size"
                :type="iconType"
                :pack="iconPack"
            />
            <span :class="{ 'has-ellipsis': ellipsis }" @click="click">
                <slot />
            </span>
        </span>
        <a
            class="tag"
            role="button"
            :aria-label="ariaCloseLabel"
            :tabindex="tabstop ? 0 : undefined"
            :disabled="disabledOrUndefined"
            :class="[size,
                     closeType,
                     {'is-rounded': rounded},
                     closeIcon ? 'has-delete-icon' : 'is-delete']"
            @click="close"
            @keyup.delete.prevent="close"
        >
            <b-icon
                custom-class=""
                v-if="closeIcon"
                :icon="closeIcon"
                :size="size"
                :type="closeIconType"
                :pack="closeIconPack"
            />
        </a>
    </div>
    <span
        v-else
        class="tag"
        :class="[type, size, { 'is-rounded': rounded }]"
    >
        <b-icon
            v-if="icon"
            :icon="icon"
            :size="size"
            :type="iconType"
            :pack="iconPack"
        />
        <span :class="{ 'has-ellipsis': ellipsis }" @click="click">
            <slot />
        </span>

        <a
            v-if="closable"
            role="button"
            :aria-label="ariaCloseLabel"
            class="delete is-small"
            :class="closeType"
            :disabled="disabledOrUndefined"
            :tabindex="tabstop ? 0 : undefined"
            @click="close"
            @keyup.delete.prevent="close"
        />
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BIcon from '../icon/Icon.vue'

export default defineComponent({
    name: 'BTag',
    components: { BIcon },
    props: {
        attached: Boolean,
        closable: Boolean,
        type: [String, Object],
        size: String,
        rounded: Boolean,
        disabled: Boolean,
        ellipsis: Boolean,
        tabstop: {
            type: Boolean,
            default: true
        },
        ariaCloseLabel: String,
        icon: String,
        iconType: String,
        iconPack: String,
        closeType: String,
        closeIcon: String,
        closeIconPack: String,
        closeIconType: String
    },
    emits: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        click: (_: Event) => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        close: (_: Event) => true
    },
    computed: {
        // setting a boolean attribute `false` does not remove it on Vue 3.
        // `null` or `undefined` has to be given to remove it.
        disabledOrUndefined() {
            return this.disabled || undefined
        }
    },
    methods: {
        /**
        * Emit close event when delete button is clicked
        * or delete key is pressed.
        */
        close(event: Event) {
            if (this.disabled) return

            this.$emit('close', event)
        },
        /**
        * Emit click event when tag is clicked.
        */
        click(event: Event) {
            if (this.disabled) return

            this.$emit('click', event)
        }
    }
})
</script>
