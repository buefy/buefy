<template>
    <section ref="bcvContainer">
        <b-notification type="is-primary" :closable="false">
            This notification uses the primary color of bulma. Click one of the
            buttons below to set the <code>--primary</code> css variable to
            another value.
        </b-notification>
        <div class="buttons">
            <b-button type="is-success" @click="setColor('#23d160')">
                Green
            </b-button>
            <b-button type="is-info" @click="setColor('#209cee')">
                Blue
            </b-button>
            <b-button type="is-primary" @click="setColor('#7957d5')">
                Buefy Default Primary
            </b-button>
        </div>
        <p><b>CSS Variables set in DOM:</b></p>
        <p v-for="cssVar in cssVars" :key="cssVar">
            <code>{{ cssVar }}</code>
        </p>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// You have to install bulma-css-vars to use it:
// 'npm install bulma-css-vars'
// @ts-expect-error - bulma-css-vars is not well configured for ESM
import { ColorUpdater } from "bulma-css-vars";

import { BButton, BNotification } from "buefy";

import { default as bulmaColors } from "./bulma-generated/bulma-colors";

const updater = new ColorUpdater(bulmaColors.bulmaCssVariablesDefs);

export default defineComponent({
    components: {
        BButton,
        BNotification,
    },
    data() {
        return {
            cssVars: [] as string[],
        };
    },
    mounted() {
        this.setColor("#7957d5");
    },
    methods: {
        setColor(newColor: unknown) {
            const updatedVars = updater.getUpdatedVars("primary", newColor);
            const container = this.$refs.bcvContainer as HTMLElement;
            this.cssVars = updatedVars.map(
                ({ name, value }: { name: string; value: string }) => {
                    container.style.setProperty(name, value);
                    return `${name}: ${value};`;
                }
            );
        },
    },
});
</script>

<style scoped>
/* if you set up bulma-css-vars, this will be generated in your bulma scss */
.notification.is-primary {
    background-color: var(--primary);
    color: var(--primary--color-invert);
}
</style>
