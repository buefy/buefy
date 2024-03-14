<template>
    <div class="field" :class="rootClasses">
        <div
            v-if="horizontal"
            class="field-label"
            :class="[customClass, fieldLabelSize]"
        >
            <label
                v-if="hasLabel"
                :for="labelFor"
                :class="customClass"
                class="label"
            >
                <slot v-if="$slots.label" name="label" />
                <template v-else>{{ label }}</template>
            </label>
        </div>
        <template v-else>
            <label
                v-if="hasLabel"
                :for="labelFor"
                :class="customClass"
                class="label"
            >
                <slot v-if="$slots.label" name="label" />
                <template v-else>{{ label }}</template>
            </label>
        </template>
        <b-field-body
            v-if="horizontal"
            :message="newMessage ? formattedMessage : ''"
            :type="newType"
        >
            <slot />
        </b-field-body>
        <div v-else-if="hasInnerField" class="field-body">
            <b-field
                :addons="false"
                :type="type"
                :class="innerFieldClasses"
            >
                <slot />
            </b-field>
        </div>
        <template v-else>
            <slot />
        </template>
        <p
            v-if="hasMessage && !horizontal"
            class="help"
            :class="newType"
        >
            <slot
                v-if="$slots.message"
                name="message"
                :messages="formattedMessage"
            />
            <template v-else>
                <template v-for="(mess, i) in formattedMessage">
                    {{ mess }}
                    <br :key="i" v-if="(i + 1) < formattedMessage.length">
                </template>
            </template>
        </p>
    </div>
</template>

<script>
import config from '../../utils/config'
import { isTag } from '../../utils/helpers'
import FieldBody from './FieldBody.vue'

export default {
    name: 'BField',
    components: {
        [FieldBody.name]: FieldBody
    },
    provide() {
        return {
            BField: this
        }
    },
    inject: {
        parent: {
            from: 'BField',
            default: false
        }
    }, // Used internally only when using Field in Field
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
        customClass: String,
        labelPosition: {
            type: String,
            default: () => { return config.defaultFieldLabelPosition }
        }
    },
    data() {
        return {
            newType: this.type,
            newMessage: this.message,
            fieldLabelSize: null,
            numberInputClasses: [],
            _isField: true // Used internally by Input and Select
        }
    },
    computed: {
        rootClasses() {
            return [{
                'is-expanded': this.expanded,
                'is-horizontal': this.horizontal,
                'is-floating-in-label': this.hasLabel && !this.horizontal &&
                    this.labelPosition === 'inside',
                'is-floating-label': this.hasLabel && !this.horizontal &&
                    this.labelPosition === 'on-border'
            },
            this.numberInputClasses]
        },
        innerFieldClasses() {
            return [
                this.fieldType(),
                this.newPosition,
                {
                    'is-grouped-multiline': this.groupMultiline
                }
            ]
        },
        hasInnerField() {
            return this.grouped || this.groupMultiline || this.hasAddons()
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
            return undefined
        },
        /**
        * Formatted message in case it's an array
        * (each element is separated by <br> tag)
        */
        formattedMessage() {
            if (this.parent && this.parent.hasInnerField) {
                return '' // Message will be displayed in parent field
            }
            if (typeof this.newMessage === 'string') {
                return [this.newMessage]
            }
            const messages = []
            if (Array.isArray(this.newMessage)) {
                this.newMessage.forEach((message) => {
                    if (typeof message === 'string') {
                        messages.push(message)
                    } else {
                        for (const key in message) {
                            if (message[key]) {
                                messages.push(key)
                            }
                        }
                    }
                })
            } else {
                for (const key in this.newMessage) {
                    if (this.newMessage[key]) {
                        messages.push(key)
                    }
                }
            }
            return messages.filter((m) => !!m)
        },
        hasLabel() {
            return this.label || this.$slots.label
        },
        hasMessage() {
            return ((!this.parent || !this.parent.hasInnerField) && this.newMessage) ||
                this.$slots.message
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
            // we deep comparison here becase an innner Field of another Field
            // receives the message as a brand new array every time, so simple
            // identity check won't work and will end up with infinite
            // recursions
            // https://github.com/buefy/buefy/issues/4018#issuecomment-1985026234
            if (JSON.stringify(value) !== JSON.stringify(this.newMessage)) {
                this.newMessage = value
            }
        },

        /**
        * Set parent message if we use Field in Field.
        */
        newMessage(value) {
            if (this.parent && this.parent.hasInnerField) {
                if (!this.parent.type) {
                    this.parent.newType = this.newType
                }
                if (!this.parent.message) {
                    this.parent.newMessage = value
                }
            }
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
            if (this.hasAddons()) return 'has-addons'
        },
        hasAddons() {
            let renderedNode = 0
            if (this.$slots.default) {
                renderedNode = this.$slots.default().reduce((i, node) => isTag(node) ? i + 1 : i, 0)
            }
            return (
                renderedNode > 1 &&
                this.addons &&
                !this.horizontal
            )
        },
        // called by a number input if it is a direct child.
        wrapNumberinput({ controlsPosition, size }) {
            const classes = ['has-numberinput']
            if (controlsPosition) {
                classes.push(`has-numberinput-${controlsPosition}`)
            }
            if (size) {
                classes.push(`has-numberinput-${size}`)
            }
            this.numberInputClasses = classes
        }
    },
    mounted() {
        if (this.horizontal) {
            // Bulma docs: .is-normal for any .input or .button
            const elements = this.$el.querySelectorAll('.input, .select, .button, .textarea, .b-slider')
            if (elements.length > 0) {
                this.fieldLabelSize = 'is-normal'
            }
        }
    }
}

</script>
