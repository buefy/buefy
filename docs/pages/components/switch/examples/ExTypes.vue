<template>
    <section>
        <div class="field">
            <b-switch :value="true">
                Default
            </b-switch>
        </div>
        <div class="field">
            <b-switch :value="true"
            type="is-info">
                Info
            </b-switch>
        </div>
        <div class="field">
            <b-switch :value="true"
            type="is-success">
                Success
            </b-switch>
        </div>
        <div class="field">
            <b-switch :value="true"
            type="is-danger">
                Danger
            </b-switch>
        </div>
        <div class="field">
            <b-switch :value="true"
            type="is-warning">
                Warning
            </b-switch>
        </div>
        <div class="field">
            <b-switch 
                v-model="lightMode"
                passive-type='is-dark'
                type='is-warning'>
                {{ lightMode ? "Light Mode" : "Dark Mode" }}
            </b-switch>
        </div>
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
