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
            <template v-for="(tab, index) in tabs">
                <b-tab-item
                    v-if="tab.displayed"
                    :key="index"
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
                activeTab: 0,
                showMusic: true,
                showBooks: false,
                multiline: true
            }
        },
        computed: {
            baseTabs() {
                return [
                    {
                        label: 'Pictures',
                        content: 'Pictures: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    },
                    {
                        label: 'Music',
                        content: 'Music: Lorem ipsum dolor sit amet.',
                        displayed: this.showMusic,
                    },
                    {
                        label: 'Videos',
                        content: 'Videos: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    },
                    {
                        label: 'Games',
                        content: 'Games: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    },
                    {
                        label: 'Comics',
                        content: 'Comics: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    },
                    {
                        label: 'Movies',
                        content: 'Movies: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    }
                ]
            },
            tabs() {
                const tabs = [...this.baseTabs]
                if (this.showBooks) {
                    tabs.splice(tabs.length - 1, 0, this.bookTab);
                }
                return tabs
            },
            bookTab() {
                return {
                    label: 'Books',
                    content: 'Books: Lorem ipsum dolor sit amet.',
                    displayed: true,
                }
            }
        }
    }
</script>
