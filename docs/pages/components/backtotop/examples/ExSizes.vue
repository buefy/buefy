<template>
    <section>
        <b-backtotop
            type="is-dark"
            size="is-small"
            :duration="500" />
        <br>
        <b-backtotop
            type="is-dark"
            size="is-medium"
            :duration="500"
            outlined />
        <br>
        <b-backtotop
            type="is-dark"
            size="is-large"
            :duration="500"
            inverted />
    </section>
</template>

<script>
export default {

  name: 'ExSizes',

}
</script>
