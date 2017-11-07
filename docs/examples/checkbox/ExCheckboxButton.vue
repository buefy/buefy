<template>
    <section>
        <b-field>
            <b-checkbox-button v-model="checkboxGroup"
                native-value="Nop"
                type="is-danger">
                <b-icon icon="close"></b-icon>
                <span>Nop</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="checkboxGroup"
                native-value="Yep"
                type="is-success">
                <b-icon icon="check"></b-icon>
                <span>Yep</span>
            </b-checkbox-button>

            <b-checkbox-button v-model="checkboxGroup"
                native-value="Default">
                Default
            </b-checkbox-button>

            <b-checkbox-button v-model="checkboxGroup"
                native-value="Disabled"
                disabled>
                Disabled
            </b-checkbox-button>
        </b-field>
        <p class="content">
            <b>Selection:</b>
            {{ checkboxGroup }}
        </p>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                checkboxGroup: []
            }
        }
    }
</script>
