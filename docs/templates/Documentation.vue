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
                    title: 'Documentation',
                    subtitle: 'Learn everything you need to start using Buefy ;)',
                    namespace: 'documentation'
                }
            }
        }
    }
</script>
