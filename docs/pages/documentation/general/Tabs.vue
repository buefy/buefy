<template>
    <div class="container">
        <h1 class="title is-spaced">Tabs</h1>
        <h2 class="subtitle">Responsive horizontal navigation tabs, switch between contents with ease</h2>
        <hr>

        <div class="example">
            <button class="button" @click="activeTab = 1">Set Music</button>
            <b-tabs v-model="activeTab">
                <b-tab-item label="Pictures">
                    Lorem ipsum dolor sit amet.
                </b-tab-item>

                <b-tab-item label="Music">
                    Lorem <br>
                    ipsum <br>
                    dolor <br>
                    sit <br>
                    amet.
                </b-tab-item>

                <b-tab-item label="Videos">
                    Nunc nec velit nec libero vestibulum eleifend.
                    Curabitur pulvinar congue luctus.
                    Nullam hendrerit iaculis augue vitae ornare.
                    Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
                </b-tab-item>
            </b-tabs>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
        <pre class="content" v-highlight><code class="javascript">{{ code | pre }}</code></pre>

        <h2 class="title">Position</h2>
        <div class="example">
            <b-tabs position="is-centered" class="block">
                <b-tab-item label="Pictures"></b-tab-item>
                <b-tab-item label="Music"></b-tab-item>
                <b-tab-item label="Videos"></b-tab-item>
            </b-tabs>

            <b-tabs position="is-right" class="block">
                <b-tab-item label="Pictures"></b-tab-item>
                <b-tab-item label="Music"></b-tab-item>
                <b-tab-item label="Videos"></b-tab-item>
            </b-tabs>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template2 | pre }}</code></pre>

        <h2 class="title">Icons</h2>
        <div class="example">
            <b-tabs>
                <b-tab-item label="Pictures" icon="photo_library"></b-tab-item>
                <b-tab-item label="Music" icon="library_music"></b-tab-item>
                <b-tab-item label="Videos" icon="video_library"></b-tab-item>
            </b-tabs>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template3 | pre }}</code></pre>

        <h2 class="title">Sizes</h2>
        <div class="example">
            <b-tabs size="is-small" class="block">
                <b-tab-item label="Pictures" icon="photo_library"></b-tab-item>
                <b-tab-item label="Music" icon="library_music"></b-tab-item>
                <b-tab-item label="Videos" icon="video_library"></b-tab-item>
            </b-tabs>

            <b-tabs size="is-medium" class="block">
                <b-tab-item label="Pictures" icon="photo_library"></b-tab-item>
                <b-tab-item label="Music" icon="library_music"></b-tab-item>
                <b-tab-item label="Videos" icon="video_library"></b-tab-item>
            </b-tabs>

            <b-tabs size="is-large" class="block">
                <b-tab-item label="Pictures" icon="photo_library"></b-tab-item>
                <b-tab-item label="Music" icon="library_music"></b-tab-item>
                <b-tab-item label="Videos" icon="video_library"></b-tab-item>
            </b-tabs>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template4 | pre }}</code></pre>

        <h2 class="title is-spaced">Types</h2>
        <h3 class="subtitle">If you want a more classic style with borders</h3>
        <div class="example">
            <b-tabs type="is-boxed">
                <b-tab-item label="Pictures" icon="photo_library"></b-tab-item>
                <b-tab-item label="Music" icon="library_music"></b-tab-item>
                <b-tab-item label="Videos" icon="video_library"></b-tab-item>
            </b-tabs>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template5 | pre }}</code></pre>

        <h3 class="subtitle">Or like Radio Buttons</h3>
        <div class="example">
            <b-tabs type="is-toggle">
                <b-tab-item label="Pictures" icon="photo_library"></b-tab-item>
                <b-tab-item label="Music" icon="library_music"></b-tab-item>
                <b-tab-item label="Videos" icon="video_library"></b-tab-item>
            </b-tabs>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template6 | pre }}</code></pre>

        <h2 class="title is-spaced">Expanded</h2>
        <div class="example">
            <b-tabs type="is-toggle" expanded>
                <b-tab-item label="Pictures" icon="photo_library"></b-tab-item>
                <b-tab-item label="Music" icon="library_music"></b-tab-item>
                <b-tab-item label="Videos" icon="video_library"></b-tab-item>
            </b-tabs>
        </div>
        <pre class="content" v-highlight><code class="html">{{ template7 | pre }}</code></pre>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <h2 class="subtitle">Tabs</h2>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="tabsProps" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                        <b-table-column field="type" label="Type">
                            <span>{{ props.row.type }}</span>
                        </b-table-column>
                        <b-table-column field="values" label="Values">
                            <span v-html="props.row.values"></span>
                        </b-table-column>
                        <b-table-column field="default" label="Default">
                            <span v-html="props.row.default"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>

            <b-tab-item label="Events">
                <b-table :data="tabsEvents" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                        <b-table-column field="parameters" label="Parameters">
                            <span v-html="props.row.parameters"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>
        </b-tabs>

        <h2 class="subtitle">Tab Item</h2>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="tabItemProps" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                        <b-table-column field="type" label="Type">
                            <span>{{ props.row.type }}</span>
                        </b-table-column>
                        <b-table-column field="values" label="Values">
                            <span v-html="props.row.values"></span>
                        </b-table-column>
                        <b-table-column field="default" label="Default">
                            <span v-html="props.row.default"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>
        </b-tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeTab: 0,
                tabsProps: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Binding value, tab index',
                        type: 'Number',
                        values: '—',
                        default: '<code>0</code>'
                    },
                    {
                        name: '<code>expanded</code>',
                        description: 'Make tab full width',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>animated</code>',
                        description: 'Tabs have slide animation',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>true</code>'
                    },
                    {
                        name: '<code>type</code>',
                        description: 'Type/Style of the tab, optional',
                        type: 'String',
                        values: '<code>is-boxed</code>, <code>is-toggle</code>',
                        default: '—'
                    },
                    {
                        name: '<code>size</code>',
                        description: 'Size of the tab, optional',
                        type: 'String',
                        values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                        default: '—'
                    },
                    {
                        name: '<code>position</code>',
                        description: 'Position of the tab, optional',
                        type: 'String',
                        values: '<code>is-centered</code>, <code>is-right</code>',
                        default: '—'
                    }
                ],
                tabsEvents: [
                    {
                        name: '<code>change</code>',
                        description: 'Triggers when active tab is changed',
                        parameters: '<code>index: Number</code>'
                    }
                ],
                tabItemProps: [
                    {
                        name: '<code>label</code>',
                        description: 'Tab label',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>icon</code>',
                        description: 'Icon name',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>icon-pack</code>',
                        description: 'Icon pack to use',
                        type: 'String',
                        values: '—',
                        default: '<code>mdi</code>'
                    }
                ],
                template1: `
                <button class="button" @click="activeTab = 1">Set Music</button>
                <b-tabs v-model="activeTab">
                    <b-tab-item label="Pictures">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque vestibulum dui vel molestie egestas.
                        Nulla vulputate elementum diam quis consectetur.
                    </b-tab-item>

                    <b-tab-item label="Music">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque vestibulum dui vel molestie egestas.
                        Nulla vulputate elementum diam quis consectetur.
                        Integer pulvinar laoreet nibh non faucibus.
                        Suspendisse ut cursus lectus. Donec consectetur turpis at leo ultricies rhoncus.
                        Cras consequat aliquet eros nec porta.
                        Nullam sit amet mollis turpis.
                        Aenean vitae tortor et velit sodales faucibus.
                    </b-tab-item>

                    <b-tab-item label="Videos">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque vestibulum dui vel molestie egestas.
                        Nulla vulputate elementum diam quis consectetur.
                        Integer pulvinar laoreet nibh non faucibus.
                    </b-tab-item>
                </b-tabs>`,
                code: `
                export default {
                    data() {
                        return {
                            activeTab: 0
                        }
                    }
                }`,
                template2: `
                <b-tabs position="is-centered" class="block">
                    <b-tab-item label="Pictures"></b-tab-item>
                    <b-tab-item label="Music"></b-tab-item>
                    <b-tab-item label="Videos"></b-tab-item>
                </b-tabs>

                <b-tabs position="is-right" class="block">
                    <b-tab-item label="Pictures"></b-tab-item>
                    <b-tab-item label="Music"></b-tab-item>
                    <b-tab-item label="Videos"></b-tab-item>
                </b-tabs>`,
                template3: `
                <b-tabs>
                    <b-tab-item label="Pictures" icon="photo_library"></b-tab-item>
                    <b-tab-item label="Music" icon="library_music"></b-tab-item>
                    <b-tab-item label="Videos" icon="video_library"></b-tab-item>
                </b-tabs>`,
                template4: `
                <b-tabs size="is-small" class="block">
                    <b-tab-item label="Pictures" icon="photo_library"></b-tab-item>
                    <b-tab-item label="Music" icon="library_music"></b-tab-item>
                    <b-tab-item label="Videos" icon="video_library"></b-tab-item>
                </b-tabs>

                <b-tabs size="is-medium" class="block">
                    <b-tab-item label="Pictures" icon="photo_library"></b-tab-item>
                    <b-tab-item label="Music" icon="library_music"></b-tab-item>
                    <b-tab-item label="Videos" icon="video_library"></b-tab-item>
                </b-tabs>

                <b-tabs size="is-large" class="block">
                    <b-tab-item label="Pictures" icon="photo_library"></b-tab-item>
                    <b-tab-item label="Music" icon="library_music"></b-tab-item>
                    <b-tab-item label="Videos" icon="video_library"></b-tab-item>
                </b-tabs>`,
                template5: `
                <b-tabs type="is-boxed">
                    <b-tab-item label="Pictures" icon="photo_library"></b-tab-item>
                    <b-tab-item label="Music" icon="library_music"></b-tab-item>
                    <b-tab-item label="Videos" icon="video_library"></b-tab-item>
                </b-tabs>`,
                template6: `
                <b-tabs type="is-toggle">
                    <b-tab-item label="Pictures" icon="photo_library"></b-tab-item>
                    <b-tab-item label="Music" icon="library_music"></b-tab-item>
                    <b-tab-item label="Videos" icon="video_library"></b-tab-item>
                </b-tabs>`,
                template7: `
                <b-tabs type="is-toggle" expanded>
                    <b-tab-item label="Pictures" icon="photo_library"></b-tab-item>
                    <b-tab-item label="Music" icon="library_music"></b-tab-item>
                    <b-tab-item label="Videos" icon="video_library"></b-tab-item>
                </b-tabs>`
            }
        }
    }
</script>
