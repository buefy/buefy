<template>
    <section>
        <b-field>
            <b-numberinput step="1" exponential>
            </b-numberinput>
        </b-field>

        <b-field>
            <b-numberinput step="1" :exponential=".5">
            </b-numberinput>
        </b-field>
    </section>
</template>

<script setup lang="ts">
import { BField, BNumberinput } from '@ntohq/buefy-next'
</script>
