<template>
    <section>
        <b-field label="Small" custom-class="is-small">
            <b-input model-value="Kevin Garvey" size="is-small"></b-input>
        </b-field>
        <b-field label="Large" custom-class="is-large">
            <b-input model-value="Kevin Garvey" size="is-large"></b-input>
        </b-field>

        <b-field label="Danger"
            custom-class="has-text-danger"
            type="is-danger"
            message="This email is invalid">
            <b-input type="email"
                model-value="john@"
                maxlength="30">
            </b-input>
        </b-field>

        <b-field label="Multiple (small and success)"
            custom-class="is-small has-text-success"
            type="is-success"
            >
            <b-input model-value="johnsilver" maxlength="30" size="is-small"></b-input>
        </b-field>

        <b-field label="Computed (medium and primary)"
            :custom-class="classes"
            type="is-primary"
            >
            <b-input model-value="johnsilver" maxlength="30" size="is-medium"></b-input>
        </b-field>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                firstClass: 'has-text-primary',
                secondClass: 'is-medium'
            }
        },
        computed: {
            classes() {
                return `${this.firstClass} ${this.secondClass}`
            }
        }
    }
</script>
