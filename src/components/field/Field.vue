<template>
    <div class="field" :class="[rootClasses, fieldType()]">
        <div
            v-if="horizontal"
            class="field-label is-normal"
            :class="customClass">
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
                :class="customClass"
                class="label">
                {{ label }}
            </label>
        </template>
        <b-field-body
            v-if="horizontal"
            :message="newMessage ? formattedMessage : ''"
            :type="newType">
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
            },
            customClass: String
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
                return [this.newPosition, {
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
        },
        methods: {
            /**
             * Field has addons if there are more than one slot
             * (element / component) in the Field.
             * Or is grouped when prop is set.
             * Is a method to be called when component re-render.
             */
            fieldType() {
                if (this.grouped) return 'is-grouped'

                let renderedNode = 0
                if (this.$slots.default) {
                    renderedNode = this.$slots.default
                                        .reduce((i, node) => node.tag ? i + 1 : i, 0)
                }
                if (
                    renderedNode > 1 &&
                    this.addons &&
                    !this.horizontal
                ) {
                    return 'has-addons'
                }
            }
        }
    }

</script>
