<template>
    <DefaultTemplate v-bind="props"/>
</template>

<script>
    import DefaultTemplate from '@/components/DefaultTemplate'

    export default {
        components: {
            DefaultTemplate
        },
        data() {
            return {
                props: {
                    title: 'Extensions',
                    subtitle: 'See how you can improve Buefy with other packages!',
                    namespace: 'extensions'
                }
            }
        }
    }
</script>
