<template>
    <div>
        <div class="content">
            <p>
                Buefy is built on top of <strong>Bulma CSS Framework</strong>, which uses 
                <strong>CSS Variables</strong> (also called CSS custom properties) for theming. 
                This allows you to customize your Buefy components without needing to recompile Sass.
            </p>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">1</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Basic Color Customization</h3>
                <p class="content">
                    Override Bulma's CSS variables to change the primary, secondary, and semantic colors 
                    used throughout all Buefy components:
                </p>
                <CodeView :code="preformat(basicExample)" lang="css" expanded />
                <b-message type="is-info">
                    <div class="content">
                        <p>
                            <b>Tip:</b> Bulma uses HSL (Hue, Saturation, Lightness) values for colors. 
                            You can see all available CSS variables in the 
                            <a href="https://bulma.io/documentation/features/css-variables/" target="_blank" rel="noopener">
                                Bulma CSS Variables documentation
                            </a>.
                        </p>
                    </div>
                </b-message>
            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">2</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Advanced Customization</h3>
                <p class="content">
                    Customize typography, spacing, border radius, shadows, and more:
                </p>
                <CodeView :code="preformat(advancedExample)" lang="css" expanded />
            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">3</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Component-Specific Customization</h3>
                <p class="content">
                    You can also override CSS variables at the component level for more granular control:
                </p>
                <CodeView :code="preformat(componentExample)" lang="css" expanded />
                <b-message type="is-success">
                    <div class="content">
                        <p>
                            <b>Component Scope:</b> CSS variables defined on specific components 
                            (like <code>.button</code>) will override global values, giving you 
                            fine-grained control over individual component styling.
                        </p>
                    </div>
                </b-message>
            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">4</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Dark Mode Support</h3>
                <p class="content">
                    Create a dark mode theme by overriding variables based on a data attribute:
                </p>
                <CodeView :code="preformat(darkModeExample)" lang="css" expanded />
                <p class="content mt-4">
                    <strong>JavaScript to toggle dark mode:</strong>
                </p>
                <CodeView :code="preformat(jsToggle)" lang="javascript" expanded />
                <b-message type="is-info">
                    <div class="content">
                        <p>
                            Learn more about <b>theme</b> with CSS variables in the
                            <a href="https://bulma.io/documentation/features/themes/" target="_blank" rel="noopener">
                                Bulma Theme documentation
                            </a>.
                        </p>
                    </div>
                </b-message>
            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">5</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Using with Vue.js</h3>
                <p class="content">
                    Import Buefy in your Vue.js application. The CSS variables will automatically apply 
                    to all Buefy components:
                </p>
                <CodeView :code="preformat(vueUsage)" lang="javascript" expanded />
                <b-message type="is-warning">
                    <div class="content">
                        <p>
                            <b>Note:</b> When using CSS variables for customization, you don't need to 
                            recompile Sass. Simply include your custom CSS variables in your stylesheet 
                            and they will override Bulma's defaults.
                        </p>
                    </div>
                </b-message>
            </div>
        </div>

        <div class="content">
            <h4 class="title is-4">Benefits of CSS Variables</h4>
            <ul>
                <li><strong>No compilation required:</strong> Changes apply instantly without rebuilding</li>
                <li><strong>Runtime theming:</strong> Switch themes dynamically with JavaScript</li>
                <li><strong>Better performance:</strong> Smaller CSS bundles</li>
                <li><strong>Easier maintenance:</strong> Centralized theme configuration</li>
                <li><strong>Browser support:</strong> Supported in all modern browsers</li>
            </ul>
            
            <h4 class="title is-4">Learn More</h4>
            <p>
                For a complete list of available CSS variables and advanced theming options, 
                visit the <a href="https://bulma.io/documentation/features/css-variables/" target="_blank" rel="noopener">
                Bulma CSS Variables documentation</a>.
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { BMessage } from "buefy";

import CodeView from "@/components/CodeView.vue";
import { preformat } from "@/utils";

import { 
    basicExample, 
    advancedExample, 
    componentExample, 
    darkModeExample, 
    jsToggle, 
    vueUsage 
} from "./usage/css-variables";

export default defineComponent({
    components: {
        BMessage,
        CodeView,
    },
    data() {
        return {
            basicExample,
            advancedExample,
            componentExample,
            darkModeExample,
            jsToggle,
            vueUsage,
        };
    },
    methods: { preformat },
});
</script>
