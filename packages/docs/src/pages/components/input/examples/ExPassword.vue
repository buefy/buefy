<template>
    <section>
        <b-field>
            <b-input type="password"
                placeholder="Regular password input">
            </b-input>
        </b-field>

        <b-field>
            <b-input type="password"
                placeholder="Password reveal input"
                password-reveal>
            </b-input>
        </b-field>
    </section>
</template>

<script setup lang="ts">
import { BField, BInput } from '@ntohq/buefy-next'
</script>
