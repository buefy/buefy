<template>
   <section>
   	    <b-avatar
            v-for="user in data"
            :key="user"
            :rounded="user.rounded"
            :username="user.username"
            :size="user.size" 
            :type="user.type" />
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
                type: 'has-background-primary',
                size: '128x128'
            },
            {
                rounded: true,
                username: "MT",
                type: 'has-background-link',
                size: '96x96',
            },
            {
                rounded: true,
                username: "AW",
                type: 'has-background-info',
                size: '64x64'
            },
            {
                rounded: true,
                username: "WB",
                type: 'has-background-success',
                size: '48x48'
            },
            {
                rounded: true,
                username: "MS",
                type: 'has-background-warning',
                size: '32x32'
            },
            {
                rounded: true,
                username: "JD",
                type: 'has-background-danger',
                size: "24x24"
            },
            {
                rounded: true,
                username: "MA",
                type: 'has-background-dark',
                size: '16x16'
            }
        ]
    }
  }
}
</script>

<style lang="css" scoped>
    /*section {
        display: grid;
        grid-template-columns: 130px 130px 130px 130px;
        grid-gap: 10px;
    }*/
</style>