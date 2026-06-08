<template>
    <div>
        <div class="content">
            <p>
                Buefy is built on top of <strong>Bulma CSS Framework</strong>, which uses
                <strong>CSS Variables</strong> (also called CSS custom properties) for theming.
                You can customize Buefy components either by overriding <strong>Sass variables</strong>
                at build time, or by overriding <strong>CSS custom properties</strong> at runtime —
                no recompilation needed.
            </p>
        </div>

        <!-- ─── 1. Sass vs CSS Variables ────────────────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">1</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Sass Variables vs CSS Variables</h3>
                <p class="content">
                    Both approaches customize the same design tokens, but they work differently.
                    Choose the one that fits your workflow:
                </p>
                <CodeView :code="preformat(sassComparisonExample)" lang="css" expanded />
                <b-message type="is-info">
                    <div class="content">
                        <ul>
                            <li>
                                <strong>Use Sass variables</strong> when you want compile-time
                                guarantees, smaller CSS output, and a single-file theme definition.
                                See the <router-link to="/documentation/sass">Sass documentation</router-link>.
                            </li>
                            <li>
                                <strong>Use CSS Variables</strong> when you need runtime theming
                                (e.g., user-selectable dark/light mode) or want to avoid a build step entirely.
                            </li>
                        </ul>
                    </div>
                </b-message>
            </div>
        </div>

        <!-- ─── 2. How CSS Variables Work in Buefy ──────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">2</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">How CSS Variables Work in Buefy</h3>
                <p class="content">
                    Buefy uses Bulma's CSS variable system. Each component registers its own
                    <code>--bulma-*</code> custom properties and reads them at render time.
                    You can override any of them at three levels of specificity:
                </p>
                <CodeView :code="preformat(howVariablesWorkExample)" lang="css" expanded />
                <b-message type="is-success">
                    <div class="content">
                        <p>
                            <strong>Cascade order (most → least specific):</strong>
                            inline style &gt; scoped selector (e.g. <code>.my-form</code>) &gt;
                            <code>:root</code> global override &gt; Buefy default.
                            This means you can keep a global theme in <code>:root</code> while
                            still overriding individual sections with a scoped selector.
                        </p>
                    </div>
                </b-message>
            </div>
        </div>

        <!-- ─── 3. Basic Color Customization ────────────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">3</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Basic Color Customization</h3>
                <p class="content">
                    Override Bulma's CSS variables to change the primary, secondary, and semantic colors
                    used throughout all Buefy components:
                </p>
                <CodeView :code="preformat(basicExample)" lang="css" expanded />

                <p class="content mt-5">
                    <strong>Understanding the HSL color system</strong>
                </p>
                <p class="content">
                    Bulma splits each color into three variables (<code>-h</code>, <code>-s</code>,
                    <code>-l</code>) so it can auto-generate tinted/shaded variants automatically.
                    Changing just the hue shifts the entire color family:
                </p>
                <CodeView :code="preformat(colorSystemExample)" lang="css" expanded />

                <b-message type="is-info">
                    <div class="content">
                        <p>
                            <b>Tip:</b> You can see all available Bulma color variables in the
                            <a href="https://bulma.io/documentation/features/css-variables/" target="_blank" rel="noopener">
                                Bulma CSS Variables documentation
                            </a>.
                        </p>
                    </div>
                </b-message>
            </div>
        </div>

        <!-- ─── 4. Advanced Customization ────────────────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">4</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Advanced Customization</h3>
                <p class="content">
                    Customize typography, spacing, border radius, shadows, and more:
                </p>
                <CodeView :code="preformat(advancedExample)" lang="css" expanded />
            </div>
        </div>

        <!-- ─── 5. Component-Specific Customization ──────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">5</h3>
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
                            <b>Component Scope:</b> CSS variables defined on specific selectors
                            (like <code>.button</code>) will override global values, giving you
                            fine-grained control over individual component styling.
                        </p>
                    </div>
                </b-message>
            </div>
        </div>

        <!-- ─── 6. Dark Mode ─────────────────────────────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">6</h3>
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
                            Learn more about theming with CSS variables in the
                            <a href="https://bulma.io/documentation/features/themes/" target="_blank" rel="noopener">
                                Bulma Theme documentation
                            </a>.
                        </p>
                    </div>
                </b-message>
            </div>
        </div>

        <!-- ─── 7. Using with Vue.js ─────────────────────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">7</h3>
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

        <!-- ─── 8. Complete Theme Example ───────────────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">8</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Complete Theme Example</h3>
                <p class="content">
                    A ready-to-use theme that sets brand colors, typography, shape, and shadows in one block:
                </p>
                <CodeView :code="preformat(completeThemeExample)" lang="css" expanded />
            </div>
        </div>

        <!-- ─── Interactive Theme Preview ───────────────────────────────────── -->
        <div class="content mt-6">
            <h4 class="title is-4">Interactive Theme Preview</h4>
            <p>
                Pick colors and a border radius to see the changes live, then copy the generated CSS
                into your project:
            </p>
        </div>

        <Example
            :component="ExThemePreview"
            :code="ExThemePreviewCode"
            title="Theme Generator"
        />

        <!-- ─── CSS Variables Reference ─────────────────────────────────────── -->
        <div class="content mt-6">
            <h4 class="title is-4">CSS Variables Reference</h4>
            <p>
                All Bulma base variables that you can override. Each component also exposes its own
                <code>--bulma-{component}-*</code> variables — see the individual component pages for
                those details.
            </p>
        </div>

        <b-tabs>
            <b-tab-item label="Colors">
                <b-table
                    :mobile-cards="false"
                    :data="colorVariables"
                    :columns="referenceColumns"
                />
            </b-tab-item>

            <b-tab-item label="Typography">
                <b-table
                    :mobile-cards="false"
                    :data="typographyVariables"
                    :columns="referenceColumns"
                />
            </b-tab-item>

            <b-tab-item label="Spacing">
                <b-table
                    :mobile-cards="false"
                    :data="spacingVariables"
                    :columns="referenceColumns"
                />
            </b-tab-item>

            <b-tab-item label="Borders">
                <b-table
                    :mobile-cards="false"
                    :data="borderVariables"
                    :columns="referenceColumns"
                />
            </b-tab-item>

            <b-tab-item label="Shadows">
                <b-table
                    :mobile-cards="false"
                    :data="shadowVariables"
                    :columns="referenceColumns"
                />
            </b-tab-item>
        </b-tabs>

        <b-message type="is-info" class="mt-4">
            <div class="content">
                <p>
                    For component-specific CSS variables (e.g. <code>--bulma-checkbox-size</code>,
                    <code>--bulma-slider-thumb-radius</code>), see the <strong>Variables</strong>
                    section at the bottom of each component's documentation page.
                </p>
            </div>
        </b-message>

        <!-- ─── Benefits & Learn More ───────────────────────────────────────── -->
        <div class="content mt-6">
            <h4 class="title is-4">Benefits of CSS Variables</h4>
            <ul>
                <li><strong>No compilation required:</strong> Changes apply instantly without rebuilding</li>
                <li><strong>Runtime theming:</strong> Switch themes dynamically with JavaScript</li>
                <li><strong>Better performance:</strong> Smaller CSS bundles than full Sass recompiles</li>
                <li><strong>Easier maintenance:</strong> Centralized theme configuration in one CSS block</li>
                <li><strong>Browser support:</strong> Supported in all modern browsers</li>
                <li><strong>Scoped overrides:</strong> Apply different themes per component, page, or section</li>
            </ul>

            <h4 class="title is-4">Learn More</h4>
            <p>
                For a complete list of available CSS variables and advanced theming options,
                visit the <a href="https://bulma.io/documentation/features/css-variables/" target="_blank" rel="noopener">
                Bulma CSS Variables documentation</a>.
            </p>
            <p>
                For the Sass-based customization approach (compile-time),
                see the <router-link to="/documentation/sass">Sass documentation</router-link>.
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { BMessage, BTabs, BTabItem, BTable } from "buefy";

import CodeView from "@/components/CodeView.vue";
import Example from "@/components/Example.vue";
import { preformat, shallowFields } from "@/utils";

import {
    basicExample,
    advancedExample,
    componentExample,
    darkModeExample,
    jsToggle,
    vueUsage,
    sassComparisonExample,
    howVariablesWorkExample,
    colorSystemExample,
    completeThemeExample,
} from "./usage/css-variables";

import {
    colorVariables,
    typographyVariables,
    spacingVariables,
    borderVariables,
    shadowVariables,
} from "./variables/css-variables";

import ExThemePreview from "./examples/ExThemePreview.vue";
import ExThemePreviewCode from "./examples/ExThemePreview.vue?raw";

export default defineComponent({
    components: {
        BMessage,
        BTabs,
        BTabItem,
        BTable,
        CodeView,
        Example,
    },
    data() {
        return {
            referenceColumns: [
                { label: 'Variable', field: 'css', renderHtml: true },
                { label: 'Description', field: 'name', renderHtml: true },
                { label: 'Default', field: 'default', renderHtml: true },
            ],
            basicExample,
            advancedExample,
            componentExample,
            darkModeExample,
            jsToggle,
            vueUsage,
            sassComparisonExample,
            howVariablesWorkExample,
            colorSystemExample,
            completeThemeExample,
            colorVariables,
            typographyVariables,
            spacingVariables,
            borderVariables,
            shadowVariables,
            ExThemePreviewCode,
            ...shallowFields({ ExThemePreview }),
        };
    },
    methods: { preformat },
});
</script>
