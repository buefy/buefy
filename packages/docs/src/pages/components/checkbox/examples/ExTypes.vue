<template>
    <section>
        <b-field>
            <b-checkbox :value="true">
                Default
            </b-checkbox>
        </b-field>
        <b-field>
            <b-checkbox :value="true"
            type="is-info">
                Info
            </b-checkbox>
        </b-field>
        <b-field>
            <b-checkbox :value="true"
            type="is-success">
                Success
            </b-checkbox>
        </b-field>
        <b-field>
            <b-checkbox :value="true"
            type="is-danger">
                Danger
            </b-checkbox>
        </b-field>
        <b-field>
            <b-checkbox :value="true"
            type="is-warning">
                Warning
            </b-checkbox>
        </b-field>
    </section>
</template>

<script setup lang="ts">
import { BCheckbox, BField } from '@ntohq/buefy-next'
</script>
