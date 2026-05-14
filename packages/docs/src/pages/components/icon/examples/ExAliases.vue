<template>
    <section>
        <div class="block">
            <b-icon alias="chevronLeft" />
            <b-icon alias="chevronRight" />
            <b-icon alias="chevronDown" />
            <b-icon alias="chevronUp" />
            <b-icon alias="menuDown" />
            <b-icon alias="menuUp" />
        </div>

        <div class="block">
            <b-icon alias="check" type="is-success" size="is-medium" />
            <b-icon alias="information" type="is-info" size="is-medium" />
            <b-icon alias="alert" type="is-warning" size="is-medium" />
            <b-icon alias="alertCircle" type="is-danger" size="is-medium" />
        </div>

        <div class="block">
            <b-icon alias="eye" size="is-large" />
            <b-icon alias="eyeOff" size="is-large" />
            <b-icon alias="close" size="is-large" type="is-danger" />
        </div>
    </section>
</template>

<script setup lang="ts">
import { BIcon } from 'buefy'
</script>
