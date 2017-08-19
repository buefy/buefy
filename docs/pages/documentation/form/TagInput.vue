<template>
    <div class="container">
        <h1 class="title is-spaced">Tag input</h1>
        <h2 class="subtitle">A simple tag input field. Tags are added when enter or comma are pressed, or when the field loses focus.</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <b-field label="Enter some tags">
                    <b-tag-input v-model="tags">
                    </b-tag-input>
                </b-field>
                <p class="content"><b>Tags:</b> {{ tags }}</p>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Limits</h2>
        <p class="content">You can limit the length and number of tags with the <code>maxlength</code> and <code>maxtags</code> props.</p>

        <div class="columns">
            <div class="column">
                <b-field label="Limited to 10 characters">
                    <b-tag-input maxlength="10"
                        :value="['Bulma', 'Vue', 'Buefy']">
                    </b-tag-input>
                </b-field>

                <b-field label="Limited to 5 tags">
                    <b-tag-input maxtags="5"
                        :value="['One', 'Two', 'Three', 'Four']">
                    </b-tag-input>
                </b-field>

                <b-field label="Limited to 5 characters and 5 tags">
                    <b-tag-input maxlength="5"
                        maxtags="5"
                        :value="['Red', 'Green', 'Blue', 'White']">
                    </b-tag-input>
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">States</h2>

        <div class="columns">
            <div class="column">
                <b-field label="Success" type="is-success">
                    <b-tag-input :value="['Tag']"></b-tag-input>
                </b-field>

                <b-field label="Error" type="is-danger">
                    <b-tag-input :value="['Tag']"></b-tag-input>
                </b-field>

                <b-field label="Info" type="is-info">
                    <b-tag-input :value="['Tag']"></b-tag-input>
                </b-field>

                <b-field label="Warning" type="is-warning">
                    <b-tag-input :value="['Tag']"></b-tag-input>
                </b-field>

                <b-field label="Disabled">
                    <b-tag-input :value="['Tag']" disabled></b-tag-input>
                </b-field>

                <b-field label="Loading">
                    <b-tag-input :value="['Tag']" loading></b-tag-input>
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template3 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Icons</h2>

        <div class="columns">
            <div class="column">
                <b-field label="Enter some tags">
                    <b-tag-input icon="label"
                        :value="['Choose', 'An', 'Icon']">
                    </b-tag-input>
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template4 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Colors</h2>
        <p class="content">You can change the color of tags with the <code>color</code> prop.</p>

        <div class="columns">
            <div class="column">
                <b-field label="Black">
                    <b-tag-input v-model="tags"
                        color="is-black">
                    </b-tag-input>
                </b-field>

                <b-field label="Info">
                    <b-tag-input v-model="tags"
                        color="is-info">
                    </b-tag-input>
                </b-field>

                <b-field label="Success">
                    <b-tag-input v-model="tags"
                        color="is-success">
                    </b-tag-input>
                </b-field>

                <b-field label="Warning">
                    <b-tag-input v-model="tags"
                        color="is-warning">
                    </b-tag-input>
                </b-field>

                <b-field label="Danger">
                    <b-tag-input v-model="tags"
                        color="is-danger">
                    </b-tag-input>
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template5 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Sizes</h2>
        <p class="content">You can change the size of tags with the <code>size</code> prop.</p>

        <div class="columns">
            <div class="column">
                <b-field label="Small">
                    <b-tag-input v-model="tags"
                        size="is-small">
                    </b-tag-input>
                </b-field>

                <b-field label="Medium (default)">
                    <b-tag-input v-model="tags"
                        size="is-medium">
                    </b-tag-input>
                </b-field>

                <b-field label="Large">
                    <b-tag-input v-model="tags"
                        size="is-large">
                    </b-tag-input>
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template6 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Modifiers</h2>
        <p class="content">You can change the style of the tags by setting the <code>rounded</code> and <code>attached</code> props.</p>

        <div class="columns">
            <div class="column">
                <b-field label="Rounded">
                    <b-tag-input v-model="tags"
                        rounded>
                    </b-tag-input>
                </b-field>

                <b-field label="Attached">
                    <b-tag-input v-model="tags"
                        attached>
                    </b-tag-input>
                </b-field>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template7 | pre }}</code></pre>
            </div>
        </div>

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
        </b-tabs>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tags: [
                    'Auckland',
                    'Wellington',
                    'Napier'
                ],
                props: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Binding value',
                        type: 'Array',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>maxlength</code>',
                        description: 'Limits the length of each tag, plus character counter',
                        type: 'String, Number',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>maxtags</code>',
                        description: 'Limits the number of tags, plus tag counter',
                        type: 'String, Number',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>color</code>',
                        description: 'Color of the tags, optional',
                        type: 'String',
                        values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                            <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                            <code>is-warning</code>, <code>is-danger</code>,
                            and any other colors you've set in the <code>$colors</code> list on Sass`,
                        default: '<code>is-primary</code>'
                    },
                    {
                        name: '<code>size</code>',
                        description: 'Tag and input size, optional',
                        type: 'String',
                        values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                        default: '<code>is-medium</code>'
                    },
                    {
                        name: '<code>rounded</code>',
                        description: 'Makes the tags rounded, optional',
                        type: 'Boolean',
                        values: '<code>true</code>, <code>false</code>',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>attached</code>',
                        description: 'Makes the tags attached instead of having an appended delete button, optional',
                        type: 'Boolean',
                        values: '<code>true</code>, <code>false</code>',
                        default: '<code>false</code>'
                    }
                ],
                events: [
                    {
                        name: '<code>input</code>',
                        description: 'Triggers when tags have changed',
                        parameters: '<code>value: Array</code>'
                    },
                    {
                        name: '<code>tagAdded</code>',
                        description: 'Triggers when a tag has been added',
                        parameters: '<code>value: String</code>'
                    },
                    {
                        name: '<code>tagRemoved</code>',
                        description: 'Triggers when a tag has been removed',
                        parameters: '<code>value: String</code>'
                    }
                ],
                template1: `
                <b-field label="Enter some tags">
                    <b-tag-input v-model="tags">
                    </b-tag-input>
                </b-field>`,
                template2: `
                <b-field label="Limited to 10 characters">
                    <b-tag-input maxlength="10">
                    </b-tag-input>
                </b-field>

                <b-field label="Limited to 5 tags">
                    <b-tag-input maxtags="5">
                    </b-tag-input>
                </b-field>

                <b-field label="Limited to 5 characters and 5 tags">
                    <b-tag-input
                        maxlength="5"
                        maxtags="5">
                    </b-tag-input>
                </b-field>`,
                template3: `
                <b-field label="Success" type="is-success">
                    <b-tag-input></b-tag-input>
                </b-field>

                <b-field label="Error" type="is-danger">
                    <b-tag-input></b-tag-input>
                </b-field>

                <b-field label="Info" type="is-info">
                    <b-tag-input></b-tag-input>
                </b-field>

                <b-field label="Warning" type="is-warning">
                    <b-tag-input></b-tag-input>
                </b-field>

                <b-field label="Disabled">
                    <b-tag-input disabled></b-tag-input>
                </b-field>

                <b-field label="Loading">
                    <b-tag-input loading></b-tag-input>
                </b-field>
                `,
                template4: `
                <b-field label="Enter some tags">
                    <b-tag-input icon="label"></b-tag-input>
                </b-field>
                `,
                template5: `
                <b-field label="Black">
                    <b-tag-input v-model="tags"
                        color="is-black">
                    </b-tag-input>
                </b-field>

                <b-field label="Info">
                    <b-tag-input v-model="tags"
                        color="is-info">
                    </b-tag-input>
                </b-field>

                <b-field label="Success">
                    <b-tag-input v-model="tags"
                        color="is-success">
                    </b-tag-input>
                </b-field>

                <b-field label="Warning">
                    <b-tag-input v-model="tags"
                        color="is-warning">
                    </b-tag-input>
                </b-field>

                <b-field label="Danger">
                    <b-tag-input v-model="tags"
                        color="is-danger">
                    </b-tag-input>
                </b-field>
                `,
                template6: `
                <b-field label="Small">
                    <b-tag-input v-model="tags"
                        size="is-small">
                    </b-tag-input>
                </b-field>

                <b-field label="Medium (default)">
                    <b-tag-input v-model="tags"
                        size="is-medium">
                    </b-tag-input>
                </b-field>

                <b-field label="Large">
                    <b-tag-input v-model="tags"
                        size="is-large">
                    </b-tag-input>
                </b-field>
                `,
                template7: `
                <b-field label="Rounded">
                    <b-tag-input v-model="tags"
                        rounded>
                    </b-tag-input>
                </b-field>

                <b-field label="attached">
                    <b-tag-input v-model="tags"
                        attached>
                    </b-tag-input>
                </b-field>
                `
            }
        }
    }
</script>
