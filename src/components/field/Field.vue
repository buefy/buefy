<template>
    <div class="field" :class="rootClasses">
        <div
            v-if="horizontal"
            class="field-label"
            :class="[customClass, fieldLabelSize]">
            <label
                v-if="hasLabel"
                :for="labelFor"
                :class="customClass"
                class="label" >
                <slot v-if="$slots.label" name="label"/>
                <template v-else>{{ label }}</template>
            </label>
        </div>
        <template v-else>
            <label
                v-if="hasLabel"
                :for="labelFor"
                :class="customClass"
                class="label">
                <slot v-if="$slots.label" name="label"/>
                <template v-else>{{ label }}</template>
            </label>
        </template>
        <b-field-body
            v-if="horizontal"
            :message="newMessage ? formattedMessage : ''"
            :type="newType">
            <slot/>
        </b-field-body>
        <div v-else-if="hasInnerField" class="field-body">
            <b-field
                :addons="false"
                :type="newType"
                :class="innerFieldClasses">
                <slot/>
            </b-field>
        </div>
        <template v-else>
            <slot/>
        </template>
        <p
            v-if="hasMessage && !horizontal"
            class="help"
            :class="newType"
        >
            <slot v-if="$slots.message" name="message"/>
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
import FieldBody from './FieldBody'

export default {
    name: 'BField',
    components: {
        [FieldBody.name]: FieldBody
    },
    provide() {
        return {
            'BField': this
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
            return messages.filter((m) => { if (m) return m })
        },
        hasLabel() {
            return this.label || this.$slots.label
        },
        hasMessage() {
            return ((!this.parent || !this.parent.hasInnerField) && this.newMessage) ||
                this.$slots.message
        },
        numberInputClasses() {
            if (this.$slots.default) {
                const numberinput = this.$slots.default.filter((node) => node.tag && node.tag.toLowerCase().indexOf('numberinput') >= 0)[0]
                if (numberinput) {
                    const classes = ['has-numberinput']
                    const controlsPosition = numberinput.componentOptions.propsData.controlsPosition
                    const size = numberinput.componentOptions.propsData.size
                    if (controlsPosition) {
                        classes.push(`has-numberinput-${controlsPosition}`)
                    }
                    if (size) {
                        classes.push(`has-numberinput-${size}`)
                    }
                    return classes
                }
            }
            return null
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
        },

        /**
        * Set parent message if we use Field in Field.
        */
        newMessage(value) {
            if (this.parent && this.parent.hasInnerField) {
                if (!this.parent.type) {
                    this.parent.newType = this.newType
                }
                this.parent.newMessage = value
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
                renderedNode = this.$slots.default.reduce((i, node) => node.tag ? i + 1 : i, 0)
            }
            return (
                renderedNode > 1 &&
                this.addons &&
                !this.horizontal
            )
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
