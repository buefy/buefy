<template>
    <section>
        <b-field>
            <b-numberinput step="1" exponential> </b-numberinput>
        </b-field>

        <b-field>
            <b-numberinput step="1" :exponential="0.5"> </b-numberinput>
        </b-field>
    </section>
</template>

<script setup lang="ts">
import { BField, BNumberinput } from "buefy";
</script>
