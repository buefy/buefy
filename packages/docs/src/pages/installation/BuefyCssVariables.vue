<template>
    <div>
        <div class="content">
            <p>
                Complete list of CSS variables registered by Buefy.
                Bulma core variables are intentionally excluded.
            </p>
            <p>
                Variables are exposed with the default Bulma prefix, for example
                <code>--bulma-carousel-min-height</code>.
            </p>
        </div>

        <CodeView :code="preformat(exampleOverride)" lang="css" expanded />

        <b-table
            :mobile-cards="false"
            :data="allVariables"
            :columns="columns"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { BTable } from "buefy";

import CodeView from "@/components/CodeView.vue";
import { preformat } from "@/utils";

import buefyCssVariables from "./usage/buefy-css-variables";

const exampleOverride = `:root {
  --bulma-carousel-min-height: 220px;
  --bulma-tooltip-arrow-size: 6px;
  --bulma-switch-width: 3.25em;
}`;

export default defineComponent({
    components: {
        BTable,
        CodeView,
    },
    data() {
        return {
            columns: [
                {
                    label: "Variable key",
                    field: "key",
                    renderHtml: true,
                },
                {
                    label: "CSS variable",
                    field: "css",
                    renderHtml: true,
                },
            ],
            allVariables: buefyCssVariables.map((variable) => ({
                key: `<code>${variable}</code>`,
                css: `<code>--bulma-${variable}</code>`,
            })),
            exampleOverride,
        };
    },
    methods: { preformat },
});
</script>
