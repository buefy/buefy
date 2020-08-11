<template>
    <section>
        <p>Source loaded: {{loadedSrc1}}</p>
        <b-image
            src="https://picsum.photos/id/237/800/450.webp"
            webp-fallback=".jpg"
            ratio="16by9"
            @load="onLoad1"
        ></b-image>
        <br>
        <p>Source loaded: {{loadedSrc2}}</p>
        <b-image
            src="https://picsum.photos/id/237/800/450.webp"
            webp-fallback="https://picsum.photos/id/1025/800/450.jpg"
            ratio="16by9"
            @load="onLoad2"
        ></b-image>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                loadedSrc1: '',
                loadedSrc2: '',
            }
        },
        methods: {
            onLoad1(event, src) {
                this.loadedSrc1 = src
            },
            onLoad2(event, src) {
                this.loadedSrc2 = src
            }
        }
    }
</script>
