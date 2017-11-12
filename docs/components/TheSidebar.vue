<template>
    <aside class="sidebar menu is-hidden-touch">
        <template v-for="(items, i) in data">
            <p
                class="menu-label has-text-weight-bold"
                :key="items.category">
                {{ items.category }}
            </p>
            <ul class="menu-list" :key="i" style="margin-bottom: 2.5rem;">
                <li v-for="(page, j) in items.pages" :key="page.name">
                    <router-link :to="page.name | slugify">
                        <span class="menu-text">{{ page.name }}</span>
                        <b-tag v-if="page.isNew" type="is-success">New!</b-tag>
                    </router-link>
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
