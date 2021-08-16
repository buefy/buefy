<template>
	<section>
        <!-- Left -->
        <b-breadcrumb
            size="is-small"
            :items="items"
        />
        <!-- Center -->
        <b-breadcrumb
            size="is-medium"
            :items="items"
        />
        <!-- Right -->
        <b-breadcrumb
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
