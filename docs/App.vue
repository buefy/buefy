<template>
    <div id="app">
        <vue-progress-bar></vue-progress-bar>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        mounted() {
            this.$Progress.finish()
        },
        created() {
            this.$Progress.start()
            this.$router.beforeEach((to, from, next) => {
                this.$Progress.start()
                next()
            })
            this.$router.afterEach((to, from) => {
                this.$Progress.finish()
            })
        }
    }
</script>

<style lang="scss">
    @import "~highlight.js/styles/atelier-cave-light.css";
    @import "./assets/main.scss";
    @import "../src/scss/buefy-theme";

    pre {
        white-space: pre-wrap;
        code {
            max-height: 600px;
            &.hljs {
                background: inherit;
                color: inherit;
                padding: 1.25rem 1.5rem;
            }
        }
    }

    .example {
        border: 1px solid #ffdd57;
        border-top-right-radius: 3px;
        color: rgba(0, 0, 0, 0.7);
        padding: 1.5rem;
        position: relative;
        &:before {
            background: #ffdd57;
            border-radius: 3px 3px 0 0;
            bottom: 100%;
            content: "Example";
            display: inline-block;
            font-size: 7px;
            font-weight: bold;
            left: -1px;
            letter-spacing: 1px;
            padding: 3px 5px;
            position: absolute;
            text-transform: uppercase;
            vertical-align: top;
        }
    }
</style>
