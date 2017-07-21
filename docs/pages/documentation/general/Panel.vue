<template>
    <div class="container">
        <h1 class="title is-spaced">Panel</h1>
        <h2 class="subtitle">A simple and collapsible panel</h2>
        <hr>

        <div class="block">
            <b-switch v-model="isCollapsible">Collapsible</b-switch>
        </div>

        <b-panel :collapsible="isCollapsible">
            <strong slot="header">Title</strong>
            <div class="content">
                <h3>
                    Subtitle
                </h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                    Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br />
                    Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
                </p>
            </div>
        </b-panel>

        <pre class="block" v-highlight><code class="html">{{ template1 | pre }}</code></pre>

        <hr>

        <div class="block">
            <button class="button is-medium is-primary" v-if="!isOpen" @click="isOpen = true"> Open </button>
            <button class="button is-medium is-primary" v-else @click="isOpen = false"> Close </button>
        </div>

        <b-panel :collapsible="true"
                 hasCustomTemplate
                 :open.sync="isOpen"
                 header="Title">
                <p class="panel-tabs">
                    <a class="is-active">All</a>
                    <a>Public</a>
                    <a>Private</a>
                </p>
                <div class="panel-block">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                    Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br />
                    Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
                </div>
        </b-panel>

        <pre class="block" v-highlight><code class="html">{{ template2 | pre }}</code></pre>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="props" default-sort="name">
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

            <b-tab-item label="Slots">
                <b-table :data="slots" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Slot name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="props" label="Props">
                            <span v-html="props.row.props"></span>
                        </b-table-column>
                    </template>
                </b-table>
            </b-tab-item>

            <b-tab-item label="Events">
                <b-table :data="events" default-sort="name">
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

            <b-tab-item label="Methods">
                <b-table :data="methods" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
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
                isOpen: true,
                isCollapsible: false,
                props: [
                    {
                        name: '<code>collapsible</code>',
                        description: 'Panel will be collapsible',
                        type: 'Boolean',
                        values: '',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>open</code>',
                        description: 'Whether panel is open or not, use the .sync modifier to make it two-way binding',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>true</code>'
                    },
                    {
                        name: '<code>hasCustomTemplate</code>',
                        description: 'If your panel content has custom template (see Bulma docs), add this prop',
                        type: 'String',
                        values: '-',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>header</code>',
                        description: 'Simple text or HTML content',
                        type: 'String',
                        values: '—',
                        default: '<code></code>'
                    },
                    {
                        name: '<code>content</code>',
                        description: 'Simple text or HTML content',
                        type: 'String',
                        values: '—',
                        default: '<code></code>'
                    },
                    {
                        name: '<code>animation</code>',
                        description: 'Custom animation (transition name)',
                        type: 'String',
                        values: '—',
                        default: '<code>fade</code>'
                    }
                ],
                slots: [
                    {
                        name: 'default',
                        props: ''
                    },
                    {
                        name: 'header',
                        props: ''
                    }
                ],
                events: [
                    {
                        name: '<code>open</code>',
                        description: 'Triggers when user opened',
                        parameters: '—'
                    },
                    {
                        name: '<code>close</code>',
                        description: 'Triggers when user closed',
                        parameters: '—'
                    }
                ],
                methods: [
                    {
                        name: '<code>toggle</code>',
                        description: 'Toggle activation (if collapsible)'
                    }
                ],
                template1: `
                <div class="block">
                    <b-switch v-model="isCollapsible">Collapsible</b-switch>
                </div>

                <b-panel :collapsible="isCollapsible">
                    <strong slot="header">Title</strong>
                    <div class="content">
                        <h3>
                            Subtitle
                        </h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                            Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br />
                            Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
                        </p>
                    </div>
                </b-panel>`,
                template2: `
                <div class="block">
                    <button class="button is-medium is-primary" v-if="!isOpen" @click="isOpen = true"> Open </button>
                    <button class="button is-medium is-primary" v-else @click="isOpen = false"> Close </button>
                </div>

                <b-panel :collapsible="true"
                         hasCustomTemplate
                         :open.sync="isOpen"
                         header="Title">
                         <p class="panel-tabs">
                            <a class="is-active">All</a>
                            <a>Public</a>
                            <a>Private</a>
                         </p>
                         <div class="panel-block">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
                            Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. <br />
                            Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.
                         </div>
                </b-panel>`
            }
        }
    }
</script>
