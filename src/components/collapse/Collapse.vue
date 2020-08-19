<script>
export default {
    name: 'BCollapse',
    // deprecated, to replace with default 'value' in the next breaking change
    model: {
        prop: 'open',
        event: 'update:open'
    },
    props: {
        open: {
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
    data() {
        return {
            isOpen: this.open
        }
    },
    watch: {
        open(value) {
            this.isOpen = value
        }
    },
    methods: {
        /**
        * Toggle and emit events
        */
        toggle() {
            this.isOpen = !this.isOpen
            this.$emit('update:open', this.isOpen)
            this.$emit(this.isOpen ? 'open' : 'close')
        }
    },
    render(createElement) {
        const trigger = createElement('div', {
            staticClass: 'collapse-trigger', on: { click: this.toggle }
        }, this.$scopedSlots.trigger
            ? [this.$scopedSlots.trigger({ open: this.isOpen })]
            : [this.$slots.trigger]
        )
        const content = createElement('transition', { props: { name: this.animation } }, [
            createElement('div', {
                staticClass: 'collapse-content',
                attrs: { 'id': this.ariaId, 'aria-expanded': this.isOpen },
                directives: [{
                    name: 'show',
                    value: this.isOpen
                }]
            }, this.$slots.default)
        ])
        return createElement('div', { staticClass: 'collapse' },
            this.position === 'is-top' ? [trigger, content] : [content, trigger])
    }
}
</script>
