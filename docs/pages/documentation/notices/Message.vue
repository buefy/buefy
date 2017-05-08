<template>
    <div>
        <h1 class="title is-spaced">Message</h1>
        <h2 class="subtitle">Colored message blocks, to draw attention of your user</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <b-message title="Default">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message title="Danger" type="is-danger">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message title="Danger with icon" type="is-danger" has-icon>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message title="Success" type="is-success">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message title="Success with icon" type="is-success" has-icon>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message title="Info" type="is-info">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message title="Info with icon" type="is-info" has-icon>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message title="Warning" type="is-warning">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message title="Warning with icon" type="is-warning" has-icon>
                    Lorem ipsum dolor sit amet, consectetur warning elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h2 class="subtitle">Message without title becomes headerless</h2>
        <p class="content">They are automatically non-closable.</p>

        <div class="columns">
            <div class="column">
                <b-message>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message type="is-danger">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message type="is-danger" has-icon>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message type="is-success">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message type="is-success" has-icon>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message type="is-info">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message type="is-info" has-icon>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message type="is-warning">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>

                <b-message type="is-warning" has-icon>
                    Lorem ipsum dolor sit amet, consectetur warning elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-message>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h2 class="subtitle">Properties</h2>
        <b-table :data="props" default-sort="name">
            <template scope="props">
                <b-table-column field="name" label="Name"
                    v-html="props.row.name">
                </b-table-column>
                <b-table-column field="description" label="Description" width="620"
                    v-html="props.row.description">
                </b-table-column>
                <b-table-column field="type" label="Type"
                    v-html="props.row.type">
                </b-table-column>
                <b-table-column field="values" label="Values"
                    v-html="props.row.values">
                </b-table-column>
                <b-table-column field="default" label="Default"
                    v-html="props.row.default">
                </b-table-column>
            </template>
        </b-table>

        <h2 class="subtitle">Events</h2>
        <b-table :data="events" default-sort="name">
            <template scope="props">
                <b-table-column field="name" label="Name"
                    v-html="props.row.name">
                </b-table-column>
                <b-table-column field="description" label="Description" width="620"
                    v-html="props.row.description">
                </b-table-column>
                <b-table-column field="parameters" label="Parameters"
                    v-html="props.row.parameters">
                </b-table-column>
            </template>
        </b-table>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                props: [
                    {
                        name: '<code>type</code>',
                        description: 'Type (color) of the message, optional',
                        type: 'String',
                        values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                            <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                            <code>is-warning</code>, <code>is-danger</code>,
                            and any other colors you've set in the <code>$colors</code> list on Sass`,
                        default: '—'
                    },
                    {
                        name: '<code>closable</code>',
                        description: 'If the message can be closed — works if has a <code>title</code>',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>true</code>'
                    },
                    {
                        name: '<code>has-icon</code>',
                        description: 'Adds an icon on the left side depending on the <code>type</code>',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>title</code>',
                        description: 'Message title',
                        type: 'String',
                        values: '—',
                        default: '—'
                    }
                ],
                events: [
                    {
                        name: '<code>close</code>',
                        description: 'Triggers when user closes the message',
                        parameters: '—'
                    }
                ],
                template: `
                    <b-message title="Default">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message title="Danger" type="is-danger">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message title="Danger with icon" type="is-danger" has-icon>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message title="Success" type="is-success">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message title="Success with icon" type="is-success" has-icon>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message title="Info" type="is-info">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message title="Info with icon" type="is-info" has-icon>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message title="Warning" type="is-warning">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message title="Warning with icon" type="is-warning" has-icon>
                        Lorem ipsum dolor sit amet, consectetur warning elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>`,
                template2: `
                    <b-message>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message type="is-danger">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message type="is-danger" has-icon>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message type="is-success">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message type="is-success" has-icon>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message type="is-info">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message type="is-info" has-icon>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message type="is-warning">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>

                    <b-message type="is-warning" has-icon>
                        Lorem ipsum dolor sit amet, consectetur warning elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                    </b-message>`
            }
        }
    }
</script>
