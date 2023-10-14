<template>
    <main>
        <TheNavbar />

        <section class="documentation">
            <div v-if="!meta.hideSidebar" class="sidebar-bg" />

            <div class="container is-fullhd docs-template-horizontal">
                <TheSidebar v-if="!meta.hideSidebar" :data="menu" />
                <div class="docs-main">
                    <div class="docs-main-container">
                        <TheHeader v-bind="meta" />

                        <router-view />

                        <template v-if="meta.githubPath">
                            <ImproveThis v-bind="meta" />
                        </template>
                    </div>
                </div>
            </div>
        </section>

        <TheFooter />
    </main>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheNavbar from '@/components/TheNavbar'
import TheFooter from '@/components/TheFooter'
import TheSidebar from '@/components/TheSidebar'
import ImproveThis from '@/components/ImproveThis'
import menuData from '@/data/menu'

export default {
    components: {
        TheHeader,
        TheNavbar,
        TheFooter,
        TheSidebar,
        ImproveThis
    },
    data() {
        return {
            menu: [],
            meta: {}
        }
    },
    methods: {
        setMeta(meta) {
            this.meta = meta
            this.menu = menuData[this.meta.menu]
        },
        scrollTo(hash) {
            location.href = hash
        }
    },
    mounted() {
        this.$eventHub.on('navigate', this.setMeta)
        this.setMeta(this.$router.currentRoute.value.meta)
        if (this.$route.hash) {
            this.$nextTick(() => this.scrollTo(this.$route.hash))
        }
    }
}
</script>
