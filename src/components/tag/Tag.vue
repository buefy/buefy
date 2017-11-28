<template>
    <div v-if="attached && closable" class="tags has-addons">
        <span class="tag"
            :class="[type, size, { 'is-rounded': rounded }]">

            <slot></slot>
        </span>
        <a class="tag is-delete"
            role="button"
            :tabindex="tabstop ? 0 : false"
            :disabled="disabled"
            :class="[size, { 'is-rounded': rounded }]"
            @click="close()"
            @keyup.delete.prevent="close()">
        </a>
    </div>
    <span v-else
        class="tag"
        :class="[type, size, { 'is-rounded': rounded }]">

        <slot></slot>

        <a v-if="closable"
            role="button"
            class="delete is-small"
            :disabled="disabled"
            :tabindex="tabstop ? 0 : false"
            @click="close()"
            @keyup.delete.prevent="close()">
        </a>
    </span>
</template>

<script>
    export default {
        name: 'bTag',
        props: {
            attached: Boolean,
            closable: Boolean,
            type: String,
            size: String,
            rounded: Boolean,
            disabled: Boolean,
            tabstop: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            /**
             * Emit close event when delete button is clicked
             * or delete key is pressed.
             */
            close() {
                if (this.disabled) return

                this.$emit('close')
            }
        }
    }
</script>
