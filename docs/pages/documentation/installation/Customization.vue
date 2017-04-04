<template>
    <div>
        <h1 class="title is-spaced">Customizing theme with Sass</h1>

        <p class="mb-16">If you're familiar with <a href="http://sass-lang.com/">Sass</a> and want to <strong>customize</strong> Buefy with your own theme, follow these steps:</p>

        <h2 class="subtitle"><span class="mr-8">1</span> Install Buefy and Bulma via npm</h2>
        <pre v-highlight><code class="bash">Not public yet.</code></pre>
        <p class="mt-16">or clone the repository: <a href="https://github.com/rafaelpimpa/buefy" target="_blank">https://github.com/rafaelpimpa/buefy</a></p>

        <pre v-highlight class="mt-16"><code class="bash">npm install bulma</code></pre>
        <p class="mt-16">or clone the repository: <a href="https://github.com/jgthms/bulma" target="_blank">https://github.com/jgthms/bulma</a></p>

        <hr>

        <h2 class="subtitle"><span class="mr-8">2</span> Set your variables with Sass</h2>
        <p class="mb-16"><strong>Tip:</strong> You can see all Bulma's variables <a href="http://bulma.io/documentation/overview/variables/" target="_blank">here</a>.</p>
        <pre v-highlight><code class="sass">{{ sass }}</code></pre>

        <hr>

        <h2 class="subtitle"><span class="mr-8">3</span> Import Bulma and Buefy styles <em>after</em> having set your variables</h2>
        <pre v-highlight><code class="sass">{{ sassFinal }}</code></pre>

        <hr>

        <h2 class="subtitle"><span class="mr-8">4</span> Import and use Buefy. You can also enable individual components</h2>
        <pre v-highlight><code class="javascript">{{ importing }}</code></pre>

        <!--///////-->

        <hr>

        <h3 class="title is-spaced">Global options</h3>
        <h2 class="subtitle">Global options should be set inside an object on Buefy initialization, like so:</h2>

        <pre v-highlight><code class="javascript">{{ globalOptions }}</code></pre>

        <hr>

        <h2 class="subtitle">Using FontAwesome</a></h2>
        <p class="mb-16">By default Buefy uses <a href="https://material.io/icons/" target="_blank">Material Icons</a>, if you want to swap to <a href="http://fontawesome.io/" target="_blank">FontAwesome</a>, use this option:</p>
        <code>defaultIconType: 'fa'</code>

        <h2 class="subtitle is-6 mt-16">Don't forget to include FontAwesome</a></h2>
        <pre v-highlight><code class="html">{{ fontAwesome || html }}</code></pre>

        <hr>

        <h2 class="subtitle">Customizing the default container of floating Notices</h2>
        <p class="mb-16">If you're creating an admin, dashboard panel or desktop app, you probably don't want to have those floating Notices (Toasts & Snackbars) <strong>overlapping</strong> the menu or anything else.
            Change the default container with the following option:</p>
        <code>defaultContentElement: '#app-main'</code>
        <p class="mt-16">Stay aware that this also changes the <code>position</code> of the Notices from <code>fixed</code> to <code>absolute</code>. It means that the container <em>should</em> be <code>fixed</code>.</p>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                importing:
`import Vue from 'vue'
import Buefy from 'buefy'

Vue.use(Buefy)

// OR

Vue.component(Buefy.Checkbox.name, Buefy.Checkbox)
Vue.component(Buefy.Table.name, Table.Checkbox)
...`,
                fontAwesome: `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">`,
                sass:
`// Import Bulma's core
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
                sassFinal:
`... // Your variables

@import "~bulma";
@import "~buefy";`,
                globalOptions:
`Vue.use(Buefy, {
    option1: value,
    option2: value,
    ...
})`
            }
        },
        filters: {
            html(str) {
                return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
            }
        }
    }
</script>
