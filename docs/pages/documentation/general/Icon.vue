<template>
    <div class="container">
        <h1 class="title is-spaced">Icon</h1>
        <h2 class="subtitle">Icons take an important role of any application</h2>
        <hr>

        <p class="content">Buefy is compatible with both <a href="https://material.io/icons/" target="_blank">Material Design Icons</a>
        and <a href="http://fontawesome.io/" target="_blank">FontAwesome</a>. They adapt to most elements background automatically
        — but you can also override their colors.</p>

        <div class="columns">
            <div class="column">
                <h3 class="subtitle">Material Design Icons</h3>
                <div class="example">
                    <div class="block">
                        <b-icon icon="person"></b-icon>
                        <b-icon icon="home"></b-icon>
                        <b-icon icon="dashboard"></b-icon>
                    </div>

                    <div class="block">
                        <b-icon
                            icon="person"
                            size="is-medium">
                        </b-icon>
                        <b-icon
                            icon="home"
                            size="is-medium">
                        </b-icon>
                        <b-icon
                            icon="dashboard"
                            size="is-medium">
                        </b-icon>
                    </div>

                    <div class="block">
                        <b-icon
                            icon="person"
                            size="is-large"
                            type="is-success">
                        </b-icon>
                        <b-icon
                            icon="home"
                            size="is-large"
                            type="is-info">
                        </b-icon>
                        <b-icon
                            icon="dashboard"
                            size="is-large"
                            type="is-primary">
                        </b-icon>
                    </div>

                    <button class="button is-dark">
                        <b-icon icon="done"></b-icon>
                        <span>Finish</span>
                    </button>

                    <button class="button is-warning">
                        <b-icon icon="done"></b-icon>
                        <span>Finish</span>
                    </button>
                </div>
                <pre class="block" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
            </div>

            <div class="column">
                <h3 class="subtitle">FontAwesome</h3>
                <div class="example">
                    <div class="block">
                        <b-icon
                            pack="fa"
                            icon="user">
                        </b-icon>
                        <b-icon
                            pack="fa"
                            icon="home">
                        </b-icon>
                        <b-icon
                            pack="fa"
                            icon="dashboard">
                        </b-icon>
                    </div>

                    <div class="block">
                        <b-icon
                            pack="fa"
                            icon="user"
                            size="is-medium">
                        </b-icon>
                        <b-icon
                            pack="fa"
                            icon="home"
                            size="is-medium">
                        </b-icon>
                        <b-icon
                            pack="fa"
                            icon="dashboard"
                            size="is-medium">
                        </b-icon>
                    </div>

                    <div class="block">
                        <b-icon
                            pack="fa"
                            icon="user"
                            size="is-large"
                            type="is-success">
                        </b-icon>
                        <b-icon
                            pack="fa"
                            icon="home"
                            size="is-large"
                            type="is-info">
                        </b-icon>
                        <b-icon
                            pack="fa"
                            icon="dashboard"
                            size="is-large"
                            type="is-primary">
                        </b-icon>
                    </div>

                    <button class="button is-dark">
                        <b-icon pack="fa" icon="check"></b-icon>
                        <span>Finish</span>
                    </button>

                    <button class="button is-warning">
                        <b-icon pack="fa" icon="check"></b-icon>
                        <span>Finish</span>
                    </button>
                </div>
                <pre class="block" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h2 class="title">API</h2>
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
        </b-tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                props: [
                    {
                        name: '<code>type</code>',
                        description: 'Type (color) of the icon, optional',
                        type: 'String',
                        values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                            <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                            <code>is-warning</code>, <code>is-danger</code>,
                            and any other colors you've set in the <code>$colors</code> list on Sass`,
                        default: '—'
                    },
                    {
                        name: '<code>pack</code>',
                        description: 'Icon pack to use',
                        type: 'String',
                        values: '<code>mdi</code>, <code>fa</code>',
                        default: '<code>mdi</code>'
                    },
                    {
                        name: '<code>icon</code>',
                        description: 'Icon name',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>size</code>',
                        description: 'Icon size, optional',
                        type: 'String',
                        values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                        default: '—'
                    }
                ],
                template1: `
                <div class="block">
                    <b-icon icon="person"></b-icon>
                    <b-icon icon="home"></b-icon>
                    <b-icon icon="dashboard"></b-icon>
                </div>

                <div class="block">
                    <b-icon
                        icon="person"
                        size="is-medium">
                    </b-icon>
                    <b-icon
                        icon="home"
                        size="is-medium">
                    </b-icon>
                    <b-icon
                        icon="dashboard"
                        size="is-medium">
                    </b-icon>
                </div>

                <div class="block">
                    <b-icon
                        icon="person"
                        size="is-large"
                        type="is-success">
                    </b-icon>
                    <b-icon
                        icon="home"
                        size="is-large"
                        type="is-info">
                    </b-icon>
                    <b-icon
                        icon="dashboard"
                        size="is-large"
                        type="is-primary">
                    </b-icon>
                </div>

                <button class="button is-dark">
                    <b-icon icon="done"></b-icon>
                    <span>Finish</span>
                </button>

                <button class="button is-warning">
                    <b-icon icon="done"></b-icon>
                    <span>Finish</span>
                </button>`,
                template2: `
                <div class="block">
                    <b-icon
                        pack="fa"
                        icon="user">
                    </b-icon>
                    <b-icon
                        pack="fa"
                        icon="home">
                    </b-icon>
                    <b-icon
                        pack="fa"
                        icon="dashboard">
                    </b-icon>
                </div>

                <div class="block">
                    <b-icon
                        pack="fa"
                        icon="user"
                        size="is-medium">
                    </b-icon>
                    <b-icon
                        pack="fa"
                        icon="home"
                        size="is-medium">
                    </b-icon>
                    <b-icon
                        pack="fa"
                        icon="dashboard"
                        size="is-medium">
                    </b-icon>
                </div>

                <div class="block">
                    <b-icon
                        pack="fa"
                        icon="user"
                        size="is-large"
                        type="is-success">
                    </b-icon>
                    <b-icon
                        pack="fa"
                        icon="home"
                        size="is-large"
                        type="is-info">
                    </b-icon>
                    <b-icon
                        pack="fa"
                        icon="dashboard"
                        size="is-large"
                        type="is-primary">
                    </b-icon>
                </div>

                <button class="button is-dark">
                    <b-icon pack="fa" icon="check"></b-icon>
                    <span>Finish</span>
                </button>

                <button class="button is-warning">
                    <b-icon pack="fa" icon="check"></b-icon>
                    <span>Finish</span>
                </button>`
            }
        }
    }
</script>
