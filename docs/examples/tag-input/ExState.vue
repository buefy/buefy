<template>
    <section>
        <b-field
            label="Success"
            type="is-success">
            <b-tag-input
                :value="['Tag']">
            </b-tag-input>
        </b-field>

        <b-field
            label="Error"
            type="is-danger">
            <b-tag-input
                :value="['Tag']">
            </b-tag-input>
        </b-field>

        <b-field
            label="Info"
            type="is-info">
            <b-tag-input
                :value="['Tag']">
            </b-tag-input>
        </b-field>

        <b-field
            label="Warning"
            type="is-warning">
            <b-tag-input
                :value="['Tag']">
            </b-tag-input>
        </b-field>

        <b-field label="Disabled">
            <b-tag-input
                :value="['Tag']"
                disabled>
            </b-tag-input>
        </b-field>

        <b-field label="Loading">
            <b-tag-input
                :value="['Tag']"
                loading>
            </b-tag-input>
        </b-field>
    </section>
</template>
