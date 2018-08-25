<template>
    <li>
        <a
            href="javascript:void(0)"
            @click="toggle">
            <b-icon
                :icon="icon"
                size="is-small"
                style="margin-right: 10px" />
            <span>{{ title }}</span>
            <b-icon
                :icon="expand ? 'chevron-up' : 'chevron-down'"
                style="float: right" />
        </a>
        <ul v-show="expand" class="submenu">
            <slot />
        </ul>
    </li>
</template>

<script>

    export default {
        name: 'BSubmenu',
        props: {
            title: String,
            icon: String
        },
        data() {
            return {
                expand: false
            }
        },
        methods: {
            toggle() {
                this.$parent.$children.every((item) => {
                    if (item !== this && item.$options.name === 'BSubmenu') {
                        item.expand = false
                    }
                    return true
                })
                this.expand = !this.expand
            }
        }
    }

</script>
