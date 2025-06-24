<script lang="ts">
import {
    defineComponent,
    h as createElement,
    Transition,
    vShow,
    withDirectives
} from 'vue'
import type { PropType } from 'vue'

export const COLLAPSE_POSITIONS = ['is-top', 'is-bottom'] as const
export type CollapsePosition = typeof COLLAPSE_POSITIONS[number]

export default defineComponent({
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
            type: String as PropType<CollapsePosition>,
            default: 'is-top',
            validator(value: CollapsePosition) {
                return COLLAPSE_POSITIONS.indexOf(value) > -1
            }
        }
    },
    emits: {
        close: () => true,
        open: () => true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        'update:modelValue': (_value: boolean) => true
    },
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
        /*
        * Toggle and emit events
        */
        toggle() {
            this.isOpen = !this.isOpen
            this.$emit('update:modelValue', this.isOpen)
            this.isOpen ? this.$emit('open') : this.$emit('close')
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
})
</script>
