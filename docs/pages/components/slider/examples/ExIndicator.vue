<template>
    <section>
        <b-field>
            <b-slider v-model="value" indicator :tooltip="false" :max="1000"></b-slider>
        </b-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                value: 600
            }
        }
    }
</script>
