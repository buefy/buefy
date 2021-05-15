<template>
    <section>
        <b-field
            label="Success"
            type="is-success">
            <b-taginput
                :modelValue="['Tag']">
            </b-taginput>
        </b-field>

        <b-field
            label="Error"
            type="is-danger">
            <b-taginput
                :modelValue="['Tag']">
            </b-taginput>
        </b-field>

        <b-field
            label="Info"
            type="is-info">
            <b-taginput
                :modelValue="['Tag']">
            </b-taginput>
        </b-field>

        <b-field
            label="Warning"
            type="is-warning">
            <b-taginput
                :modelValue="['Tag']">
            </b-taginput>
        </b-field>

        <b-field label="Disabled">
            <b-taginput
                :modelValue="['Tag']"
                disabled>
            </b-taginput>
        </b-field>

        <b-field label="Loading">
            <b-taginput
                :modelValue="['Tag']"
                loading>
            </b-taginput>
        </b-field>
    </section>
</template>
