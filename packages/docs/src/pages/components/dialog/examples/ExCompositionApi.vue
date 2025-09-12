<template>
    <section>
        <div class="buttons">
            <b-button
                label="Launch alert (default)"
                type="is-primary"
                size="is-medium"
                @click="defaultAlert"
            />
        </div>
    </section>
</template>
<script setup>
import { useDialog } from "buefy";

const Dialog = useDialog();

function defaultAlert() {
    Dialog.alert({
        title: "Title Alert",
        message: "I have a title, a custom button and <b>HTML</b>!",
        confirmText: "Cool!",
    });
}
</script>
