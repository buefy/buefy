<template>
    <section>
        <b-field>
            <b-numberinput></b-numberinput>
        </b-field>

        <b-field label="Left">
            <b-numberinput controls-alignment="left"></b-numberinput>
        </b-field>

        <b-field label="Right">
            <b-numberinput controls-alignment="right"></b-numberinput>
        </b-field> 

        <b-field label="Compact">
            <b-numberinput controls-position="compact"></b-numberinput>
        </b-field> 

        <b-field label="Compact left">
            <b-numberinput controls-alignment="left" controls-position="compact"></b-numberinput>
        </b-field>

        <b-field label="Compact right">
            <b-numberinput controls-alignment="right" controls-position="compact"></b-numberinput>
        </b-field>
    </section>
</template>

<script setup lang="ts">
import { BField, BNumberinput } from '@ntohq/buefy-next'
</script>
