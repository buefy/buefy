<template>
    <transition :name="transitionName">
        <div v-show="isActive" class="tab-item">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'bTabItem',
        props: {
            label: String,
            icon: String
        },
        data() {
            return {
                isActive: false,
                transitionName: ''
            }
        },
        methods: {
            activate(oldIndex, index) {
                this.transitionName = index < oldIndex
                    ? 'slide-next'
                    : 'slide-prev'
                this.isActive = true
            },
            deactivate(oldIndex, index) {
                this.transitionName = index < oldIndex
                    ? 'slide-next'
                    : 'slide-prev'
                this.isActive = false
            }
        },
        created() {
            if (!this.$parent.isTabsComponent) {
                this.$destroy()
                throw new Error('You should wrap bTabItem on a bTabs')
            }

            this.$parent.tabItems.push(this)
        }
    }
</script>
