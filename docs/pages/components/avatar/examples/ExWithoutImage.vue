<template>
    <section>
	    <b-avatar
            :rounded="true"
            :label="label"
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
      label: "MT",
      type: 'has-background-link'
    }
  }
}
</script>

<style lang="css" scoped>
</style>
