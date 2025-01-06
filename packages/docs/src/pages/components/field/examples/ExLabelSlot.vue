<template>
    <section>
        <b-field
            custom-class="is-medium"
            horizontal>
            <template #label>
               With tooltip
                <b-tooltip type="is-dark" label="Help text here for explanation">
                    <b-icon size="is-small" icon="help-circle-outline"></b-icon>
                </b-tooltip>
            </template>
            <b-input size="is-medium"></b-input>
        </b-field>

        <b-field>
            <template #label>
                Label with custom <span class="has-text-primary is-italic">style</span>
            </template>
            <b-input></b-input>
        </b-field>
    </section>
</template>

<script setup lang="ts">
import { BField, BIcon, BInput, BTooltip } from '@ntohq/buefy-next'
</script>
