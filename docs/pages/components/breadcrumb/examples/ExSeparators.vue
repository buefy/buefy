<template>
	<section>
		<!-- Default -->
        <b-breadcrumb
            tag="router-link"
            separator=""
            :items="items"
        />
        <!-- Arrow -->
        <b-breadcrumb
            tag="router-link"
            separator="has-arrow-separator"
            :items="items"
        />
        <!-- Bullet -->
        <b-breadcrumb
            tag="router-link"
            separator="has-bullet-separator"
            :items="items"
        />
        <!-- Dot -->
        <b-breadcrumb
            tag="router-link"
            separator="has-dot-separator"
            :items="items"
        />
        <!-- Succeeds -->
        <b-breadcrumb
            tag="router-link"
            separator="has-succeeds-separator"
            :items="items"
        />
    </section>
</template>

<script>
export default {

  name: 'ExSeparators',

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
