<template>
    <section>
        <div class="badge-colors">
            <b-badge value="1" type="is-primary">
                <b-button>Primary</b-button>
            </b-badge>
            <b-badge value="2" type="is-success">
                <b-button>Success</b-button>
            </b-badge>
            <b-badge value="3" type="is-danger">
                <b-button>Danger</b-button>
            </b-badge>
            <b-badge value="4" type="is-warning">
                <b-button>Warning</b-button>
            </b-badge>
            <b-badge value="5" type="is-info">
                <b-button>Info</b-button>
            </b-badge>
        </div>
    </section>
</template>

<script setup lang="ts">
import { BBadge, BButton } from "buefy";
</script>

<style scoped>
.badge-colors {
    display: flex;
    gap: 1.5em;
    flex-wrap: wrap;
}
</style>
