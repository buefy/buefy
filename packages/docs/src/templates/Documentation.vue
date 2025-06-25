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

<script lang="ts">
import { defineComponent } from 'vue'

import TheHeader from '@/components/TheHeader.vue'
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import ImproveThis from '@/components/ImproveThis.vue'
import menuData from '@/data/menu'
import type { PageTree } from '@/data/menu'
import type { Route } from '@/data/routes'

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Documentation',
    components: {
        TheHeader,
        TheNavbar,
        TheFooter,
        TheSidebar,
        ImproveThis
    },
    data() {
        return {
            menu: [] as PageTree[],
            meta: {} as Partial<Route>
        }
    },
    methods: {
        setMeta(meta: Route) {
            this.meta = meta
            this.menu = menuData[this.meta.menu!]
        },
        scrollTo(hash: string) {
            location.href = hash
        }
    },
    mounted() {
        this.$eventHub.on('navigate', this.setMeta)
        this.setMeta(this.$router.currentRoute.value.meta)
        if (this.$route.hash) {
            this.$nextTick(() => this.scrollTo(this.$route.hash))
        }
    },

    beforeUnmount() {
        this.$eventHub.off('navigate', this.setMeta)
    }
})
</script>
