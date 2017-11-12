<template>
    <section>
        <b-field>
            <b-input placeholder="No label"></b-input>
        </b-field>

        <b-field label="Label">
            <b-input placeholder="Text input"></b-input>
        </b-field>

        <b-field label="Success" type="is-success">
            <b-input placeholder="Success"></b-input>
        </b-field>

        <b-field label="Error"
            type="is-danger"
            message="You can have a message too">
            <b-input placeholder="Error"></b-input>
        </b-field>

        <b-field label="Info" type="is-info">
            <b-input placeholder="Info"></b-input>
        </b-field>

        <b-field label="Warning" type="is-warning">
            <b-input placeholder="Warning"></b-input>
        </b-field>

        <b-field label="Disabled">
            <b-input placeholder="Disabled" disabled></b-input>
        </b-field>

        <b-field label="Loading">
            <b-input placeholder="Loading" loading></b-input>
        </b-field>
    </section>
</template>
