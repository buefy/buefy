<template>
	<section>
        <!-- Left -->
        <b-breadcrumb
            tag="router-link"
            align="is-left"
            :items="items"
        />
        <!-- Center -->
        <b-breadcrumb
            tag="router-link"
            align="is-centered"
            :items="items"
        />
        <!-- Right -->
        <b-breadcrumb
            tag="router-link"
            align="is-right"
            :items="items"
        />
    </section>
</template>

<script>
export default {

  name: 'ExAlignments',

    data () {
        return {
            items: [
                {
                    label: 'Home',
                    path: '/',
                },
                {
                    label: 'Docs',
                    path: '/documentation',
                },
                {
                    label: 'Breadcrumb',
                    path: '/documentation/breadcrumb',
                }
            ]
        }
    }
}
</script>

<style lang="css" scoped>
</style>