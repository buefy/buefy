<template>
    <section>
        <div class="badge-positions">
            <b-badge value="1" position="is-top-left">
                <b-button>Top left</b-button>
            </b-badge>
            <b-badge value="2" position="is-top-right">
                <b-button>Top right</b-button>
            </b-badge>
            <b-badge value="3" position="is-bottom-left">
                <b-button>Bottom left</b-button>
            </b-badge>
            <b-badge value="4" position="is-bottom-right">
                <b-button>Bottom right</b-button>
            </b-badge>
        </div>
    </section>
</template>

<script setup lang="ts">
import { BBadge, BButton } from "buefy";
</script>

<style scoped>
.badge-positions {
    display: flex;
    gap: 1.5em;
    flex-wrap: wrap;
}
</style>
