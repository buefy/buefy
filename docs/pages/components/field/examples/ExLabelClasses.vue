<template>
    <section>
        <b-field label="Small" label-classes="is-small">
            <b-input value="Kevin Garvey" size="is-small"></b-input>
        </b-field>
        <b-field label="Large" label-classes="is-large">
            <b-input value="Kevin Garvey" size="is-large"></b-input>
        </b-field>

        <b-field label="Danger"
            label-classes="has-text-danger"
            type="is-danger"
            message="This email is invalid">
            <b-input type="email"
                value="john@"
                maxlength="30">
            </b-input>
        </b-field>

        <b-field label="Multiple (small and success)"
            label-classes="is-small has-text-success"
            type="is-success"
            >
            <b-input value="johnsilver" maxlength="30" size="is-small"></b-input>
        </b-field>

        <b-field label="Computed (medium and primary)"
            :label-classes="classes"
            type="is-primary"
            >
            <b-input value="johnsilver" maxlength="30" size="is-medium"></b-input>
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