<template>
    <div class="notification" :class="type">
        <button class="delete" v-if="closable" @click="close"></button>
        <b-icon
            :icon="icon"
            both
            size="is-large"
            v-if="icon && hasIcon">
        </b-icon>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import Icon from '../icon'

    export default {
        name: 'bNotification',
        components: {
            [Icon.name]: Icon
        },
        props: {
            closable: {
                type: Boolean,
                default: true
            },
            type: String,
            hasIcon: Boolean
        },
        computed: {
            icon() {
                switch (this.type) {
                    case 'is-info':
                        return 'info'
                    case 'is-success':
                        return 'check_circle'
                    case 'is-warning':
                        return 'warning'
                    case 'is-danger':
                        return 'error'
                    default:
                        return null
                }
            }
        },
        methods: {
            close() {
                this.$emit('close')

                this.$destroy()
                this.$el.remove()
            }
        }
    }
</script>
