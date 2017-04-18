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
    @import "./assets/main.scss";

    pre {
        @include tablet {
            white-space: pre-wrap;
        }
        code {
            max-height: 600px;
            &.hljs {
                background: inherit;
                color: inherit;
                padding: 1.25rem 1.5rem;
            }
        }
    }

    .list-number {
        margin-right: 8px;
    }

    .example {
        border: 1px solid $warning;
        border-top-right-radius: 3px;
        color: rgba(0, 0, 0, 0.7);
        padding: 1.5rem;
        position: relative;
        &:before {
            background: $warning;
            border-radius: 3px 3px 0 0;
            bottom: 100%;
            content: "Example";
            display: inline-block;
            font-size: 8px;
            font-weight: bold;
            left: -1px;
            letter-spacing: 1px;
            padding: 3px 5px;
            position: absolute;
            text-transform: uppercase;
            vertical-align: top;
        }
        &.is-flex {
            align-items: center;
        }
    }

    ::selection {
        background: lighten($primary, 5%);
        color: $primary-invert;
    }

    .home {
        .logo-rounded,
        .subtitle,
        .npm,
        .github-button {
            margin-bottom: 1.5rem;
        }
        .buttons {
            margin-bottom: 0.5rem;
        }
        .logo-rounded {
            background: $light;
            display: inline-block;
            padding: 2.5rem;
            border-radius: 32px;
            box-shadow: 0 20px 60px rgba(10, 10, 10, 0.05), 0 5px 10px rgba(10, 10, 10, 0.1), 0 1px 1px rgba(10, 10, 10, 0.2);
            img {
                width: 320px;
            }
            @include mobile {
                padding: 2rem;
                img {
                    width: 220px;
                }
            }
        }
        .button + .button {
            margin-left: 0.5rem;
        }
        .npm {
            display: inline-flex;
            font-size: 1.1em;
            color: lighten($primary, 20%);
            background: darken($primary, 20%);
        }
    }
</style>
