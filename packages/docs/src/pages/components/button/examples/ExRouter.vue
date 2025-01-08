<template>
    <section>
        <div class="buttons">
            <b-button tag="router-link"
                to="/documentation"
                type="is-link">
                Docs
            </b-button>
            <b-button tag="router-link"
                to="/expo"
                type="is-info">
                Expo
            </b-button>
        </div>
    </section>
</template>

<script setup lang="ts">
import { BButton } from '@ntohq/buefy-next'
</script>
