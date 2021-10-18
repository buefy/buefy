<template>
	<section id="types">
        <b-backtotop
            type="is-primary"
            size="is-medium"
            :duration="500" />
        <b-backtotop
            type="is-link"
            size="is-medium"
            :duration="500" />
        <b-backtotop
            type="is-danger"
            size="is-medium"
            :duration="500" />
        <b-backtotop
            type="is-success"
            size="is-medium"
            :duration="500" />
        <b-backtotop
            type="is-dark"
            size="is-medium"
            :duration="500" />
        <b-backtotop
            type="is-warning"
            size="is-medium"
            :duration="500" />
        <b-backtotop
            type="is-info"
            size="is-medium"
            :duration="500" />
    </section>
</template>

<script>
export default {

  name: 'ExTypes',

}
</script>
<style>
    #types {
        display: grid;
        grid-template-columns: repeat(7,50px);
        grid-gap: 5px;
    }
</style>
