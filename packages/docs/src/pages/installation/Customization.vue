<template>
    <div>
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">1</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Install Buefy via npm</h3>
                <CodeView code="npm install buefy" lang="bash" expanded/>
                <p class="content">Or clone the repository: <a href="https://github.com/buefy/buefy" target="_blank">https://github.com/buefy/buefy</a></p>
            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">2</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Set your variables with Sass</h3>
                <b-message type="is-info">
                    <div class="content">
                        <p><b>Tip:</b> You can see <a href="http://bulma.io/documentation/overview/variables/" target="_blank">all of Bulma's variables</a>.</p>
                        <p>There are also two other variables created by Buefy:</p>
                        <ol>
                            <li><code>$speed-slow: 150ms !default</code></li>
                            <li><code>$speed-slower: 250ms !default</code></li>
                        </ol>
                    </div>
                </b-message>
                <div class="example is-paddingless">
                    <CodeView :code="preformat(sass)" lang="sass" expanded/>
                </div>

            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">3</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Import and use Buefy</h3>
                <b-message type="is-warning">
                    Please note that <code class="javascript">import 'buefy/dist/buefy.css'</code> from the <router-link to="/documentation/start">start section</router-link> has been omitted because it is not required when using scss.
                </b-message>
                <CodeView :code="preformat(importing)" lang="javascript" expanded/>
            </div>
        </div>
    </div>
</template>

<script>
    import { preformat } from '@/utils'

    export default {
        data() {
            return {
                sass: `
                // Import Bulma's core
                @import "~bulma/sass/utilities/_all";

                // Set your colors
                $primary: #8c67ef;
                $primary-light: findLightColor($primary);
                $primary-dark: findDarkColor($primary);
                $primary-invert: findColorInvert($primary);
                $twitter: #4099FF;
                $twitter-invert: findColorInvert($twitter);

                // Lists and maps
                $custom-colors: null !default;
                $custom-shades: null !default;
                
                // Setup $colors to use as bulma classes (e.g. 'is-twitter')
                $colors: mergeColorMaps(
                    (
                        "white": (
                            $white,
                            $black,
                        ),
                        "black": (
                            $black,
                            $white,
                        ),
                        "light": (
                            $light,
                            $light-invert,
                        ),
                        "dark": (
                            $dark,
                            $dark-invert,
                        ),
                        "primary": (
                            $primary,
                            $primary-invert,
                            $primary-light,
                            $primary-dark,
                        ),
                        "link": (
                            $link,
                            $link-invert,
                            $link-light,
                            $link-dark,
                        ),
                        "info": (
                            $info,
                            $info-invert,
                            $info-light,
                            $info-dark,
                        ),
                        "success": (
                            $success,
                            $success-invert,
                            $success-light,
                            $success-dark,
                        ),
                        "warning": (
                            $warning,
                            $warning-invert,
                            $warning-light,
                            $warning-dark,
                        ),
                        "danger": (
                            $danger,
                            $danger-invert,
                            $danger-light,
                            $danger-dark,
                        ),
                    ),
                    $custom-colors
                );

                // Links
                $link: $primary;
                $link-invert: $primary-invert;
                $link-focus-border: $primary;

                // Import Bulma and Buefy styles
                @import "~bulma";
                @import "~buefy/src/scss/buefy";
                `,
                importing: `
                import Vue from 'vue'
                import Buefy from 'buefy'

                Vue.use(Buefy)`
            }
        },
        methods: { preformat }
    }
</script>
