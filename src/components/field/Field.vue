<template>
    <div class="field" :class="[fieldType, addonsPosition, { 'is-expanded': expanded }]">
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
            position: String,
            expanded: Boolean
        },
        data() {
            return {
                newType: this.type,
                newMessage: this.message,
                _isField: true // Used internally by Input and Select
            }
        },
        watch: {
            /**
             * Set internal type when prop change.
             */
            type(value) {
                this.newType = value
            },

            /**
             * Set internal message when prop change.
             */
            message(value) {
                this.newMessage = value
            }
        },
        computed: {
            /**
             * Correct Bulma class for the side of the addon.
             *
             * This is not kept like the others (is-small, etc.),
             * because since 'has-addons' is set automatically it
             * doesn't make sense to teach users what addons are exactly.
             */
            addonsPosition() {
                if (this.position === undefined) return

                const position = this.position.split('-')
                if (position.length < 1) return

                if (this.position) return 'has-addons-' + position[1]
            },

            /**
             * Field has addons if there are more than one slot
             * (element / component) in the Field.
             * Or is grouped when prop is set.
             */
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
