<template>
    <section :class="namespace">
        <TheNavbar ref="header"/>

        <div class="sidebar-bg"/>
        <section class="section">
            <div class="container is-fullhd template-horizontal">
                <TheSidebar :data="menu"/>
                <main class="main">
                    <div class="default-container">
                        <TheBreadcrumb/>
                        <router-view/>
                    </div>
                </main>
            </div>
        </section>

        <TheFooter/>
    </section>
</template>

<script>
    import TheBreadcrumb from '@/components/TheBreadcrumb'
    import TheNavbar from '@/components/TheNavbar'
    import TheFooter from '@/components/TheFooter'
    import TheSidebar from '@/components/TheSidebar'
    import menu from '../menu'

    export default {
        components: {
            TheBreadcrumb,
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
