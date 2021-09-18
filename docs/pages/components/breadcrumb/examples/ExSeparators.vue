<template>
	<section>
		<!-- Default -->
        <b-breadcrumb>
            <b-breadcrumb-item tag='router-link' to="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item tag='router-link' to="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item tag='router-link' to="/documentation/breadcrumb" active>Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
        <!-- Arrow -->
        <b-breadcrumb
            separator="has-arrow-separator"
        >
            <b-breadcrumb-item href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item href="/documentation/breadcrumb" active>Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
        <!-- Bullet -->
        <b-breadcrumb
            separator="has-bullet-separator"
        >
            <b-breadcrumb-item href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item href="/documentation/breadcrumb" active>Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
        <!-- Dot -->
        <b-breadcrumb
            separator="has-dot-separator"
        >
            <b-breadcrumb-item href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item href="/documentation/breadcrumb" active>Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
        <!-- Succeeds -->
        <b-breadcrumb
            separator="has-succeeds-separator"
        >
            <b-breadcrumb-item href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item href="/documentation/breadcrumb" active>Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
    </section>
</template>

<script>
export default {

  name: 'ExSeparators',

}
</script>
