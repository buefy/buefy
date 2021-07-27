<template>
    <section>
	    <b-avatar
            :rounded="true"
            :username="username"
            size="128x128"
            :variant="vartiant" />
	</section>
</template>

<script>
export default {

  name: 'ExWithoutImage',

  data () {
    return {
      rounded: true,
      username: "MT",
      variant: 'has-background-link'
    }
  }
}
</script>

<style lang="css" scoped>
</style>