<template>
    <section>
        <div class="field">
            <b-checkbox :value="true">
                Default
            </b-checkbox>
        </div>
        <div class="field">
            <b-checkbox :value="true"
            type="is-info">
                Info
            </b-checkbox>
        </div>
        <div class="field">
            <b-checkbox :value="true"
            type="is-success">
                Success
            </b-checkbox>
        </div>
        <div class="field">
            <b-checkbox :value="true"
            type="is-danger">
                Danger
            </b-checkbox>
        </div>
        <div class="field">
            <b-checkbox :value="true"
            type="is-warning">
                Warning
            </b-checkbox>
        </div>
    </section>
</template>
