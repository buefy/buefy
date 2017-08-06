<template>
    <div class="container">
        <h1 class="title is-spaced">Upload</h1>
        <h2 class="subtitle">Upload one or more files</h2>

        <hr>

        <div class="columns">
            <div class="column">
                <b-field>
                    <b-upload v-model="files">
                        <b-icon icon="file_upload"></b-icon>
                        <span>Click to upload</span>
                    </b-upload>
                    <div v-if="files && files.length" class="control">
                        <a class="button is-static">
                            <span style="display: block;
                                        width: 16em;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;">
                                {{ files[0].name }}
                            </span>
                        </a>
                    </div>
                </b-field>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h2 class="title is-spaced">Drag and drop</h2>

        <div class="columns">
            <div class="column">
                <b-field>
                    <b-upload v-model="dropFiles"
                        multiple
                        drag-drop>

                        <section class="section">
                            <div class="content has-text-centered">
                                <p>
                                    <b-icon
                                        icon="file_upload"
                                        size="is-large">
                                    </b-icon>
                                </p>
                                <p>Drop your files here or click to upload</p>
                            </div>
                        </section>
                    </b-upload>
                </b-field>

                <div class="tags">
                    <span v-for="(file, index) in dropFiles"
                        :key="index"
                        class="tag is-primary" >
                        {{file.name}}
                        <button class="delete is-small"
                            type="button"
                            @click="deleteDropFile(index)">
                        </button>
                    </span>
                </div>

            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code2 | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <b-tabs>
            <b-tab-item label="Properties">
                <b-table :data="props" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name" width="200">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="520">
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

            <b-tab-item label="Methods">
                <b-table :data="methods" default-sort="name">
                    <template scope="props">
                        <b-table-column field="name" label="Name">
                            <span v-html="props.row.name"></span>
                        </b-table-column>
                        <b-table-column field="description" label="Description" width="620">
                            <span v-html="props.row.description"></span>
                        </b-table-column>
                        <b-table-column field="return" label="Return">
                            <span v-html="props.row.return"></span>
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
                files: [],
                dropFiles: [],
                props: [
                    {
                        name: '<code>v-model</code>',
                        description: 'Binding value',
                        type: 'Array<File>',
                        values: '—',
                        default: '[]'
                    },
                    {
                        name: '<code>button-size</code>',
                        description: 'Size of the button',
                        type: 'String',
                        values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                        default: '—'
                    },
                    {
                        name: '<code>button-type</code>',
                        description: 'Type (color) of the button',
                        type: 'String',
                        values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                            <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                            <code>is-warning</code>, <code>is-danger</code>,
                            and any other colors you've set in the <code>$colors</code> list on Sass`,
                        default: '<code>is-primary</code>'
                    },
                    {
                        name: '<code>drag-drop</code>',
                        description: '',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>drag-drop-type</code>',
                        description: 'Type (color) of the drag area (border)',
                        type: 'String',
                        values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                            <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                            <code>is-warning</code>, <code>is-danger</code>,
                            and any other colors you've set in the <code>$colors</code> list on Sass`,
                        default: '<code>is-primary</code>'
                    },
                    {
                        name: '<code>disabled</code>',
                        description: 'Same as native <code>disabled</code>',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>name</code>',
                        description: 'Same as native <code>name</code>',
                        type: 'String',
                        values: '—',
                        default: '-'
                    },
                    {
                        name: '<code>required</code>',
                        description: 'Same as native <code>required</code>',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>multiple</code>',
                        description: 'Same as native <code>multiple</code>',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>accept</code>',
                        description: 'Same as native <code>accept</code>',
                        type: 'String',
                        values: '—',
                        default: '-'
                    },
                    {
                        name: '<code>loading</code>',
                        description: 'Add the loading state',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    }
                ],
                events: [
                    {
                        name: '<code>change</code>',
                        description: 'Triggers when the file list is changed',
                        parameters: '<code>value: String</code>'
                    }
                ],
                methods: [
                    {
                        name: '<code>checkHtml5Validity</code>',
                        description: 'Check validation of HTML5 (add the message and type/color), also updates the <code>isValid</code> property',
                        return: '<code>isValid: Boolean</code>'
                    }
                ],
                template1: `
                <b-field>
                    <b-upload v-model="files">
                        <b-icon icon="file_upload"></b-icon>
                        <span>Click to upload</span>
                    </b-upload>
                    <div v-if="files && files.length" class="control">
                        <a class="button is-static">
                            <span style="display: block;
                                        width: 16em;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        text-overflow: ellipsis;">
                                {{ files[0].name }}
                            </span>
                        </a>
                    </div>
                </b-field>`,
                template2: `
                <b-field>
                    <b-upload v-model="dropFiles"
                        multiple
                        drag-drop>

                        <section class="section">
                            <div class="content has-text-centered">
                                <p>
                                    <b-icon
                                        icon="file_upload"
                                        size="is-large">
                                    </b-icon>
                                </p>
                                <p>Drop your files here or click to upload</p>
                            </div>
                        </section>
                    </b-upload>
                </b-field>

                <div class="tags">
                    <span v-for="(file, index) in dropFiles"
                        :key="index"
                        class="tag is-primary" >
                        {{file.name}}
                        <button class="delete is-small"
                            type="button"
                            @click="deleteDropFile(index)">
                        </button>
                    </span>
                </div>`,
                code2: `
                export default {
                    data() {
                        return {
                            dropFiles: []
                        }
                    },
                    methods: {
                        deleteDropFile(index) {
                            this.currentDropFiles.splice(index, 1)
                        }
                    }
                }`
            }
        },
        methods: {
            deleteDropFile(index) {
                this.dropFiles.splice(index, 1)
            }
        }
    }
</script>
