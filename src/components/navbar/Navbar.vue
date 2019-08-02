<template>
    <nav
        class="navbar"
        role="navigation"
        aria-label="main navigation"
        :class="computedClasses"
    >
        <div class="navbar-brand">
            <slot name="brand"/>
            <slot name="burger" v-bind="{ isOpened, toggleActive }">
                <navbar-burger @click.native="toggleActive" :is-opened="isOpened"/>
            </slot>
        </div>
        <div class="navbar-menu" :class="{ 'is-active': isOpened }">
            <div class="navbar-start">
                <slot name="start" />
            </div>
            <div class="navbar-end">
                <slot name="end" />
            </div>
        </div>
    </nav>
</template>

<script>
import NavbarBurger from './NavbarBurger.vue'

const FIXED_TOP_CLASS = 'is-fixed-top'
const FIXED_BOTTOM_CLASS = 'is-fixed-bottom'

export default {
    name: 'BNavbar',
    components: {
        NavbarBurger
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
        }
    },
    data() {
        return {
            internalIsActive: this.isActive
        }
    },
    computed: {
        isOpened() {
            return this.internalIsActive
        },
        computedClasses() {
            return [
                this.type,
                { [FIXED_TOP_CLASS]: this.fixedTop },
                { [FIXED_BOTTOM_CLASS]: this.fixedBottom }
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
                    return this.setBodyClass(FIXED_TOP_CLASS)
                }
                this.removeBodyClass(FIXED_TOP_CLASS)
            },
            immediate: true
        },
        fixedBottom: {
            handler(isSet) {
                this.checkIfFixedPropertiesAreColliding()
                if (isSet) {
                    return this.setBodyClass(FIXED_BOTTOM_CLASS)
                }
                this.removeBodyClass(FIXED_BOTTOM_CLASS)
            },
            immediate: true
        }
    },
    methods: {
        toggleActive() {
            this.internalIsActive = !this.internalIsActive
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
        }
    },
    beforeDestroy() {
        this.removeBodyClass(FIXED_BOTTOM_CLASS)
        this.removeBodyClass(FIXED_TOP_CLASS)
    }
}
</script>
