<template>
    <li :role="ariaRoleMenu">
        <component
            :is="tag"
            v-bind="$attrs"
            :class="{
                'is-active': newActive,
                'is-disabled': disabled
            }"
            @click="onClick($event)"
            @click.native="onClick($event)">
            <b-icon
                v-if="icon"
                :icon="icon"
                :pack="iconPack"
                size="is-small"
            />
            <span v-if="label">{{ label }}</span>
            <slot
                v-else
                name="label"
                :expanded="newExpanded"
                :active="newActive"
            />
        </component>
        <!-- sub menu items -->
        <template v-if="$slots.default">
            <transition :name="animation">
                <ul v-show="newExpanded">
                    <slot />
                </ul>
            </transition>
        </template>
    </li>
</template>

<script>
import Icon from '../icon/Icon'

export default {
    name: 'BMenuItem',
    components: {
        [Icon.name]: Icon
    },
    inheritAttrs: false,
    props: {
        label: String,
        active: Boolean,
        expanded: Boolean,
        disabled: Boolean,
        iconPack: String,
        icon: String,
        animation: {
            type: String,
            default: 'fade'
        },
        tag: {
            type: String,
            default: 'a',
            validator: (value) => {
                return [
                    'a',
                    'router-link',
                    'nuxt-link',
                    'n-link',
                    'NuxtLink',
                    'NLink'
                ].indexOf(value) >= 0
            }
        },
        ariaRole: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            newActive: this.active,
            newExpanded: this.expanded
        }
    },
    computed: {
        ariaRoleMenu() {
            return this.ariaRole === 'menuitem' ? this.ariaRole : null
        }
    },
    watch: {
        active(value) {
            this.newActive = value
        },
        expanded(value) {
            this.newExpanded = value
        }
    },
    methods: {
        onClick(event) {
            if (this.disabled) return
            this.reset(this.$parent)
            this.newExpanded = true
            this.$emit('update:expanded', this.newActive)
            this.newActive = true
            this.$emit('update:active', this.newActive)
            this.$emit('click', event)
        },
        reset(parent) {
            const items = parent.$children.filter((c) => c.name === this.name)
            items.forEach((item) => {
                if (item !== this) {
                    this.reset(item)
                    item.newExpanded = false
                    item.$emit('update:expanded', item.newActive)
                    item.newActive = false
                    item.$emit('update:active', item.newActive)
                }
            })
        }
    }
}
</script>
