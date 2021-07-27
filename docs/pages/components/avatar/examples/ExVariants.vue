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
                username: "Je",
                type: 'has-background-primary'
            },
            {
                rounded: true,
                username: "EB",
                type: 'has-background-link'
            },
            {
                rounded: true,
                username: "AB",
                type: 'has-background-info'
            },
            {
                rounded: true,
                username: "CC",
                type: 'has-background-success'
            },
            {
                rounded: true,
                username: "BA",
                type: 'has-background-warning'
            },
            {
                rounded: true,
                username: "OR",
                type: 'has-background-danger'
            },
            {
                rounded: true,
                username: "WR",
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
