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
            src="https://picsum.photos/600/400"
            ratio="6by4"
            :rounded="rounded"
        ></b-image>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                rounded: false,
            }
        }
    }
</script>
