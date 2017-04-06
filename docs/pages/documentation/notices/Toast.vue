<template>
    <div>
        <h1 class="title is-spaced">Toast</h1>
        <h2 class="subtitle">Toasts are simple text messages to inform the user</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <p>They have a slightly transparency and are queued to not confuse the user.</p>
                <p class="content"><small><strong>Note:</strong> They queue with <router-link to="/documentation/snackbar">Snackbars</router-link> as well.</small></p>
                <button class="button content" @click="toast">
                    Toast (default)
                </button>

                <button class="button content is-success" @click="success">
                    Toast (custom)
                </button>

                <button class="button content is-danger" @click="danger">
                    Toast (custom)
                </button>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h2 class="subtitle">Properties</h2>
        <b-table
            :data="props"
            default-sort="name"
            html>
            <b-table-column
                field="name"
                label="Name">
            </b-table-column>
            <b-table-column
                field="description"
                label="Description"
                width="620">
            </b-table-column>
            <b-table-column
                field="type"
                label="Type">
            </b-table-column>
            <b-table-column
                field="values"
                label="Values">
            </b-table-column>
            <b-table-column
                field="default"
                label="Default">
            </b-table-column>
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
                        description: 'Type (color) of the toast',
                        type: 'String',
                        values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                            <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                            <code>is-warning</code>, <code>is-danger</code>,
                            and any other colors you've set in the <code>$colors</code> list on Sass`,
                        default: '<code>is-primary</code>'
                    },
                    {
                        name: '<code>message</code>',
                        description: 'Message text',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>position</code>',
                        description: 'Which position the toast will appear',
                        type: 'String',
                        values: '<code>top-right</code>, <code>top</code>, <code>top-left</code>, <code>bottom-right</code>, <code>bottom</code>, <code>bottom-left</code>',
                        default: '<code>top</code>'
                    },
                    {
                        name: '<code>duration</code>',
                        description: 'Visibility duration in miliseconds',
                        type: 'Number',
                        values: '—',
                        default: '<code>2500</code>'
                    },
                    {
                        name: '<code>container</code>',
                        description: 'DOM element the toast will be created on. Note that this also changes the <code>position</code> of the toast from <code>fixed</code> to <code>absolute</code>. Meaning that the container should be <code>fixed</code>.',
                        type: 'String',
                        values: '—',
                        default: '—'
                    }
                ],
                template: `
                    <button class="button content" @click="toast">
                        Toast (default)
                    </button>

                    <button class="button content is-success" @click="success">
                        Toast (custom)
                    </button>

                    <button class="button content is-danger" @click="danger">
                        Toast (custom)
                    </button>`,
                code: `
                    export default {
                        methods: {
                            toast() {
                                this.$toast.open({
                                    message: 'Something happened'
                                })
                            },
                            success() {
                                this.$toast.open({
                                    message: 'Something happened correctly!',
                                    type: 'is-success'
                                })
                            },
                            danger() {
                                this.$toast.open({
                                    message: \`Something's not good, also I'm on bottom\`,
                                    position: 'bottom',
                                    type: 'is-danger'
                                })
                            }
                        }
                    }`
            }
        },
        methods: {
            toast() {
                this.$toast.open({
                    message: 'Something happened'
                })
            },
            success() {
                this.$toast.open({
                    message: 'Something happened correctly!',
                    type: 'is-success'
                })
            },
            danger() {
                this.$toast.open({
                    message: `Something's not good, also I'm on bottom`,
                    position: 'bottom',
                    type: 'is-danger'
                })
            }
        }
    }
</script>
