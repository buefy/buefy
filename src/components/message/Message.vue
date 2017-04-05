<template>
    <article class="message" v-show="isActive" :class="type">
        <div class="message-header" v-if="title">
            <p>{{ title }}</p>
            <button class="delete" v-if="closable" @click="close"></button>
        </div>
        <div class="message-body">
            <b-icon
                :icon="icon"
                both
                :class="type"
                size="is-large"
                v-if="icon && hasIcon">
            </b-icon>
            <p><slot></slot></p>
        </div>
    </article>
</template>

<script>
    import Icon from '../icon'

    export default {
        name: 'bMessage',
        components: {
            [Icon.name]: Icon
        },
        props: {
            title: String,
            closable: {
                type: Boolean,
                default: true
            },
            type: String,
            hasIcon: Boolean
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
                this.$emit('close')
            }
        }
    }
</script>
