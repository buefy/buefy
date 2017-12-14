<template>
    <section>
        <div class="field">
            <b-radio v-model="radio"
                size="is-small"
                native-value="small">
                Small
            </b-radio>
        </div>
        <div class="field">
            <b-radio v-model="radio"
                native-value="default">
                Default
            </b-radio>
        </div>
        <div class="field">
            <b-radio v-model="radio"
                size="is-medium"
                native-value="medium">
                Medium
            </b-radio>
        </div>
        <div class="field">
            <b-radio v-model="radio"
                size="is-large"
                native-value="large">
                Large
            </b-radio>
        </div>
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
