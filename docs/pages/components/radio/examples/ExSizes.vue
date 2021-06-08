<template>
    <section>
        <b-field>
            <b-radio v-model="radio"
                size="is-small"
                native-value="small">
                Small
            </b-radio>
        </b-field>
        <b-field>
            <b-radio v-model="radio"
                native-value="default">
                Default
            </b-radio>
        </b-field>
        <b-field>
            <b-radio v-model="radio"
                size="is-medium"
                native-value="medium">
                Medium
            </b-radio>
        </b-field>
        <b-field>
            <b-radio v-model="radio"
                size="is-large"
                native-value="large">
                Large
            </b-radio>
        </b-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                radio: 'default'
            }
        }
    }
</script>
