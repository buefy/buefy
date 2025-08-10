<template>
    <div class="content">
        <h1 class="title">🎨 Icons in Buefy</h1>
        <p>
        Several Buefy components support icons, but <strong>Buefy does not include any icon packs by default</strong>.
        You’ll need to import your preferred icon set manually—via CDN or npm. Several components with in Buefy use icons, you might want to add a pack:
        </p>
        <CodeView
            title="Material Design Icons CDN"
            :code="materialIcons"
            expanded
        />
        <CodeView title="Font Awesome 5 CDN" :code="fontAwesome5" expanded />
        <div class="content">
            <blockquote>
                <p>Refer to its documentation for latest release / CDN.</p>
                <p>
                    Please note that Buefy doesn't include icon packs. You have
                    to import it as you prefer (NPM, CDN, etc.).
                </p>
                <p>
                    If you opted for Font Awesome, you should update your
                    <router-link to="/documentation/constructor-options"
                        >constructor options</router-link
                    >.
                </p>
            </blockquote>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";

import { BMessage } from "buefy";

import CodeView from "@/components/CodeView.vue";
import { preformat } from "@/utils";


import {
    fontAwesome5,
    materialIcons,
} from "./usage/icons";

export default defineComponent({
    components: {
        BMessage,
        CodeView,
    },
    data() {
        return {
            materialIcons,
            fontAwesome5,
        };
    },
      methods: {
        preformat,
        slugifyTitle(title: string) {
            if (!title) return "";
            return title
                .toLowerCase()
                .replace(/\s+/g, "-") // Replace spaces with -
                .replace(/[^\w-]+/g, "") // Remove all non-word chars
                .replace(/--+/g, "-") // Replace multiple - with single -
                .replace(/^-+/, "") // Trim - from start of text
                .replace(/-+$/, ""); // Trim - from end of text
        },
    },
});
</script>
