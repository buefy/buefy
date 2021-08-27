<template>
	<section>
        <!-- Left -->
        <b-breadcrumb
            tag="router-link"
            size="is-small"
            :items="items"
        />
        <!-- Center -->
        <b-breadcrumb
            tag="router-link"
            size="is-medium"
            :items="items"
        />
        <!-- Right -->
        <b-breadcrumb
            tag="router-link"
            size="is-large"
            :items="items"
        />
    </section>
</template>

<script>
export default {

  name: 'ExSizes',

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
