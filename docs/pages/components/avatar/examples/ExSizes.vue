<template>
   <section>
   	    <b-avatar
            v-for="user in data"
            :key="user"
            :rounded="user.rounded"
            :label="user.label"
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
                label: "Jhonedoe",
                type: 'has-background-primary',
                size: 'is-128x128'
            },
            {
                rounded: true,
                label: "AS",
                type: 'has-background-link',
                size: 'is-96x96',
            },
            {
                rounded: true,
                label: "AW",
                type: 'has-background-info',
                size: 'is-64x64'
            },
            {
                rounded: true,
                label: "WB",
                type: 'has-background-success',
                size: 'is-48x48',
                src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shareicon.net%2Fdata%2F2016%2F09%2F01%2F822734_user_512x512.png&f=1&nofb=1'
            },
            {
                rounded: true,
                label: "MS",
                type: 'has-background-warning',
                size: 'is-32x32'
            },
            {
                rounded: true,
                label: "JD",
                type: 'has-background-danger',
                size: "is-24x24"
            },
            {
                rounded: true,
                label: "MA",
                type: 'has-background-dark',
                size: 'is-16x16'
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
