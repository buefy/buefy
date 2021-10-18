<template>
    <section id="samples">
         <b-backtotop
            type="is-danger"
            size="is-medium"
            :duration="500" />
        <b-backtotop
            type="is-info"
            size="is-medium"
            label="Back To Top"
            :duration="500" />
    </section>
</template>

<script>
export default {

  name: 'ExSample',

}
</script>
<style>
	#samples {
        display: grid;
        grid-template-columns: repeat(5,50px);
        grid-gap: 5px;
    }
</style>