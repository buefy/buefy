<template>
	<section>
		<!-- Default -->
        <b-breadcrumb
            tag="router-link"
            separator=""
        >
            <b-breadcrumb-item tag='a' href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' active href="/documentation/breadcrumb">Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
        <!-- Arrow -->
        <b-breadcrumb
            tag="router-link"
            separator="has-arrow-separator"
        >
            <b-breadcrumb-item tag='a' href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' active href="/documentation/breadcrumb">Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
        <!-- Bullet -->
        <b-breadcrumb
            tag="router-link"
            separator="has-bullet-separator"
        >
            <b-breadcrumb-item tag='a' href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' active href="/documentation/breadcrumb">Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
        <!-- Dot -->
        <b-breadcrumb
            tag="router-link"
            separator="has-dot-separator"
        >
            <b-breadcrumb-item tag='a' href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' active href="/documentation/breadcrumb">Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
        <!-- Succeeds -->
        <b-breadcrumb
            tag="router-link"
            separator="has-succeeds-separator"
        >
            <b-breadcrumb-item tag='a' href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' active href="/documentation/breadcrumb">Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
    </section>
</template>

<script>
export default {

  name: 'ExSeparators',

}
</script>
