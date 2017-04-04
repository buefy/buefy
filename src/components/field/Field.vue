<template>
    <div class="field" :class="[fieldType, addonsPosition]">
        <label class="label" v-if="label">{{ label }}</label>
        <slot></slot>
        <p class="help" :class="type" v-if="message">{{ message }}</p>
    </div>
</template>

<script>
    export default {
        name: 'bField',
        props: {
            label: String,
            type: String,
            message: String,
            addons: Boolean,
            position: String
        },
        data() {
            return {
                isField: true
            }
        },
        computed: {
            addonsPosition() {
                if (this.position) return 'has-addons-' + this.position
            },
            fieldType() {
                if (this.addons) {
                    return 'has-addons'
                } else if (this.$slots.default !== undefined && this.$slots.default.length > 1) {
                    return 'is-grouped'
                }
            }
        }
    }
</script>
