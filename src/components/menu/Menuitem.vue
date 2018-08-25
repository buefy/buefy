<template>
    <li>
        <router-link
            v-if="to"
            :to="to"
            active-class="is-active"
            @click.native="handleClick">
            <b-icon
                :icon="icon"
                size="is-small"
                style="margin-right: 10px" />
            <span>{{ title }}</span>
        </router-link>
        <a
            v-else
            href="javascript:void(0)"
            :class="{'is-active': isActive}"
            @click="handleClick">
            <b-icon
                :icon="icon"
                size="is-small"
                style="margin-right: 10px" />
            <span>{{ title }}</span>
        </a>
    </li>
</template>

<script>

    export default {
        name: 'BMenuitem',
        props: {
            to: String,
            icon: String,
            title: String
        },
        data() {
            return {
                isActive: false
            }
        },
        methods: {
            handleClick() {
                let parent = this.$parent
                let isSubmenu = false

                if (parent.$options.name === 'BSubmenu') {
                    isSubmenu = true
                    parent = parent.$parent
                }

                parent.$children.every((item) => {
                    if (item.$options.name === 'BMenuitem') {
                        if (item !== this) {
                            item.isActive = false
                        }
                    } else if (item.$options.name === 'BSubmenu') {
                        if (!isSubmenu) {
                            item.expand = false
                        }
                        item.$slots['default'].every((sitem) => {
                            if (sitem.child && sitem.child.$options.name === 'BMenuitem' && sitem.child !== this) {
                                sitem.child.isActive = false
                            }
                            return true
                        })
                    }
                    return true
                })

                this.isActive = true

                if (!this.to) {
                    setTimeout(() => {
                        this.$emit('click')
                    }, 100)
                }
            }
        },
        mounted() {
        }
    }

</script>
