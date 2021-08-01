<template>
    <section>
        <b-avatar
            v-for="user in data"
            :key="user"
            :rounded="user.rounded"
            :label="user.label"
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
                label: "Je",
                type: 'has-background-primary'
            },
            {
                rounded: true,
                label: "EB",
                type: 'has-background-link'
            },
            {
                rounded: true,
                label: "AB",
                type: 'has-background-info'
            },
            {
                rounded: true,
                label: "CC",
                type: 'has-background-success'
            },
            {
                rounded: true,
                label: "BA",
                type: 'has-background-warning'
            },
            {
                rounded: true,
                label: "OR",
                type: 'has-background-danger'
            },
            {
                rounded: true,
                label: "WR",
                type: 'has-background-dark'
            },
            {
                rounded: true,
                label: "WO",
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
