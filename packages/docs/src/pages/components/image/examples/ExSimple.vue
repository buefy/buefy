<template>
    <section>
        <div class="block">
            <b-field grouped group-multiline>
                <div class="control">
                    <b-switch v-model="rounded"> Rounded </b-switch>
                </div>
            </b-field>
        </div>

        <b-image
            :src="buefyLogo"
            alt="The Buefy Logo"
            ratio="601by235"
            :rounded="rounded"
        ></b-image>
        <b-image
            src="https://picsum.photos/600/400"
            alt="A random image"
            ratio="6by4"
            :rounded="rounded"
        ></b-image>
    </section>
</template>

<script>
    const buefyLogo = new URL('/src/assets/buefy.png', import.meta.url).href

    export default {
        data() {
            return {
                rounded: false,
                buefyLogo,
            }
        }
    }
</script>
