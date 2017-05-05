<template>
    <li v-if="subheader"
        class="option is-subheader">
        <b-icon
            v-if="icon"
            :icon="icon"
            :pack="iconPack">
        </b-icon>
        <span v-html="newLabel"></span>
    </li>
    <li v-else-if="disabled"
        class="option is-disabled">
        <b-icon
            v-if="icon"
            :icon="icon"
            :pack="iconPack">
        </b-icon>
        <span v-html="newLabel"></span>
    </li>
    <li v-else-if="separator"
        class="option is-separator">
        <b-icon
            v-if="icon"
            :icon="icon"
            :pack="iconPack">
        </b-icon>
        <span v-html="newLabel"></span>
    </li>
    <li v-else
        class="option"
        :class="{ 'is-selected': value === $parent.$parent.selected }"
        @click="$parent.$parent.selectOption(value)">
        <b-icon
            v-if="icon"
            :icon="icon"
            :pack="iconPack">
        </b-icon>
        <span v-html="newLabel"></span>
    </li>
</template>

<script>
    import Icon from '../icon'

    export default {
        name: 'bDropdownOption',
        components: {
            [Icon.name]: Icon
        },
        props: {
            value: [String, Number],
            label: String,
            separator: Boolean,
            disabled: Boolean,
            subheader: Boolean,
            icon: String,
            iconPack: String
        },
        computed: {
            hasLabel() {
                return (this.$slots.default !== undefined && this.$slots.default.length > 0) || this.label
            },
            newLabel() {
                return this.hasLabel
                    ? this.label || this.$slots.default[0].text.trim()
                    : this.value
            }
        },
        created() {
            // $parent is actually the transition-group
            if (!this.$parent.$parent.isDropdownComponent) {
                this.$destroy()
                throw new Error('You should wrap bDropdownOption on a bDropdown')
            }
        }
    }
</script>
