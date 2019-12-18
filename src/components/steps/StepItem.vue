<script>
export default {
    name: 'BStepItem',
    props: {
        label: String,
        type: String | Object,
        icon: String,
        iconPack: String,
        clickable: {
            type: Boolean,
            default: undefined
        },
        visible: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            isActive: false,
            transitionName: null,
            _isStepItem: true // Used internally by Step
        }
    },
    methods: {
        /**
        * Activate step, alter animation name based on the index.
        */
        activate(oldIndex, index) {
            this.transitionName = index < oldIndex
                ? 'slide-next'
                : 'slide-prev'
            this.isActive = true
        },

        /**
        * Deactivate step, alter animation name based on the index.
        */
        deactivate(oldIndex, index) {
            this.transitionName = index < oldIndex
                ? 'slide-next'
                : 'slide-prev'
            this.isActive = false
        }
    },
    created() {
        if (!this.$parent.$data._isSteps) {
            this.$destroy()
            throw new Error('You should wrap bStepItem on a bSteps')
        }
        this.$parent.refreshSlots()
    },
    beforeDestroy() {
        this.$parent.refreshSlots()
    },
    render(createElement) {
        // if destroy apply v-if
        if (this.$parent.destroyOnHide) {
            if (!this.isActive || !this.visible) {
                return
            }
        }
        const vnode = createElement('div', {
            directives: [{
                name: 'show',
                value: this.isActive && this.visible
            }],
            attrs: { 'class': 'step-item' }
        }, this.$slots.default)
        // check animated prop
        if (this.$parent.animated) {
            return createElement('transition', {
                props: {
                    'name': this.transitionName
                },
                on: {
                    'before-enter': () => { this.$parent.isTransitioning = true },
                    'after-enter': () => { this.$parent.isTransitioning = false }
                }
            }, [vnode])
        }
        return vnode
    }
}
</script>
