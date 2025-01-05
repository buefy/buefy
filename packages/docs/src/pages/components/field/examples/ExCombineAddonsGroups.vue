<template>
    <b-field grouped>
        <b-field label="Name" expanded>
            <b-field>
                <b-select placeholder="Title">
                    <option>Mr.</option>
                    <option>Ms.</option>
                </b-select>
                <b-input placeholder="Name" expanded></b-input>
            </b-field>
        </b-field>
        <b-field label="Email" expanded>
            <b-input placeholder="some@email.com"></b-input>
        </b-field>
    </b-field>
</template>

<script setup lang="ts">
import { BField, BInput, BSelect } from '@ntohq/buefy-next'
</script>
