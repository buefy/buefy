<template>
    <section>
        <!-- Left -->
        <b-breadcrumb
            size="is-small"
        >
            <b-breadcrumb-item tag="router-link" to="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item tag="router-link" to="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item
                tag="router-link"
                to="/documentation/breadcrumb"
                active
            >
                Breadcrumb
            </b-breadcrumb-item>
        </b-breadcrumb>
        <!-- Center -->
        <b-breadcrumb
            size="is-medium"
        >
            <b-breadcrumb-item href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item href="/documentation/breadcrumb" active>
                Breadcrumb
            </b-breadcrumb-item>
        </b-breadcrumb>
        <!-- Right -->
        <b-breadcrumb
            size="is-large"
        >
            <b-breadcrumb-item href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item href="/documentation/breadcrumb" active>
                Breadcrumb
            </b-breadcrumb-item>
        </b-breadcrumb>
    </section>
</template>

<script>
export default {

    name: 'ExSizes'

}
</script>
