<template>
    <section>
        <b-image
            src="https://picsum.photos/id/error/600/400"
            alt="A problematic image"
            ratio="6by4"
            @load="onLoad"
            @error="onError"
        ></b-image>
        <br>
        <b-image
            src="https://picsum.photos/id/error/600/400"
            src-fallback="https://picsum.photos/id/237/600/400"
            ratio="6by4"
            @load="onLoad"
            @error="onError"
        ></b-image>
        <pre style="max-height: 400px"><b>Events:</b>{{ events }}</pre>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                events: [],
            }
        },
        methods: {
            onLoad(event, src) {
                this.events.push(`${src} loaded`)
            },
            onError(event, src) {
                this.events.push(`${src} fails to load`)
            }
        }
    }
</script>
