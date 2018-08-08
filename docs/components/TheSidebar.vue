<template>
    <aside class="sidebar">
        <div class="sidebar-menu">
            <template v-for="(items, i) in data">
                <p class="sidebar-label" :key="items.category">
                    {{ items.category }}
                </p>
                <ul :key="i">
                    <li v-for="item in normalizedData(items.pages)" :key="item.title">
                        <router-link v-if="item.title" :to="item.path">
                            <span class="sidebar-menu-text">{{ item.title }}</span>
                            <b-tag v-if="item.isNew" type="is-success">New!</b-tag>
                            <b-tag v-if="item.isUpdated" type="is-info">Updated</b-tag>
                        </router-link>

                        <!-- submenu -->
                        <template v-else>
                            <p>{{ item.category }}</p>
                            <ul>
                                <li
                                    v-for="subItem in normalizedData(item.pages)"
                                    :key="subItem.title">
                                    <router-link :to="subItem.path">
                                        <span class="sidebar-menu-text">{{ subItem.title }}</span>
                                        <b-tag v-if="subItem.isNew" type="is-success">New!</b-tag>
                                        <b-tag v-if="subItem.isUpdated" type="is-info">
                                            Updated
                                        </b-tag>
                                    </router-link>
                                </li>
                            </ul>
                        </template>
                    </li>
                </ul>
            </template>
        </div>

        <a
            class="sidebar-btt"
            role="button"
            @click="backToTop">
            <b-icon icon="arrow-expand-up" size="is-small"/>
            <span>Back to top</span>
        </a>
    </aside>
</template>

<script>
    import routes from '@/data/routes'

    export default {
        props: {
            data: Array
        },
        methods: {
            normalizedData(items) {
                return items.map((item) => {
                    return typeof item === 'string'
                        ? routes[item]
                        : item
                })
            },
            backToTop() {
                window.scroll({
                    top: 0,
                    behavior: 'smooth'
                })
            }
        }
    }
</script>
