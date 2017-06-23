<template>
    <section>
        <app-header></app-header>

        <div class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Documentation</h1>
                    <h2 class="subtitle">Learn everything you need to start using Buefy ;)</h2>
                </div>
            </div>

            <div class="hero-foot">
                <nav class="tabs is-boxed">
                    <div class="container">
                        <ul>
                            <li v-for="tab in tabs"
                                :key="tab.title"
                                :class="{ 'is-active': currentTab === tab.component }">
                                <a @click="currentTab = tab.component">
                                    {{ tab.title }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>

        <nav class="nav has-shadow">
            <div class="container">
                <component :is="currentTab"></component>
            </div>
        </nav>

        <section class="section">
            <router-view></router-view>
        </section>

        <app-footer></app-footer>
    </section>
</template>

<script>
    import AppHeader from '../../template/Header'
    import AppFooter from '../../template/Footer'

    import Installation from './installation/_Installation'
    import General from './general/_General'
    import Notices from './notices/_Notices'
    import FormElements from './form/_Form'
    import DataManipulation from './data/_Data'

    export default {
        components: {
            AppHeader,
            AppFooter
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
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.currentTab = to.meta.category
            })
        }
    }
</script>
