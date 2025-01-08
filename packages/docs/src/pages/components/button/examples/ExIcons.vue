<template>
    <section>
        <div class="buttons">
            <b-button size="is-small"
                icon-left="github">
                Add
            </b-button>

            <b-button icon-left="github">
                Add
            </b-button>

            <b-button size="is-medium"
                icon-left="github">
                Add
            </b-button>

            <b-button size="is-large"
                icon-left="github">
                Add
            </b-button>
        </div>

        <div class="buttons">
            <b-button type="is-danger"
                icon-left="delete">
                Delete
            </b-button>

            <b-button type="is-danger"
                icon-right="delete">
                Delete
            </b-button>

            <b-button type="is-danger"
                icon-right="delete" />
        </div>

    </section>
</template>

<script setup lang="ts">
import { BButton } from '@ntohq/buefy-next'
</script>
