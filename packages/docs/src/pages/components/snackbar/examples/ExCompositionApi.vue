<template>
    <section>
        <div class="buttons">
            <b-button
                label="Launch snackbar (default)"
                size="is-medium"
                @click="launch"
            />
        </div>
    </section>
</template>
<script setup>
import { useSnackbar } from "buefy"

const Snackbar = useSnackbar()

function launch() {
    Snackbar.open(`Default, positioned bottom-right with a green 'OK' button`)
}
</script>
