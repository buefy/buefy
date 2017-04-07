<template>
    <div class="field" :class="[fieldType, addonsPosition]">
        <label class="label" v-if="label">{{ label }}</label>
        <slot></slot>
        <p class="help" :class="newType" v-if="newMessage">{{ newMessage }}</p>
    </div>
</template>

<script>
    export default {
        name: 'bField',
        props: {
            type: String,
            label: String,
            message: String,
            grouped: Boolean,
            position: String
        },
        data() {
            return {
                newType: this.type,
                newMessage: this.message,
                isFieldComponent: true // Used internally by Input
            }
        },
        watch: {
            type(value) {
                this.newType = value
            },
            message(value) {
                this.newMessage = value
            }
        },
        computed: {
            addonsPosition() {
                if (this.position) return 'has-addons-' + this.position
            },
            fieldType() {
                if (this.grouped) {
                    return 'is-grouped'
                } else if (this.$slots.default !== undefined && this.$slots.default.length > 1) {
                    return 'has-addons'
                }
            }
        }
    }
</script>
