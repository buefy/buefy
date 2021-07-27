<template>
   <section>
   	    <b-avatar
            v-for="user in data"
            :key="user"
            :rounded="user.rounded"
            :username="user.username"
            :size="user.size"
            :src="user.src" 
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
                username: "AS",
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
                size: '48x48',
                src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shareicon.net%2Fdata%2F2016%2F09%2F01%2F822734_user_512x512.png&f=1&nofb=1'
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
