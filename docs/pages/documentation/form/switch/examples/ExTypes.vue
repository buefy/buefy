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
    </section>
</template>
