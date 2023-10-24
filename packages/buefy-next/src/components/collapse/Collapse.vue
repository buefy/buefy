<script>
import { h as createElement, Transition, vShow, withDirectives } from 'vue'

export default {
    name: 'BCollapse',
    props: {
        modelValue: {
            type: Boolean,
            default: true
        },
        animation: {
            type: String,
            default: 'fade'
        },
        ariaId: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: 'is-top',
            validator(value) {
                return [
                    'is-top',
                    'is-bottom'
                ].indexOf(value) > -1
            }
        }
    },
    emits: ['close', 'open', 'update:modelValue'],
    data() {
        return {
            isOpen: this.modelValue
        }
    },
    watch: {
        modelValue(value) {
            this.isOpen = value
        }
    },
    methods: {
        /**
        * Toggle and emit events
        */
        toggle() {
            this.isOpen = !this.isOpen
            this.$emit('update:modelValue', this.isOpen)
            this.$emit(this.isOpen ? 'open' : 'close')
        }
    },
    render() {
        const trigger = createElement(
            'div',
            {
                class: 'collapse-trigger',
                onClick: this.toggle
            },
            this.$slots.trigger
                ? this.$slots.trigger({ open: this.isOpen })
                : undefined
        )
        const content = withDirectives(
            createElement(
                Transition,
                { name: this.animation },
                () => [
                    createElement(
                        'div',
                        {
                            class: 'collapse-content',
                            id: this.ariaId
                        },
                        this.$slots
                    )
                ]
            ),
            [[vShow, this.isOpen]]
        )
        return createElement(
            'div',
            { class: 'collapse' },
            this.position === 'is-top' ? [trigger, content] : [content, trigger]
        )
    }
}
</script>
