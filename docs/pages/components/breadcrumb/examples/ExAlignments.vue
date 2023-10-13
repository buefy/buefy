<template>
    <section>
        <!-- Left -->
        <b-breadcrumb
            align="is-left"
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
            align="is-centered"
        >
            <b-breadcrumb-item href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item href="/documentation/breadcrumb" active>
                Breadcrumb
            </b-breadcrumb-item>
        </b-breadcrumb>
        <!-- Right -->
        <b-breadcrumb
            align="is-right"
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

    name: 'ExAlignments'

}
</script>
