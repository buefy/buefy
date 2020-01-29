<template>
    <section>
        <div class="block">
            <b-switch v-model="showMusic"> Show Music item (using <code>v-if</code>) </b-switch>
        </div>
        <div class="block">
            <b-switch v-model="showBooks"> Show books item (by adding / removing from the array) </b-switch>
        </div>
        <b-tabs v-model="activeTab">
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
                showBooks: false
            }
        },
        computed: {
            baseTabs() {
                return [
                    {
                        label: 'Pictures',
                        content: 'Lorem ipsum dolor sit amet.',
                        displayed: true,
                    },
                    {
                        label: 'Music',
                        content: 'Lorem ipsum dolor sit amet.',
                        displayed: this.showMusic,
                    },
                    {
                        label: 'Videos',
                        content: 'Lorem ipsum dolor sit amet.',
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
                    content: 'Lorem ipsum dolor sit amet.',
                    displayed: true,
                }
            }
        }
    }
</script>
