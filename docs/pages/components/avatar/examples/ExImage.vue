<template>
	<section>
	    <b-avatar
            v-for="user in data"
            :key="user"
            :rounded="user.rounded"
            :src="user.src"
            size="128x128" />
	</section>
</template>

<script>
export default {

  name: 'ExImage',

  data () {
    return {
        data: [
            {
                rounded: true,
                label: "Jhonedoe",
                src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shareicon.net%2Fdata%2F2016%2F09%2F01%2F822734_user_512x512.png&f=1&nofb=1'
            },
            {
                rounded: true,
                src: 'https://avatarfiles.alphacoders.com/108/thumb-1920-108886.gif'
            },
            {
                rounded: true,
                src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F124%2F124872.jpg&f=1&nofb=1'
            },
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
