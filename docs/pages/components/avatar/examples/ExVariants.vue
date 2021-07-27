<template>
    <section>
        <b-avatar
            v-for="user in data"
            :key="user"
            :rounded="user.rounded"
            :username="user.username"
            size="48x48"
            :type="user.type" />
       
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
                type: 'has-background-primary'
            },
            {
                rounded: true,
                username: "MT",
                type: 'has-background-link'
            },
            {
                rounded: true,
                username: "AW",
                type: 'has-background-info'
            },
            {
                rounded: true,
                username: "WB",
                type: 'has-background-success'
            },
            {
                rounded: true,
                username: "MS",
                type: 'has-background-warning'
            },
            {
                rounded: true,
                username: "JD",
                type: 'has-background-danger'
            },
            {
                rounded: true,
                username: "MA",
                type: 'has-background-dark'
            },
            {
                rounded: true,
                username: "WO",
                type: 'has-background-black'
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