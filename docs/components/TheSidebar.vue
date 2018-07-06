<template>
    <aside class="sidebar">
        <template v-for="(items, i) in data">
            <p :key="items.category">
                {{ items.category }}
            </p>
            <ul :key="i">
                <li v-for="page in items.pages" :key="page.name">
                    <router-link v-if="page.name" :to="page.path">
                        <span class="sidebar-menu-text">{{ page.name }}</span>
                        <b-tag v-if="page.isNew" type="is-success">New!</b-tag>
                        <b-tag v-if="page.isUpdated" type="is-info">Updated</b-tag>
                    </router-link>

                    <!-- submenu -->
                    <template v-else>
                        <a role="button">
                            <span class="sidebar-menu-text">{{ page.category }}</span>
                        </a>
                        <ul>
                            <li
                                v-for="page in page.pages"
                                :key="page.name">
                                <router-link :to="page.path">
                                    <span class="sidebar-menu-text">{{ page.name }}</span>
                                    <b-tag v-if="page.isNew" type="is-success">New!</b-tag>
                                    <b-tag v-if="page.isUpdated" type="is-info">Updated</b-tag>
                                </router-link>
                            </li>
                        </ul>
                    </template>
                </li>
            </ul>
        </template>
    </aside>
</template>

<script>
    export default {
        props: {
            data: Array
        }
    }
</script>
