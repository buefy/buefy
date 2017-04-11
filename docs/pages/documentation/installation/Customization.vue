<template>
    <div>
        <h1 class="title is-spaced">Customizing theme with Sass</h1>
        <h2 class="subtitle">If you're familiar with <a href="http://sass-lang.com/">Sass</a> and want to <strong>customize</strong> Buefy with your own theme, follow these steps</h2>

        <hr>

        <h3 class="subtitle"><span class="list-number">1</span> Install Buefy via npm</h3>
        <pre class="content" v-highlight><code class="bash">npm install buefy</code></pre>
        <p class="content">or clone the repository: <a href="https://github.com/rafaelpimpa/buefy" target="_blank">https://github.com/rafaelpimpa/buefy</a></p>

        <hr>

        <h3 class="subtitle"><span class="list-number">2</span> Set your variables with Sass</h3>
        <p class="content"><b>Tip:</b> You can see all Bulma's variables <a href="http://bulma.io/documentation/overview/variables/" target="_blank">here</a>. There's also another variable created by Buefy: <code>$speed-slow: 150ms !default</code>.</p>
        <div class="example"><pre v-highlight><code class="sass">{{ sass | pre }}</code></pre></div>

        <hr>

        <h3 class="subtitle"><span class="list-number">3</span> Import Bulma and Buefy styles <em>after</em> having set your variables</h3>
        <pre v-highlight><code class="sass">{{ sassFinal | pre }}</code></pre>

        <hr>

        <h3 class="subtitle"><span class="list-number">4</span> Import and use Buefy. You can also enable individual components</h3>
        <pre v-highlight><code class="javascript">{{ importing | pre }}</code></pre>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sass: `
                    // Import Bulma's core
                    @import "~bulma/sass/utilities/_all";

                    // Set your colors
                    $primary: #8c67ef;
                    $primary-invert: findColorInvert($primary);
                    $twitter: #4099FF;
                    $twitter-invert: findColorInvert($twitter);
                    $facebook: #4267B2;
                    $facebook-invert: findColorInvert($facebook);
                    $google-plus: #DB4437;
                    $google-plus-invert: findColorInvert($google-plus);

                    // Setup $colors to use as bulma classes (e.g. 'is-twitter')
                    $colors: (
                        white: ($white, $black),
                        black: ($black, $white),
                        light: ($light, $light-invert),
                        dark: ($dark, $dark-invert),
                        primary: ($primary, $primary-invert),
                        info: ($info, $info-invert),
                        success: ($success, $success-invert),
                        warning: ($warning, $warning-invert),
                        danger: ($danger, $danger-invert),
                        twitter: ($twitter, $twitter-invert),
                        facebook: ($facebook, $facebook-invert),
                        google-plus: ($google-plus, $google-plus-invert)
                    );

                    // Links
                    $link: $primary;
                    $link-invert: $primary-invert;
                    $link-focus-border: $primary;
                    `,
                sassFinal: `
                    ... // Your variables

                    @import "~bulma";
                    @import "~buefy/src/scss/buefy";`,
                importing: `
                    import Vue from 'vue'
                    import Buefy from 'buefy'

                    Vue.use(Buefy)

                    // OR

                    Vue.component(Buefy.Checkbox.name, Buefy.Checkbox)
                    Vue.component(Buefy.Table.name, Buefy.Table)
                    ...`
            }
        }
    }
</script>
