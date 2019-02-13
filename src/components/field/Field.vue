<template>
    <div class="field" :class="[rootClasses, fieldType()]">
        <div
            v-if="horizontal"
            class="field-label"
            :class="[customClass, fieldLabelSize]">
            <label
                v-if="label"
                :for="labelFor"
                :class="customClass"
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
    import FieldBody from './FieldBody'

    export default {
        name: 'BField',
        components: {
            [FieldBody.name]: FieldBody
        },
        props: {
            type: [String, Object],
            label: String,
            labelFor: String,
            message: [String, Array, Object],
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
                fieldLabelSize: null,
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
                if (typeof this.newMessage === 'string') {
                    return this.newMessage
                } else {
                    let messages = []
                    if (Array.isArray(this.newMessage)) {
                        this.newMessage.forEach((message) => {
                            if (typeof message === 'string') {
                                messages.push(message)
                            } else {
                                for (let key in message) {
                                    if (message[key]) {
                                        messages.push(key)
                                    }
                                }
                            }
                        })
                    } else {
                        for (let key in this.newMessage) {
                            if (this.newMessage[key]) {
                                messages.push(key)
                            }
                        }
                    }
                    return messages.filter((m) => { if (m) return m }).join(' <br> ')
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
        },
        mounted() {
            if (this.horizontal) {
                // Bulma docs: .is-normal for any .input or .button
                const elements = this.$el.querySelectorAll('.input, .select, .button, .textarea')
                if (elements.length > 0) {
                    this.fieldLabelSize = 'is-normal'
                }
            }
        }
    }

</script>
