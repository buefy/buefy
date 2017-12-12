<template>
    <section :class="namespace">
        <TheHeader ref="header"/>

        <div class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <p class="title">{{ title }}</h2>
                    <p class="subtitle">{{ subtitle }}</p>
                </div>
            </div>
        </div>

        <section class="section">
            <div class="container is-fullhd template-horizontal">
                <TheSidebar :data="menu"/>
                <router-view/>
            </div>
        </section>

        <TheFooter/>
    </section>
</template>

<script>
    import TheHeader from '@/components/TheHeader'
    import TheFooter from '@/components/TheFooter'
    import TheSidebar from '@/components/TheSidebar'
    import menu from '../menu'

    export default {
        components: {
            TheHeader,
            TheFooter,
            TheSidebar
        },
        props: {
            title: String,
            subtitle: String,
            namespace: String
        },
        computed: {
            menu() {
                return menu[this.namespace]
            }
        }
    }
</script>
