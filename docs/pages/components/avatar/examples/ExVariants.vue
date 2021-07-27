<template>
    <section>
        <b-avatar
            v-for="user in data"
            :key="user"
            :rounded="user.rounded"
            :username="user.username"
            size="48x48"
            :variant="user.variant" />
       
    </section>
</template>

<script>
export default {

  name: 'ExVariants',

  data () {
    return {
        data: [
            {
                rounded: true,
                username: "Jhonedoe",
                variant: 'has-background-primary'
            },
            {
                rounded: true,
                username: "MT",
                variant: 'has-background-link'
            },
            {
                rounded: true,
                username: "AW",
                variant: 'has-background-info'
            },
            {
                rounded: true,
                username: "WB",
                variant: 'has-background-success'
            },
            {
                rounded: true,
                username: "MS",
                variant: 'has-background-warning'
            },
            {
                rounded: true,
                username: "JD",
                variant: 'has-background-danger'
            },
            {
                rounded: true,
                username: "MA",
                variant: 'has-background-dark'
            },
            {
                rounded: true,
                username: "WO",
                variant: 'has-background-black'
            }
        ]
    }
  }
}
</script>

<style lang="css" scoped>
    section {
    	display: grid;
    	grid-template-columns: 60px 60px 60px 60px;
    	grid-gap: 10px;
    }
</style>