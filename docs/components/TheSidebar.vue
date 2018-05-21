<template>
    <aside class="sidebar menu is-hidden-touch">
        <b-field label="Search in docs">
            <b-autocomplete
                v-model="search"
                placeholder="Insert a component name"
                :data="componentPages"
                field="name"
                :keep-first="true"
                :open-on-focus="true"
                icon="magnify"
                @select="select($event)"
            />
        </b-field>

        <hr style="background-color:#dbdbdb;height:1px;">

        <template v-for="(items, i) in data">
            <p
                class="menu-label has-text-weight-bold"
                :key="items.category">
                {{ items.category }}
            </p>
            <ul
                class="menu-list"
                :key="i"
                style="margin-bottom: 2.5rem;">
                <li v-for="page in items.pages" :key="page.name">
                    <router-link v-if="page.name" :to="page.path">
                        <span class="menu-text">{{ page.name }}</span>
                        <b-tag v-if="page.isNew" type="is-success">New!</b-tag>
                        <b-tag v-if="page.isUpdated" type="is-info">Updated</b-tag>
                    </router-link>

                    <!-- submenu -->
                    <template v-else>
                        <a role="button" @click="toggle">
                            <b-icon
                                icon="chevron-right"
                                size="is-small"
                                class="chevron-icon"
                                :custom-class="isExpanded ? 'mdi-rotate-90' : ''"
                            />
                            <span class="menu-text">{{ page.category }}</span>
                        </a>
                        <ul :class="{ 'is-active': isExpanded }">
                            <li
                                v-for="page in page.pages"
                                :key="page.name">
                                <router-link :to="page.path">
                                    <span class="menu-text">{{ page.name }}</span>
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
        },
        data() {
            return {
                isExpanded: true,
                search: '',
                selected: null
            }
        },
        computed: {
            componentPages() {
                let componentPages = []

                if (this.data) {
                    this.data.filter((category) => {
                        if (category.category === 'UI components') {
                            category.pages.filter((page) => {
                                const pageName = page.name
                                if (pageName) {
                                    if (pageName.startsWith(this.search)) componentPages.push(page)
                                }
                            })
                        }
                    })
                }
                return componentPages
            }
        },
        methods: {
            toggle() {
                this.isExpanded = !this.isExpanded
            },
            select(option) {
                if (option) {
                    this.$router.push(option.path)
                    this.$nextTick(() => { this.search = '' })
                }
            }
        }
    }
</script>
