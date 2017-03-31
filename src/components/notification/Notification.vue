<template>
    <div class="notification" v-show="isActive" :class="!showIcon ? type : null">
        <button class="delete" v-if="closable" @click="close"></button>
        <b-icon
            :icon="icon"
            both
            :class="type"
            size="is-large"
            v-if="icon && showIcon">
        </b-icon>
        <div class="content">
            <div class="title is-5" v-if="title">{{ title }}</div>
            <div v-html="message"></div>
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
            title: String,
            closable: Boolean,
            type: {
                type: String,
                default: 'is-default'
            },
            message: {
                type: String,
                default: ''
            },
            showIcon: Boolean
        },
        data() {
            return {
                isActive: true
            }
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
                this.isActive = false
            }
        }
    }
</script>
