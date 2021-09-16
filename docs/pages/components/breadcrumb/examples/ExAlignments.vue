<template>
	<section>
        <!-- Left -->
        <b-breadcrumb
            tag="router-link"
            align="is-left"
        >
            <b-breadcrumb-item tag='a' href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' active href="/documentation/breadcrumb">Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
        <!-- Center -->
        <b-breadcrumb
            tag="router-link"
            align="is-centered"
        >
            <b-breadcrumb-item tag='a' href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' active href="/documentation/breadcrumb">Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
        <!-- Right -->
        <b-breadcrumb
            tag="router-link"
            align="is-right"
        >
            <b-breadcrumb-item tag='a' href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' active href="/documentation/breadcrumb">Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
    </section>
</template>

<script>
export default {

  name: 'ExAlignments',

}
</script>
