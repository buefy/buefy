<template>
    <div v-if="attached && closable" class="tags has-addons">
        <span class="tag"
            :class="[type, size, { 'is-rounded': rounded }]">

            <slot></slot>
        </span>
        <a class="tag is-delete"
            tabindex="0"
            role="button"
            :class="[size, { 'is-rounded': rounded }]"
            @click="close()"
            @keyup.delete.prevent="close()">
        </a>
    </div>
    <span v-else
        class="tag"
        :class="[type, size, { 'is-rounded': rounded }]">

        <slot></slot>

        <button v-if="closable"
            type="button"
            class="delete is-small"
            @click="close()"
            @keyup.delete.prevent="close()">
        </button>
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
            rounded: Boolean
        },
        methods: {
            /**
             * Emit close event when delete button is clicked
             * or delete key is pressed.
             */
            close() {
                this.$emit('close')
            }
        }
    }
</script>
