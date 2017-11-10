<template>
    <section class="documentation">
        <TheHeader ref="header" />

        <div class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Documentation</h1>
                    <h2 class="subtitle">Learn everything you need to start using Buefy ;)</h2>
                </div>
            </div>
        </div>

        <section class="section">
            <div class="container is-fullhd template-horizontal">
                <TheSidebar :data="menu" />
                <router-view></router-view>
            </div>
        </section>

        <TheFooter />
    </section>
</template>

<script>
    import DefaultMixin from './DefaultMixin'

    export default {
        mixins: [DefaultMixin],
        data() {
            return {
                menuName: 'menuDocumentation'
            }
        }
    }
</script>
