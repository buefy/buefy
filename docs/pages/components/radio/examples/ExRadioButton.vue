<template>
    <section>
        <b-field>
            <b-radio-button v-model="radioButton"
                native-value="Nope"
                type="is-danger">
                <b-icon icon="close"></b-icon>
                <span>Nope</span>
            </b-radio-button>

            <b-radio-button v-model="radioButton"
                native-value="Yep"
                type="is-success">
                <b-icon icon="check"></b-icon>
                <span>Yep</span>
            </b-radio-button>

            <b-radio-button v-model="radioButton"
                native-value="Default">
                Default
            </b-radio-button>

            <b-radio-button v-model="radioButton"
                native-value="Disabled"
                disabled>
                Disabled
            </b-radio-button>
        </b-field>
        <p class="content">
            <b>Selection:</b>
            {{ radioButton }}
        </p>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                radioButton: ''
            }
        }
    }
</script>
