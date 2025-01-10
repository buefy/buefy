<template>
    <section>
        <b-steps type="is-black">
            <b-step-item label="Account" icon="account-key"></b-step-item>
            <b-step-item label="Profile" icon="account"></b-step-item>
            <b-step-item label="Social" icon="account-plus"></b-step-item>
        </b-steps>

        <b-steps type="is-info">
            <b-step-item label="Account" icon="account-key"></b-step-item>
            <b-step-item label="Profile" icon="account"></b-step-item>
            <b-step-item label="Social" icon="account-plus"></b-step-item>
        </b-steps>

        <b-steps type="is-success">
            <b-step-item label="Account" icon="account-key"></b-step-item>
            <b-step-item label="Profile" icon="account"></b-step-item>
            <b-step-item label="Social" icon="account-plus"></b-step-item>
        </b-steps>
    </section>
</template>

<script setup lang="ts">
import { BSteps, BStepItem } from '@ntohq/buefy-next'
</script>
