<template>
    <section :class="namespace">
        <TheNavbar/>

        <div class="sidebar-bg"/>
        <section class="section">
            <div class="container is-fullhd template-horizontal">
                <TheSidebar :data="menu"/>
                <main class="main">
                    <div class="default-container">
                        <TheHeader/>

                        <router-view/>
                    </div>
                </main>
            </div>
        </section>

        <TheFooter/>
    </section>
</template>

<script>
    import TheHeader from '@/components/TheHeader'
    import TheNavbar from '@/components/TheNavbar'
    import TheFooter from '@/components/TheFooter'
    import TheSidebar from '@/components/TheSidebar'
    import menu from '../menu'

    export default {
        components: {
            TheHeader,
            TheNavbar,
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
