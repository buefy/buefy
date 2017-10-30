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

            <div class="hero-foot">
                <div class="container">
                    <nav class="tabs is-boxed">
                        <ul>
                            <li v-for="tab in tabs"
                                :key="tab.title"
                                :class="{ 'is-active': currentTab === tab.component }">
                                <a @click="currentTab = tab.component">
                                    {{ tab.title }}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

        <nav class="navbar has-shadow">
            <div class="container">
                <component :is="currentTab"></component>
            </div>
        </nav>

        <section class="section">
            <router-view></router-view>
        </section>

        <TheFooter />
    </section>
</template>

<script>
    import TheHeader from '@/components/TheHeader'
    import TheFooter from '@/components/TheFooter'

    import Installation from '@/components/DocumentationNavInstallation'
    import General from '@/components/DocumentationNavGeneral'
    import Notices from '@/components/DocumentationNavNotices'
    import FormElements from '@/components/DocumentationNavForm'
    import DataManipulation from '@/components/DocumentationNavData'

    export default {
        components: {
            TheHeader,
            TheFooter
        },
        data() {
            return {
                currentTab: Installation,
                tabs: [
                    {
                        title: 'Installation',
                        component: Installation
                    },
                    {
                        title: 'General',
                        component: General
                    },
                    {
                        title: 'Notices',
                        component: Notices
                    },
                    {
                        title: 'Form',
                        component: FormElements
                    },
                    {
                        title: 'Data',
                        component: DataManipulation
                    }
                ]
            }
        },
        beforeRouteUpdate(to, from, next) {
            this.$refs.header.isMenuActive = false
            this.currentTab = to.meta.category
            next()
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.currentTab = to.meta.category
            })
        }
    }
</script>
