<template>
    <section>
        <div class="block">
            <b-switch v-model="showMusic"> Show Music item (using <code>v-if</code>) </b-switch>
        </div>
        <div class="block">
            <b-switch v-model="showBooks"> Show books item (by adding / removing from the array) </b-switch>
        </div>
        <div class="block">
            <b-switch v-model="multiline">Multiline</b-switch>
        </div>
        <b-tabs v-model="activeTab" :multiline="multiline">
            <template v-for="(tab, index) in tabs" :key="tab.id">
                <b-tab-item
                    v-if="tab.displayed"
                    :order="index"
                    :value="tab.id"
                    :label="tab.label">
                    {{ tab.content }}
                </b-tab-item>
            </template>
        </b-tabs>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                activeTab: 'pictures',
                showMusic: true,
                showBooks: false,
                multiline: true
            }
        },
        computed: {
            baseTabs() {
                return [
                    {
                        id: 'pictures',
                        label: 'Pictures',
                        content: 'Pictures: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    },
                    {
                        id: 'music',
                        label: 'Music',
                        content: 'Music: Lorem ipsum dolor sit amet.',
                        displayed: this.showMusic,
                    },
                    {
                        id: 'videos',
                        label: 'Videos',
                        content: 'Videos: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    },
                    {
                        id: 'games',
                        label: 'Games',
                        content: 'Games: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    },
                    {
                        id: 'comics',
                        label: 'Comics',
                        content: 'Comics: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    },
                    {
                        id: 'movies',
                        label: 'Movies',
                        content: 'Movies: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    }
                ]
            },
            tabs() {
                const tabs = [...this.baseTabs]
                if (this.showBooks) {
                    tabs.splice(tabs.length - 2, 0, this.bookTab);
                }
                return tabs
            },
            bookTab() {
                return {
                    id: 'books',
                    label: 'Books',
                    content: 'Books: Lorem ipsum dolor sit amet.',
                    displayed: true,
                }
            }
        }
    }
</script>
