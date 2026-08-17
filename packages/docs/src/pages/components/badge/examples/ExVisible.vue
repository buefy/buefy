<template>
    <section>
        <b-field>
            <b-badge :value="count" :visible="count > 0" type="is-primary">
                <b-icon icon="bell" size="is-large" />
            </b-badge>
        </b-field>
        <b-field>
            <b-button @click="count++">Add</b-button>
            <b-button @click="count = 0">Clear</b-button>
        </b-field>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BBadge, BButton, BField, BIcon } from "buefy";

const count = ref(0);
</script>
