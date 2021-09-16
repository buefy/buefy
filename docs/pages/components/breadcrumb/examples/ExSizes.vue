<template>
	<section>
        <!-- Left -->
        <b-breadcrumb
            tag="router-link"
            size="is-small"
        >
            <b-breadcrumb-item tag='a' href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' active href="/documentation/breadcrumb">Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
        <!-- Center -->
        <b-breadcrumb
            tag="router-link"
            size="is-medium"
        >
            <b-breadcrumb-item tag='a' href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' active href="/documentation/breadcrumb">Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
        <!-- Right -->
        <b-breadcrumb
            tag="router-link"
            size="is-large"
        >
            <b-breadcrumb-item tag='a' href="/">Home</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' href="/documentation">Docs</b-breadcrumb-item>
            <b-breadcrumb-item tag='a' active href="/documentation/breadcrumb">Breadcrumb</b-breadcrumb-item>
        </b-breadcrumb>
    </section>
</template>

<script>
export default {

  name: 'ExSizes',

}
</script>
