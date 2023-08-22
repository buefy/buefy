<script>
import {
    h as createElement,
    resolveComponent,
    resolveDirective,
    withDirectives
} from 'vue'

import NavbarBurger from './NavbarBurger.vue'
import clickOutside from '../../directives/clickOutside'

const FIXED_TOP_CLASS = 'is-fixed-top'
const BODY_FIXED_TOP_CLASS = 'has-navbar-fixed-top'
const BODY_SPACED_FIXED_TOP_CLASS = 'has-spaced-navbar-fixed-top'
const FIXED_BOTTOM_CLASS = 'is-fixed-bottom'
const BODY_FIXED_BOTTOM_CLASS = 'has-navbar-fixed-bottom'
const BODY_SPACED_FIXED_BOTTOM_CLASS = 'has-spaced-navbar-fixed-bottom'
const BODY_CENTERED_CLASS = 'has-navbar-centered'

const isFilled = (str) => !!str

export default {
    name: 'BNavbar',
    components: {
        NavbarBurger
    },
    directives: {
        clickOutside
    },
    props: {
        type: [String, Object],
        transparent: {
            type: Boolean,
            default: false
        },
        fixedTop: {
            type: Boolean,
            default: false
        },
        fixedBottom: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: Boolean,
            default: false
        },
        centered: {
            type: Boolean,
            default: false
        },
        wrapperClass: {
            type: [String, Array, Object]
        },
        closeOnClick: {
            type: Boolean,
            default: true
        },
        mobileBurger: {
            type: Boolean,
            default: true
        },
        spaced: Boolean,
        shadow: Boolean
    },
    emits: ['update:modelValue'],
    data() {
        return {
            internalIsActive: this.modelValue,
            _isNavBar: true // Used internally by NavbarItem
        }
    },
    computed: {
        isOpened() {
            return this.internalIsActive
        },
        computedClasses() {
            return [
                this.type,
                {
                    [FIXED_TOP_CLASS]: this.fixedTop,
                    [FIXED_BOTTOM_CLASS]: this.fixedBottom,
                    [BODY_CENTERED_CLASS]: this.centered,
                    'is-spaced': this.spaced,
                    'has-shadow': this.shadow,
                    'is-transparent': this.transparent
                }
            ]
        }
    },
    watch: {
        modelValue: {
            handler(active) {
                this.internalIsActive = active
            },
            immediate: true
        },
        fixedTop(isSet) {
            // toggle body class only on update to handle multiple navbar
            this.setBodyFixedTopClass(isSet)
        },
        bottomTop(isSet) {
            // toggle body class only on update to handle multiple navbar
            this.setBodyFixedBottomClass(isSet)
        }
    },
    methods: {
        toggleActive() {
            this.internalIsActive = !this.internalIsActive
            this.emitUpdateParentEvent()
        },
        closeMenu() {
            if (this.closeOnClick && this.internalIsActive) {
                this.internalIsActive = false
                this.emitUpdateParentEvent()
            }
        },
        emitUpdateParentEvent() {
            this.$emit('update:modelValue', this.internalIsActive)
        },
        setBodyClass(className) {
            if (typeof window !== 'undefined') {
                document.body.classList.add(className)
            }
        },
        removeBodyClass(className) {
            if (typeof window !== 'undefined') {
                document.body.classList.remove(className)
            }
        },
        checkIfFixedPropertiesAreColliding() {
            const areColliding = this.fixedTop && this.fixedBottom
            if (areColliding) {
                throw new Error('You should choose if the BNavbar is fixed bottom or fixed top, but not both')
            }
        },
        genNavbar() {
            const navBarSlots = [
                this.genNavbarBrandNode(),
                this.genNavbarSlotsNode()
            ]

            if (!isFilled(this.wrapperClass)) {
                return this.genNavbarSlots(navBarSlots)
            }

            // It wraps the slots into a div with the provided wrapperClass prop
            const navWrapper = createElement(
                'div',
                { class: this.wrapperClass },
                navBarSlots
            )

            return this.genNavbarSlots([navWrapper])
        },
        genNavbarSlots(slots) {
            const vnode = createElement(
                'nav',
                {
                    class: ['navbar', this.computedClasses],
                    role: 'navigation',
                    'aria-label': 'main navigation'
                },
                slots
            )
            return withDirectives(vnode, [
                [resolveDirective('click-outside'), this.closeMenu]
            ])
        },
        genNavbarBrandNode() {
            const children = this.$slots.brand != null
                ? [this.$slots.brand(), this.genBurgerNode()]
                : this.genBurgerNode()
            return createElement(
                'div',
                { class: 'navbar-brand' },
                children
            )
        },
        genBurgerNode() {
            if (this.mobileBurger) {
                const defaultBurgerNode = createElement(
                    resolveComponent('navbar-burger'),
                    {
                        isOpened: this.isOpened,
                        onClick: this.toggleActive,
                        onKeyup: (event) => {
                            if (event.keyCode !== 13) return
                            this.toggleActive()
                        }
                    }
                )

                const hasBurgerSlot = !!this.$slots.burger
                return hasBurgerSlot
                    ? this.$slots.burger({
                        isOpened: this.isOpened,
                        toggleActive: this.toggleActive
                    })
                    : defaultBurgerNode
            }
        },
        genNavbarSlotsNode() {
            return createElement(
                'div',
                { class: ['navbar-menu', { 'is-active': this.isOpened }] },
                [
                    this.genMenuPosition('start'),
                    this.genMenuPosition('end')
                ]
            )
        },
        genMenuPosition(positionName) {
            return createElement(
                'div',
                { class: `navbar-${positionName}` },
                this.$slots[positionName] != null
                    ? this.$slots[positionName]()
                    : []
            )
        },
        setBodyFixedTopClass(isSet) {
            this.checkIfFixedPropertiesAreColliding()
            if (isSet) {
                // TODO Apply only one of the classes once PR is merged in Bulma:
                // https://github.com/jgthms/bulma/pull/2737
                this.setBodyClass(BODY_FIXED_TOP_CLASS)
                this.spaced && this.setBodyClass(BODY_SPACED_FIXED_TOP_CLASS)
            } else {
                this.removeBodyClass(BODY_FIXED_TOP_CLASS)
                this.removeBodyClass(BODY_SPACED_FIXED_TOP_CLASS)
            }
        },
        setBodyFixedBottomClass(isSet) {
            this.checkIfFixedPropertiesAreColliding()
            if (isSet) {
                // TODO Apply only one of the classes once PR is merged in Bulma:
                // https://github.com/jgthms/bulma/pull/2737
                this.setBodyClass(BODY_FIXED_BOTTOM_CLASS)
                this.spaced && this.setBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS)
            } else {
                this.removeBodyClass(BODY_FIXED_BOTTOM_CLASS)
                this.removeBodyClass(BODY_SPACED_FIXED_BOTTOM_CLASS)
            }
        }
    },
    beforeMount() {
        this.fixedTop && this.setBodyFixedTopClass(true)
        this.fixedBottom && this.setBodyFixedBottomClass(true)
    },
    beforeUnmount() {
        if (this.fixedTop) {
            const className = this.spaced
                ? BODY_SPACED_FIXED_TOP_CLASS
                : BODY_FIXED_TOP_CLASS
            this.removeBodyClass(className)
        } else if (this.fixedBottom) {
            const className = this.spaced
                ? BODY_SPACED_FIXED_BOTTOM_CLASS
                : BODY_FIXED_BOTTOM_CLASS
            this.removeBodyClass(className)
        }
    },
    render() {
        return this.genNavbar()
    }
}
</script>
