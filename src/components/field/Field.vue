<template>
    <div class="field" :class="rootClasses">
        <div v-if="horizontal" class="field-label is-normal">
            <label
                v-if="label"
                :for="labelFor"
                class="label" >
                {{ label }}
            </label>
        </div>
        <template v-else>
            <label
                v-if="label"
                :for="labelFor"
                class="label">
                {{ label }}
            </label>
        </template>
        <b-field-body
            v-if="horizontal"
            :message="newMessage ? formattedMessage : ''"
            :type="newMessage ? newType : ''">
            <slot/>
        </b-field-body>
        <template v-else>
            <slot/>
        </template>
        <p
            v-if="newMessage && !horizontal"
            v-html="formattedMessage"
            class="help"
            :class="newType"
        />
    </div>
</template>

<script>
    import FieldBody from './FieldBody.vue'

    export default {
        name: 'BField',
        components: {
            'b-field-body': FieldBody
        },
        props: {
            type: String,
            label: String,
            labelFor: String,
            message: [String, Array],
            grouped: Boolean,
            groupMultiline: Boolean,
            position: String,
            expanded: Boolean,
            horizontal: Boolean,
            addons: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                newType: this.type,
                newMessage: this.message,
                _isField: true // Used internally by Input and Select
            }
        },
        computed: {
            rootClasses() {
                return [this.fieldType, this.newPosition, {
                    'is-expanded': this.expanded,
                    'is-grouped-multiline': this.groupMultiline,
                    'is-horizontal': this.horizontal
                }]
            },
            /**
             * Correct Bulma class for the side of the addon or group.
             *
             * This is not kept like the others (is-small, etc.),
             * because since 'has-addons' is set automatically it
             * doesn't make sense to teach users what addons are exactly.
             */
            newPosition() {
                if (this.position === undefined) return

                const position = this.position.split('-')
                if (position.length < 1) return

                const prefix = this.grouped
                    ? 'is-grouped-'
                    : 'has-addons-'

                if (this.position) return prefix + position[1]
            },

            /**
             * Field has addons if there are more than one slot
             * (element / component) in the Field.
             * Or is grouped when prop is set.
             */

            fieldType() {
                if (this.grouped) return 'is-grouped'

                if (
                    this.$slots.default !== undefined &&
                    this.$slots.default.length > 1 &&
                    this.addons &&
                    !this.horizontal
                ) {
                    return 'has-addons'
                }
            },

            /**
             * Formatted message in case it's an array
             * (each element is separated by <br> tag)
             */
            formattedMessage() {
                if (this.newMessage) {
                    if (Array.isArray(this.newMessage)) {
                        return this.newMessage.filter((value) => {
                            if (value) {
                                return value
                            }
                        }).join(' <br> ')
                    } else {
                        return this.newMessage
                    }
                } else {
                    return this.newMessage
                }
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
        }
    }

</script>
