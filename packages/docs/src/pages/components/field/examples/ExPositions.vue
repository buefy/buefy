<template>
    <section>
        <b-field position="is-centered">
            <b-input placeholder="Search..." type="search" icon="magnify">
            </b-input>
            <p class="control">
                <b-button label="Search" type="is-info" />
            </p>
        </b-field>

        <hr>

        <b-field grouped position="is-right">
            <b-input placeholder="Search..." type="search" icon="magnify">
            </b-input>
            <p class="control">
                <b-button label="Search" type="is-info" />
            </p>
        </b-field>
    </section>
</template>

<script setup lang="ts">
import { BButton, BField, BInput } from '@ntohq/buefy-next'
</script>
