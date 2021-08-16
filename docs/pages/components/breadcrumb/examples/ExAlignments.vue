<template>
	<section>
        <!-- Left -->
        <b-breadcrumb
            align="is-left"
            :items="items"
        />
        <!-- Center -->
        <b-breadcrumb
            align="is-centered"
            :items="items"
        />
        <!-- Right -->
        <b-breadcrumb
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
                    disabled: true
                },
                {
                    label: 'Docs',
                    path: '/documentation',
                    disabled: true
                },
                {
                    label: 'Breadcrumb',
                    path: '/documentation/breadcrumb',
                    disabled: true
                }
            ]
        }
    }
}
</script>

<style lang="css" scoped>
</style>