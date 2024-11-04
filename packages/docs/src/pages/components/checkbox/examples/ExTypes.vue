<template>
    <section>
        <b-field>
            <b-checkbox :model-value="true">
                Default
            </b-checkbox>
        </b-field>
        <b-field>
            <b-checkbox :model-value="true"
            type="is-info">
                Info
            </b-checkbox>
        </b-field>
        <b-field>
            <b-checkbox :model-value="true"
            type="is-success">
                Success
            </b-checkbox>
        </b-field>
        <b-field>
            <b-checkbox :model-value="true"
            type="is-danger">
                Danger
            </b-checkbox>
        </b-field>
        <b-field>
            <b-checkbox :model-value="true"
            type="is-warning">
                Warning
            </b-checkbox>
        </b-field>
    </section>
</template>
