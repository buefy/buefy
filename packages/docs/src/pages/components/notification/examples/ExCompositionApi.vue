<template>
    <section>
        <div class="buttons">
            <b-button
                label="Launch notification"
                type="is-primary"
                size="is-medium"
                @click="launch"
            />
        </div>
    </section>
</template>
<script setup>
import { useNotification } from "buefy";

const Notification = useNotification();

function launch() {
    Notification.open({
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 'is-success',
    })
}
</script>
