<template>
    <div>
        <h1 class="title is-spaced">Quick Start</h1>

        <h2 class="subtitle"><span class="list-number">1</span> Install via npm</h2>
        <pre v-highlight><code class="bash">npm install buefy</code></pre>

        <hr>

        <h2 class="subtitle"><span class="list-number">2</span> Import and use Buefy. You can also enable individual components</h2>
        <p class="content">
            <b>Note:</b> If you want to use your own theme / variables go to
            <router-link to="/documentation/customization">customization section</router-link>.
        </p>
        <pre v-highlight><code class="javascript">{{ importing | pre }}</code></pre>

        <hr>

        <h2 class="subtitle"><span class="list-number">3</span> Include Material Design Icons</h2>
        <p class="content">
            <b>Note:</b> By default Buefy uses <a href="https://material.io/icons/" target="_blank">Material Icons</a>,
            if you want to swap to <a href="http://fontawesome.io/" target="_blank">FontAwesome</a>, go to
            <router-link to="/documentation/constructor-options">constructor options</router-link>.
        </p>
        <pre v-highlight><code class="html">{{ materialIcons }}</code></pre>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                importing: `
                    import Vue from 'vue'
                    import Buefy from 'buefy'
                    import 'buefy/lib/css/buefy.css'

                    Vue.use(Buefy)

                    // OR

                    Vue.component(Buefy.Checkbox.name, Buefy.Checkbox)
                    Vue.component(Buefy.Table.name, Table.Checkbox)
                    ...`,
                materialIcons: '<link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">'
            }
        }
    }
</script>
