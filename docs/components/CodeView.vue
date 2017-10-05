<template>
    <figure class="highlight" :class=" { 'example-code': bordered }">
        <button class="button is-small copy-code">Copy</button>
        <pre v-highlight><code :class="lang">{{ code }}</code></pre>
    </figure>
</template>

<script>
    export default {
        props: {
            lang: {
                type: String,
                default: 'html'
            },
            bordered: Boolean,
            code: String
        }
    }
</script>
