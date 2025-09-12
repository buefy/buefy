<template>
    <section>
        <div class="buttons">
            <b-button
                label="Launch toast (default)"
                size="is-medium"
                @click="launch"
            />
        </div>
    </section>
</template>
<script setup>
import { useToast } from "buefy"

const Toast = useToast()

function launch() {
    Toast.open("Something happened")
}
</script>
