<template>
    <section>
        <b-field
            label="Success"
            type="is-success">
            <b-taginput
                :value="['Tag']">
            </b-taginput>
        </b-field>

        <b-field
            label="Error"
            type="is-danger">
            <b-taginput
                :value="['Tag']">
            </b-taginput>
        </b-field>

        <b-field
            label="Info"
            type="is-info">
            <b-taginput
                :value="['Tag']">
            </b-taginput>
        </b-field>

        <b-field
            label="Warning"
            type="is-warning">
            <b-taginput
                :value="['Tag']">
            </b-taginput>
        </b-field>

        <b-field label="Disabled">
            <b-taginput
                :value="['Tag']"
                disabled>
            </b-taginput>
        </b-field>

        <b-field label="Loading">
            <b-taginput
                :value="['Tag']"
                loading>
            </b-taginput>
        </b-field>
    </section>
</template>
