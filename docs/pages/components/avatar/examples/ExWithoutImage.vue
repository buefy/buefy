<template>
    <section>
	    <b-avatar
            :rounded="true"
            :username="username"
            size="128x128"
            :type="type" />
	</section>
</template>

<script>
export default {

  name: 'ExWithoutImage',

  data () {
    return {
      rounded: true,
      username: "MT",
      type: 'has-background-link'
    }
  }
}
</script>

<style lang="css" scoped>
</style>