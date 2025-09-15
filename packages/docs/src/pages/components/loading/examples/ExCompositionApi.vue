<template>
    <section>
        <div class="buttons">
            <b-button
                label="Launch loading"
                type="is-primary"
                size="is-medium"
                @click="launch"
            />
        </div>
    </section>
</template>
<script setup>
import { useLoading } from "buefy";

const Loading = useLoading();

function launch() {
    Loading.open({
        canCancel: true,
    });
}
</script>
