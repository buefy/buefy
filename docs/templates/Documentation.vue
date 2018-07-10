<template>
    <main>
        <TheNavbar/>

        <section class="documentation">
            <div class="sidebar-bg"/>

            <div class="container is-fullhd docs-template-horizontal">
                <TheSidebar :data="menu"/>
                <div class="docs-main">
                    <div class="docs-main-container">
                        <TheHeader v-bind="meta"/>

                        <router-view/>

                        <template v-if="meta.githubPath">
                            <hr>

                            <ImproveThis v-bind="meta"/>
                        </template>
                    </div>
                </div>
            </div>
        </section>

        <TheFooter/>
    </main>
</template>

<script>
    import TheHeader from '@/components/TheHeader'
    import TheNavbar from '@/components/TheNavbar'
    import TheFooter from '@/components/TheFooter'
    import TheSidebar from '@/components/TheSidebar'
    import ImproveThis from '@/components/ImproveThis'
    import menu from '../menu'

    export default {
        components: {
            TheHeader,
            TheNavbar,
            TheFooter,
            TheSidebar,
            ImproveThis
        },
        computed: {
            menu() {
                return menu[this.meta.namespace || 'documentation']
            }
        },
        methods: {
            setMetas(meta) {
                this.meta = meta
            }
        },
        created() {
            this.$eventHub.$on('meta', this.setMetas)
            this.setMetas(this.$router.currentRoute.meta)
        }
    }
</script>
