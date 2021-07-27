<template>
   <section>
   	    <b-avatar
            v-for="user in data"
            :key="user"
            :rounded="user.rounded"
            :username="user.username"
            :size="user.size" 
            :variant="user.variant" />
   </section>
</template>

<script>
export default {

  name: 'ExSizes',

  data () {
    return {
        data: [
            {
                rounded: true,
                username: "Jhonedoe",
                variant: 'has-background-primary',
                size: '128x128'
            },
            {
                rounded: true,
                username: "MT",
                variant: 'has-background-link',
                size: '96x96',
            },
            {
                rounded: true,
                username: "AW",
                variant: 'has-background-info',
                size: '64x64'
            },
            {
                rounded: true,
                username: "WB",
                variant: 'has-background-success',
                size: '48x48'
            },
            {
                rounded: true,
                username: "MS",
                variant: 'has-background-warning',
                size: '34x34'
            },
            {
                rounded: true,
                username: "JD",
                variant: 'has-background-danger',
                size: "24x48"
            },
            {
                rounded: true,
                username: "MA",
                variant: 'has-background-dark',
                size: '16x16'
            }
        ]
    }
  }
}
</script>

<style lang="css" scoped>
    section {
        display: grid;
        grid-template-columns: 130px 130px 130px 130px;
        grid-gap: 10px;
    }
</style>