<template>
    <div class="container">
        <h1 class="title is-spaced">Tag</h1>
        <h2 class="subtitle">Tag labels to insert anywhere</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <b-tag>Tag label</b-tag>
                </div>

                <div class="field">
                    <b-tag rounded>Rounded tag label</b-tag>
                </div>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Closable</h2>
        <p class="content">Closable tags have a button that can be focused, it emits a <code>close</code> event when clicked or when <b>delete</b> key is pressed.</p>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <b-tag v-if="isTag1Active"
                        type="is-primary"
                        closable
                        @close="isTag1Active = false">
                        Colored closable tag label
                    </b-tag>
                </div>

                <div class="field">
                    <b-tag v-if="isTag2Active"
                        attached
                        closable
                        @close="isTag2Active = false">
                        Attached closable tag label
                    </b-tag>
                </div>

                <div class="field">
                    <b-tag v-if="isTag3Active"
                        type="is-danger"
                        attached
                        closable
                        @close="isTag3Active = false">
                        Colored attached closable tag label
                    </b-tag>
                </div>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
                <pre class="block" v-highlight><code class="javascript">{{ code2 | pre }}</code></pre>
            </div>
        </div>

        <hr>
        <h2 class="title">Tag list</h2>
        <div class="columns">
            <div class="column">
                <b-taglist>
                    <b-tag type="is-info">First</b-tag>
                    <b-tag type="is-info">Second</b-tag>
                    <b-tag type="is-info">Third</b-tag>
                    <b-tag type="is-info">Fourth</b-tag>
                    <b-tag type="is-info">Fifth</b-tag>
                </b-taglist>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template3 | pre }}</code></pre>
            </div>
        </div>

        <p class="content">Use the <code>attached</code> prop to attach tags together.</p>
        <div class="columns">
            <div class="column">
                <b-taglist attached>
                    <b-tag type="is-dark">npm</b-tag>
                    <b-tag type="is-info">0.5.1</b-tag>
                </b-taglist>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template4 | pre }}</code></pre>
            </div>
        </div>

        <p class="content">Combine with field to group attached tags.</p>
        <div class="columns">
            <div class="column">
                <div class="block">
                    <b-field grouped group-multiline>
                        <div class="control">
                            <b-taglist attached>
                                <b-tag type="is-dark">npm</b-tag>
                                <b-tag type="is-info">0.5.1</b-tag>
                            </b-taglist>
                        </div>

                        <div class="control">
                            <b-taglist attached>
                                <b-tag type="is-dark">downloads</b-tag>
                                <b-tag type="is-success">15k</b-tag>
                            </b-taglist>
                        </div>

                        <div class="control">
                            <b-taglist attached>
                                <b-tag type="is-dark">chat</b-tag>
                                <b-tag type="is-primary">on discord</b-tag>
                            </b-taglist>
                        </div>
                    </b-field>
                </div>

                <b-field grouped group-multiline>
                    <div class="control">
                        <b-tag type="is-primary" attached closable>Technology</b-tag>
                    </div>

                    <div class="control">
                        <b-tag type="is-primary" attached closable>Vuejs</b-tag>
                    </div>

                    <div class="control">
                        <b-tag type="is-primary" attached closable>CSS</b-tag>
                    </div>

                    <div class="control">
                        <b-tag type="is-primary" attached closable>Flexbox</b-tag>
                    </div>
                </b-field>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template5 | pre }}</code></pre>
            </div>
        </div>

        <h2 class="title">Sizes</h2>
        <p class="content">Two additional sizes.</p>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <b-tag type="is-primary" size="is-medium">Medium</b-tag>
                </div>
                <div class="field">
                    <b-tag type="is-info" size="is-large">Large</b-tag>
                </div>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template6 | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <h2 class="subtitle">Tag</h2>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="tagProps" default-sort="name">
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
                <b-table :data="tagEvents" default-sort="name">
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

        <h2 class="subtitle">Taglist</h2>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="taglistProps" default-sort="name">
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
                isTag1Active: true,
                isTag2Active: true,
                isTag3Active: true,
                tagProps: [
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
                        name: '<code>size</code>',
                        description: 'Size of the tab, optional',
                        type: 'String',
                        values: '<code>is-medium</code>, <code>is-large</code>',
                        default: '—'
                    },
                    {
                        name: '<code>rounded</code>',
                        description: 'Tag border rounded',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>closable</code>',
                        description: 'Add close/delete button to the tag',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>attached</code>',
                        description: 'Close/delete button style equal to attached tags',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    }
                ],
                tagEvents: [
                    {
                        name: '<code>close</code>',
                        description: 'Triggers when close/delete button is clicked or <b>delete</b> key is pressed',
                        parameters: '—'
                    }
                ],
                taglistProps: [
                    {
                        name: '<code>attached</code>',
                        description: 'Tabs inside are attached together',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    }
                ],
                template1: `
                <b-tag>Tag label</b-tag>
                <b-tag rounded>Rounded tag label</b-tag>`,
                template2: `
                <b-tag v-if="isTag1Active"
                    type="is-primary"
                    closable
                    @close="isTag1Active = false">
                    Colored closable tag label
                </b-tag>

                <b-tag v-if="isTag2Active"
                    attached
                    closable
                    @close="isTag2Active = false">
                    Attached closable tag label
                </b-tag>

                <b-tag v-if="isTag3Active"
                    type="is-danger"
                    attached
                    closable
                    @close="isTag3Active = false">
                    Colored attached closable tag label
                </b-tag>`,
                code2: `
                export default {
                    data() {
                        return {
                            isTag1Active: true,
                            isTag2Active: true,
                            isTag3Active: true
                        }
                    }
                }`,
                template3: `
                <b-taglist>
                    <b-tag type="is-info">First</b-tag>
                    <b-tag type="is-info">Second</b-tag>
                    <b-tag type="is-info">Third</b-tag>
                    <b-tag type="is-info">Fourth</b-tag>
                    <b-tag type="is-info">Fifth</b-tag>
                </b-taglist>`,
                template4: `
                <b-taglist attached>
                    <b-tag type="is-dark">npm</b-tag>
                    <b-tag type="is-info">0.5.1</b-tag>
                </b-taglist>`,
                template5: `
                <b-field grouped group-multiline>
                    <div class="control">
                        <b-taglist attached>
                            <b-tag type="is-dark">npm</b-tag>
                            <b-tag type="is-info">0.5.1</b-tag>
                        </b-taglist>
                    </div>

                    <div class="control">
                        <b-taglist attached>
                            <b-tag type="is-dark">downloads</b-tag>
                            <b-tag type="is-success">15k</b-tag>
                        </b-taglist>
                    </div>

                    <div class="control">
                        <b-taglist attached>
                            <b-tag type="is-dark">chat</b-tag>
                            <b-tag type="is-primary">on discord</b-tag>
                        </b-taglist>
                    </div>
                </b-field>

                <b-field grouped group-multiline>
                    <div class="control">
                        <b-tag type="is-primary" attached closable>Technology</b-tag>
                    </div>

                    <div class="control">
                        <b-tag type="is-primary" attached closable>Vuejs</b-tag>
                    </div>

                    <div class="control">
                        <b-tag type="is-primary" attached closable>CSS</b-tag>
                    </div>

                    <div class="control">
                        <b-tag type="is-primary" attached closable>Flexbox</b-tag>
                    </div>
                </b-field>`,
                template6: `
                <b-tag
                    type="is-primary"
                    size="is-medium">
                    Medium
                </b-tag>

                <b-tag
                    type="is-info"
                    size="is-large">
                    Large
                </b-tag>`
            }
        }
    }
</script>
