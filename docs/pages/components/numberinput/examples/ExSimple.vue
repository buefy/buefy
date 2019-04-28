<template>
    <section>
        <b-field>
            <b-numberinput v-model="number"></b-numberinput>
        </b-field>
 
        <b-field label="Input readonly">
            <b-numberinput :editable="false"></b-numberinput>
        </b-field>

        <b-field label="Disabled">
            <b-numberinput disabled></b-numberinput>
        </b-field>

        <b-field label="Rounded">
            <b-numberinput rounded></b-numberinput>
        </b-field>

        <b-field label="Loading">
            <b-numberinput loading></b-numberinput>
        </b-field>

        <b-field label="Quantity"
            type="is-danger"
            message="Quantity is invalid">
            <b-numberinput></b-numberinput>
        </b-field>

        <b-field label="Rate"
            type="is-success"
            message="Rate is valid">
            <b-numberinput></b-numberinput>
        </b-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                number: 10
            }
        }
    }
</script>
