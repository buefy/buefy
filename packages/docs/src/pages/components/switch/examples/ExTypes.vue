<template>
    <section>
        <b-field>
            <b-switch :model-value="true">
                Default
            </b-switch>
        </b-field>
        <b-field>
            <b-switch :model-value="true"
            type="is-info">
                Info
            </b-switch>
        </b-field>
        <b-field>
            <b-switch :model-value="true"
            type="is-success">
                Success
            </b-switch>
        </b-field>
        <b-field>
            <b-switch :model-value="true"
            type="is-danger">
                Danger
            </b-switch>
        </b-field>
        <b-field>
            <b-switch :model-value="true"
            type="is-warning">
                Warning
            </b-switch>
        </b-field>
        <b-field>
            <b-switch
                v-model="lightMode"
                passive-type='is-dark'
                type='is-warning'>
                {{ lightMode ? "Light Mode" : "Dark Mode" }}
            </b-switch>
        </b-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            lightMode: false
        }
    }
}
</script>
