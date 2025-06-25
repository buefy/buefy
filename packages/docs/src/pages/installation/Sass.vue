<template>
    <div>
        <div class="content">
            <p>
                Customize Buefy with <strong>Sass</strong> by overriding Bulma variables before importing the framework. 
                This guide covers both modern Sass (with <code>@use</code>) and legacy Sass (with <code>@import</code>) approaches.
            </p>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">1</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Install Dependencies</h3>
                <p class="content">Install Buefy and modern Sass:</p>
                <CodeView code="npm install buefy sass" lang="bash" expanded />
                <p class="content">
                    For build tools, you may also need:
                </p>
                <CodeView :code="preformat(packageJsonSetup)" lang="json" expanded />
            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">2</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Modern Sass with @use (Recommended)</h3>
                <p class="content">
                    Use the modern <code>@use</code> directive for better performance and cleaner code:
                </p>
                <CodeView :code="preformat(sass)" lang="scss" expanded />
                <b-message type="is-info">
                    <div class="content">
                        <p>
                            <b>Modern Sass Benefits:</b>
                        </p>
                        <ul>
                            <li>Better performance and smaller bundles</li>
                            <li>Explicit namespace management</li>
                            <li>No global variable pollution</li>
                            <li>Future-proof syntax</li>
                        </ul>
                    </div>
                </b-message>
            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">3</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Legacy Sass with @import</h3>
                <p class="content">
                    If you need to use the legacy <code>@import</code> syntax (not recommended for new projects):
                </p>
                <CodeView :code="preformat(sassLegacy)" lang="scss" expanded />
                <b-message type="is-warning">
                    <div class="content">
                        <p>
                            <b>Note:</b> The <code>@import</code> directive is deprecated and will be removed in Dart Sass 2.0. 
                            Consider migrating to <code>@use</code> for new projects.
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
                <h3 class="subtitle">Build Tool Configuration</h3>
                <p class="content">
                    Configure your build tool to use Dart Sass:
                </p>
                
                <h5 class="title is-5">Vite Configuration</h5>
                <CodeView :code="preformat(viteConfig)" lang="javascript" expanded />
                
                <h5 class="title is-5 mt-5">Webpack Configuration</h5>
                <CodeView :code="preformat(webpackConfig)" lang="javascript" expanded />
            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">5</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Import and use Buefy</h3>
                <p class="content">
                    Import and initialize Buefy in your Vue.js application:
                </p>
                <CodeView :code="preformat(importing)" lang="javascript" expanded />
                <b-message type="is-success">
                    <div class="content">
                        <p>
                            <b>Important:</b> When using Sass customization, do not import 
                            <code>buefy/dist/buefy.css</code> as your custom Sass will generate 
                            the CSS with your customizations.
                        </p>
                    </div>
                </b-message>
            </div>
        </div>

        <div class="content">
            <h4 class="title is-4">Available Variables</h4>
            <p>
                You can customize these key variables:
            </p>
            <ul>
                <li><strong>Colors:</strong> <code>$primary</code>, <code>$link</code>, <code>$info</code>, <code>$success</code>, <code>$warning</code>, <code>$danger</code></li>
                <li><strong>Typography:</strong> <code>$family-sans-serif</code>, <code>$size-1</code> to <code>$size-7</code></li>
                <li><strong>Spacing:</strong> <code>$radius</code>, <code>$radius-small</code>, <code>$radius-large</code>, <code>$radius-rounded</code></li>
                <li><strong>Buefy specific:</strong> <code>$speed-slow</code>, <code>$speed-slower</code></li>
            </ul>
            
            <h4 class="title is-4">Learn More</h4>
            <p>
                For a complete list of Bulma variables, visit the 
                <a href="https://bulma.io/documentation/customize/with-sass/" target="_blank" rel="noopener">
                    Bulma Sass customization documentation
                </a>.
            </p>
            <p>
                For CSS Variables approach (no compilation required), see the 
                <router-link to="/documentation/css-variables">CSS Variables section</router-link>.
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
    importing, 
    sass, 
    sassLegacy, 
    packageJsonSetup, 
    viteConfig, 
    webpackConfig 
} from "./usage/customization";

export default defineComponent({
    components: {
        BMessage,
        CodeView,
    },
    data() {
        return {
            sass,
            sassLegacy,
            importing,
            packageJsonSetup,
            viteConfig,
            webpackConfig,
        };
    },
    methods: { preformat },
});
</script>
