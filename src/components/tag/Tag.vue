<template>
    <div v-if="attached && closable" class="tags has-addons">
        <span
            class="tag"
            :class="[type, size, { 'is-rounded': rounded }]">
            <span :class="{ 'has-ellipsis': ellipsis }">
                <slot/>
            </span>
        </span>
        <a
            class="tag"
            role="button"
            :aria-label="ariaCloseLabel"
            :tabindex="tabstop ? 0 : false"
            :disabled="disabled"
            :class="[size,
                     closeType,
                     {'is-rounded': rounded},
                     closeIcon ? 'has-delete-icon' : 'is-delete']"
            @click="close"
            @keyup.delete.prevent="close">
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
        :class="[type, size, { 'is-rounded': rounded }]">
        <span :class="{ 'has-ellipsis': ellipsis }">
            <slot/>
        </span>

        <a
            v-if="closable"
            role="button"
            :aria-label="ariaCloseLabel"
            class="delete is-small"
            :class="closeType"
            :disabled="disabled"
            :tabindex="tabstop ? 0 : false"
            @click="close"
            @keyup.delete.prevent="close"
        />
    </span>
</template>

<script>
export default {
    name: 'BTag',
    props: {
        attached: Boolean,
        closable: Boolean,
        type: String,
        size: String,
        rounded: Boolean,
        disabled: Boolean,
        ellipsis: Boolean,
        tabstop: {
            type: Boolean,
            default: true
        },
        ariaCloseLabel: String,
        closeType: String,
        closeIcon: String,
        closeIconPack: String,
        closeIconType: String
    },
    methods: {
        /**
        * Emit close event when delete button is clicked
        * or delete key is pressed.
        */
        close(event) {
            if (this.disabled) return

            this.$emit('close', event)
        }
    }
}
</script>
