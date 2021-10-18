<template>
    <section>
        <b-backtotop
            type="is-success"
            size="is-medium"
            :duration="500"
            position="is-bottom-right"
            :rounded="false" />
        <b-backtotop
            type="is-danger"
            size="is-medium"
            :duration="500"
            position="is-bottom-left"
            :rounded="false" />
    </section>
</template>

<script>
export default {

  name: 'ExFixedPosition',

}
</script>
