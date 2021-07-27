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
                username: "Jhonedoe",
                src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F124%2F124872.jpg&f=1&nofb=1'
            },
            {
                rounded: true,
                username: "MT",
                src: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Favatarfiles.alphacoders.com%2F124%2F124872.jpg&f=1&nofb=1'
            },
            {
                rounded: true,
                username: "MT",
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