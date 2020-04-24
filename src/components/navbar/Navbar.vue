<script>
import NavbarBurger from './NavbarBurger.vue'
import clickOutside from '../../directives/clickOutside'

const FIXED_TOP_CLASS = 'is-fixed-top'
const BODY_FIXED_TOP_CLASS = 'has-navbar-fixed-top'
const BODY_SPACED_FIXED_TOP_CLASS = 'has-spaced-navbar-fixed-top'
const FIXED_BOTTOM_CLASS = 'is-fixed-bottom'
const BODY_FIXED_BOTTOM_CLASS = 'has-navbar-fixed-bottom'
const BODY_SPACED_FIXED_BOTTOM_CLASS = 'has-spaced-navbar-fixed-bottom'

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
        isActive: {
            type: Boolean,
            default: false
        },
        wrapperClass: {
            type: String
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
    data() {
        return {
            internalIsActive: this.isActive,
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
                    'is-spaced': this.spaced,
                    'has-shadow': this.shadow,
                    'is-transparent': this.transparent
                }
            ]
        }
    },
    watch: {
        isActive: {
            handler(isActive) {
                this.internalIsActive = isActive
            },
            immediate: true
        },
        fixedTop: {
            handler(isSet) {
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
            immediate: true
        },
        fixedBottom: {
            handler(isSet) {
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
            },
            immediate: true
        }
    },
    methods: {
        toggleActive() {
            this.internalIsActive = !this.internalIsActive
            this.emitUpdateParentEvent()
        },
        closeMenu() {
            if (this.closeOnClick) {
                this.internalIsActive = false
                this.emitUpdateParentEvent()
            }
        },
        emitUpdateParentEvent() {
            this.$emit('update:isActive', this.internalIsActive)
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
        genNavbar(createElement) {
            let navBarSlots = [
                this.genNavbarBrandNode(createElement),
                this.genNavbarSlotsNode(createElement)
            ]

            if (!isFilled(this.wrapperClass)) {
                return this.genNavbarSlots(createElement, navBarSlots)
            }

            // It wraps the slots into a div with the provided wrapperClass prop
            const navWrapper = createElement('div', {
                class: this.wrapperClass
            }, navBarSlots)

            return this.genNavbarSlots(createElement, [navWrapper])
        },
        genNavbarSlots(createElement, slots) {
            return createElement('nav', {
                staticClass: 'navbar',
                class: this.computedClasses,
                attrs: {
                    role: 'navigation',
                    'aria-label': 'main navigation'
                },
                directives: [
                    {
                        name: 'click-outside',
                        value: this.closeMenu
                    }
                ]
            }, slots)
        },
        genNavbarBrandNode(createElement) {
            return createElement('div', {
                class: 'navbar-brand'
            }, [this.$slots.brand, this.genBurgerNode(createElement)])
        },
        genBurgerNode(createElement) {
            if (this.mobileBurger) {
                const defaultBurgerNode = createElement('navbar-burger', {
                    props: {
                        isOpened: this.isOpened
                    },
                    on: {
                        click: this.toggleActive
                    }
                })

                const hasBurgerSlot = !!this.$scopedSlots.burger
                return hasBurgerSlot
                    ? this.$scopedSlots.burger({
                        isOpened: this.isOpened,
                        toggleActive: this.toggleActive
                    })
                    : defaultBurgerNode
            }
        },
        genNavbarSlotsNode(createElement) {
            return createElement('div', {
                staticClass: 'navbar-menu',
                class: { 'is-active': this.isOpened }
            }, [this.genMenuPosition(createElement, 'start'), this.genMenuPosition(createElement, 'end')])
        },
        genMenuPosition(createElement, positionName) {
            return createElement('div', {
                staticClass: `navbar-${positionName}`
            }, this.$slots[positionName])
        }
    },
    beforeDestroy() {
        if (this.fixedTop) {
            const className = this.spaced
                ? BODY_SPACED_FIXED_TOP_CLASS : BODY_FIXED_TOP_CLASS
            this.removeBodyClass(className)
        } else if (this.fixedBottom) {
            const className = this.spaced
                ? BODY_SPACED_FIXED_BOTTOM_CLASS : BODY_FIXED_BOTTOM_CLASS
            this.removeBodyClass(className)
        }
    },
    render(createElement, fn) {
        return this.genNavbar(createElement)
    }
}
</script>
