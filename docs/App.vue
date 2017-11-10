<template>
    <div id="app">
        <vue-progress-bar></vue-progress-bar>

        <router-view></router-view>
    </div>
</template>

<script>
    import Clipboard from 'clipboard'

    export default {
        name: 'Buefy',
        data() {
            return {
                clipboard: null
            }
        },
        methods: {
            setupClipboardControls() {
                // Destroy clipboard instance if there's any
                this.clipboard && this.clipboard.destroy()

                this.clipboard = new Clipboard('.copy-code', {
                    target: (trigger) => trigger.nextElementSibling.children[0]
                })

                this.clipboard.on('success', (e) => {
                    this.$toast.open('Copied to clipboard!')
                })

                this.clipboard.on('error', (e) => {
                    this.$toast.open({
                        message: 'Error while copying to clipboard :(',
                        type: 'is-danger'
                    })
                })
            }
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

            this.setupClipboardControls()
        },
        mounted() {
            this.$Progress.finish()
        },
        beforeDestroy() {
            // Destroy clipboard instance if there's any
            this.clipboard && this.clipboard.destroy()
        },
        beforeRouteUpdate(to, from, next) {
            this.setupClipboardControls()

            next()
        }
    }
</script>

<style lang="scss">
    @import "./assets/scss/main.scss";

    // Helpers

    .example {
        border: 1px solid $warning;
        border-top-right-radius: $radius;
        color: rgba(0, 0, 0, 0.7);
        padding: 1.5rem;
        position: relative;
        &:not(:first-child) {
            margin-top: 2rem;
        }
        &:not(:last-child) {
            margin-bottom: 1.5rem
        }
        &:before {
            background: $warning;
            border-radius: $radius $radius 0 0;
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
        + .example-code {
            border: 1px solid $warning;
            border-top: none;
            margin-top: -1.5rem;
            &:not(:last-child) {
                margin-bottom: 1.5rem
            }
            + .example-code {
                border: 1px solid $warning;
                border-top: none;
                margin-top: -1.5rem;
                &:not(:last-child) {
                    margin-bottom: 1.5rem
                }
            }
        }
        &.is-flex {
            align-items: center;
        }
    }

    // Highlight (CodeView)

    .highlight {
        position: relative;
        text-align: left !important;
        .button {
            position: absolute;
            right: 1.5rem;
            top: 0.5rem;
            &:hover + pre {
                background: darken($white-ter, 2.5%);
            }
        }
        pre {
            padding: 0;
            code {
                max-height: 400px;
                &.hljs {
                    background: inherit;
                    color: inherit;
                    padding: 1.25rem 1.5rem;
                }
            }
            @include tablet {
                white-space: pre-wrap;
            }
        }
    }

    // Generic

    ::selection {
        background: lighten($primary, 5%);
        color: $primary-invert;
    }

    // Home

    .home {
        .hero.is-fullheight {
            min-height: calc(100vh - #{$navbar-height});
        }
        .logo-rounded,
        .subtitle,
        .npm,
        .github-button {
            margin-bottom: 1.5rem;
        }
        .buttons {
            margin-bottom: 0.5rem;
            justify-content: center;
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

    // Header

    .header.navbar.is-transparent {
        box-shadow: 0 1px 0 rgba($white, 0.2);
    }

    .version {
        flex-direction: column;
        align-items: left;
    }
</style>
