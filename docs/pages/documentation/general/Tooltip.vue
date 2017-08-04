<template>
    <div class="container">
        <h1 class="title is-spaced">Tooltip</h1>
        <h2 class="subtitle">Display a brief helper text to your user</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <b-tooltip label="Tooltip right" position="is-right">
                    <button class="button is-dark">Right</button>
                </b-tooltip>

                <b-tooltip label="Tooltip top">
                    <button class="button is-dark">Top (default)</button>
                </b-tooltip>

                <b-tooltip label="Tooltip bottom" position="is-bottom">
                    <button class="button is-dark">Bottom</button>
                </b-tooltip>

                <b-tooltip label="Tooltip left" position="is-left">
                    <button class="button is-dark">Left</button>
                </b-tooltip>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h3 class="title is-spaced">Styles</h3>
        <div class="columns">
            <div class="column">
                <b-tooltip label="Text is dashed" dashed>
                    Simple text
                </b-tooltip>

                <b-tooltip label="Maybe you like a little animation" position="is-bottom" animated>
                    <button class="button">Animated</button>
                </b-tooltip>

                <b-tooltip label="You prefer dark?" type="is-dark" position="is-bottom">
                    <button class="button">Dark</button>
                </b-tooltip>

                <b-tooltip label="Or light?" type="is-light" position="is-bottom">
                    <button class="button">Light</button>
                </b-tooltip>

                <b-tooltip label="I'm never closing" always>
                    <button class="button">Always</button>
                </b-tooltip>

                <b-tooltip label="I'm square" position="is-bottom" square>
                    <button class="button">Square</button>
                </b-tooltip>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h3 class="title is-spaced">Multilined</h3>
        <h2 class="subtitle">Well, it's not always <em>that</em> brief</h2>
        <div class="columns">
            <div class="column">
                <b-tooltip label="Tooltip multilined, probably because it's too long for a casual tooltip" multilined>
                    <button class="button is-dark">Multiline (default)</button>
                </b-tooltip>

                <b-tooltip label="It's not briefy, but also not long enough" multilined size="is-small">
                    <button class="button is-dark">Multiline (small)</button>
                </b-tooltip>

                <b-tooltip
                    label="Tooltip large multilined, because it's really long to be on a medium size. Did I tell you it's really long? Yes, it is — I asure you!"
                    position="is-bottom"
                    multilined
                    size="is-large">
                    <button class="button is-dark">Multiline (large)</button>
                </b-tooltip>
            </div>
            <div class="column">
                <pre class="block" v-highlight><code class="html">{{ template3 | pre }}</code></pre>
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
                        description: 'Type (color) of the tooltip',
                        type: 'String',
                        values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                            <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                            <code>is-warning</code>, <code>is-danger</code>,
                            and any other colors you've set in the <code>$colors</code> list on Sass`,
                        default: '<code>is-primary</code>'
                    },
                    {
                        name: '<code>label</code>',
                        description: 'Tooltip text',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>position</code>',
                        description: 'Tooltip position in relation to the element',
                        type: 'String',
                        values: '<code>is-top</code>, <code>is-bottom</code>, <code>is-left</code>, <code>is-right</code>',
                        default: '<code>is-top</code>'
                    },
                    {
                        name: '<code>always</code>',
                        description: 'Tooltip will be always active',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>animated</code>',
                        description: 'Tooltip will have a little fade animation',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>square</code>',
                        description: 'Tooltip will be square (not rounded corners)',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>dashed</code>',
                        description: 'Tooltip slot will have a dashed underline',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>multilined</code>',
                        description: 'Tooltip will be multilined',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>size</code>',
                        description: 'Tooltip multiline size (only works for multilined tooltips)',
                        type: 'String',
                        values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                        default: '<code>is-medium</code>'
                    }
                ],
                template1: `
                <b-tooltip label="Tooltip right" position="is-right">
                    <button class="button is-dark">Right</button>
                </b-tooltip>

                <b-tooltip label="Tooltip top">
                    <button class="button is-dark">Top (default)</button>
                </b-tooltip>

                <b-tooltip label="Tooltip bottom" position="is-bottom">
                    <button class="button is-dark">Bottom</button>
                </b-tooltip>

                <b-tooltip label="Tooltip left" position="is-left">
                    <button class="button is-dark">Left</button>
                </b-tooltip>`,
                template2: `
                <b-tooltip label="Text is dashed" dashed>
                    Simple text
                </b-tooltip>

                <b-tooltip label="Maybe you like a little animation" position="is-bottom" animated>
                    <button class="button">Animated</button>
                </b-tooltip>

                <b-tooltip label="You prefer dark?" type="is-dark" position="is-bottom">
                    <button class="button">Dark</button>
                </b-tooltip>

                <b-tooltip label="Or light?" type="is-light" position="is-bottom">
                    <button class="button">Light</button>
                </b-tooltip>

                <b-tooltip label="I'm never closing" always>
                    <button class="button">Always</button>
                </b-tooltip>

                <b-tooltip label="I'm square" position="is-bottom" square>
                    <button class="button">Square</button>
                </b-tooltip>`,
                template3: `
                <b-tooltip
                    label="Tooltip multilined, probably because it's too long for a casual tooltip"
                    multilined>
                    <button class="button is-dark">Multiline (default)</button>
                </b-tooltip>

                <b-tooltip
                    label="It's not briefy, but also not long enough"
                    multilined
                    size="is-small">
                    <button class="button is-dark">Multiline (small)</button>
                </b-tooltip>

                <b-tooltip
                    label="Tooltip large multilined, because it's really long to be on a medium size. Did I tell you it's really long? Yes, it is — I assure you!"
                    position="is-bottom"
                    multilined
                    size="is-large">
                    <button class="button is-dark">Multiline (large)</button>
                </b-tooltip>`
            }
        }
    }
</script>
