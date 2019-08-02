<template>
    <section>
        <b-field grouped>
            <b-switch v-model="isRounded">Rounded</b-switch>
            <b-switch v-model="isOutlined">Outlined</b-switch>
        </b-field>
        <b-switch
            :rounded="isRounded"
            :outlined="isOutlined">Sample</b-switch>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isRounded: false,
                isOutlined: false,
            }
        }
    }
</script>
