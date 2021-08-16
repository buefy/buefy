<template>
	<section>
		<!-- Default -->
        <b-breadcrumb
            separator=""
            :items="items"
        />
        <!-- Arrow -->
        <b-breadcrumb
            separator="has-arrow-separator"
            :items="items"
        />
        <!-- Bullet -->
        <b-breadcrumb
            separator="has-bullet-separator"
            :items="items"
        />
        <!-- Dot -->
        <b-breadcrumb
            separator="has-dot-separator"
            :items="items"
        />
        <!-- Succeeds -->
        <b-breadcrumb
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
