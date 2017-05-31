<template>
    <div class="container">
        <h1 class="title is-spaced">Snackbar</h1>
        <h2 class="subtitle">When a Dialog seems a bit overkill for the task, Snackbars are good candidates</h2>
        <hr>

        <div class="block">
            <p>They can only have one button, and are queued to not confuse the user.</p>
            <p class="content"><small><b>Note:</b> They queue with <router-link to="/documentation/toast">Toasts</router-link> as well.</small></p>
            <button class="button is-medium" @click="snackbar">
                Snackbar (default)
            </button>

            <button class="button is-medium is-warning" @click="warning">
                Snackbar (custom)
            </button>

            <button class="button is-medium is-danger" @click="danger">
                Snackbar (custom)
            </button>
        </div>
        <pre v-highlight><code class="javascript">{{ code | pre }}</code></pre>

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
                        description: 'Type (color) of the action button',
                        type: 'String',
                        values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                            <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                            <code>is-warning</code>, <code>is-danger</code>,
                            and any other colors you've set in the <code>$colors</code> list on Sass`,
                        default: '<code>is-success</code>'
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
                        description: 'Which position the snackbar will appear',
                        type: 'String',
                        values: '<code>is-top-right</code>, <code>is-top</code>, <code>is-top-left</code>, <code>is-bottom-right</code>, <code>is-bottom</code>, <code>is-bottom-left</code>',
                        default: '<code>is-bottom-right</code>'
                    },
                    {
                        name: '<code>duration</code>',
                        description: 'Visibility duration in miliseconds',
                        type: 'Number',
                        values: '—',
                        default: '<code>3500</code>'
                    },
                    {
                        name: '<code>container</code>',
                        description: 'DOM element the toast will be created on. Note that this also changes the <code>position</code> of the toast from <code>fixed</code> to <code>absolute</code>. Meaning that the container should be <code>fixed</code>.',
                        type: 'String',
                        values: '—',
                        default: '<code>body</code>'
                    },
                    {
                        name: '<code>actionText</code>',
                        description: `Snackbar's button text`,
                        type: 'String',
                        values: '—',
                        default: '<code>OK</code>'
                    },
                    {
                        name: '<code>onAction</code>',
                        description: 'Callback function when the button is clicked',
                        type: 'Function',
                        values: '—',
                        default: '—'
                    }
                ],
                code: `
                export default {
                    methods: {
                        snackbar() {
                            this.$snackbar.open(\`Default, positioned bottom-right with a green 'OK' button\`)
                        },
                        warning() {
                            this.$snackbar.open({
                                message: 'Yellow button and positioned top-left',
                                type: 'is-warning',
                                position: 'is-top-left',
                                actionText: 'Retry',
                                onAction: () => {
                                    this.$toast.open('Action pressed')
                                }
                            })
                        },
                        danger() {
                            this.$snackbar.open({
                                message: 'Snackbar with red action, positioned on bottom-left and a callback',
                                type: 'is-danger',
                                position: 'is-bottom-left',
                                actionText: 'Undo',
                                onAction: () => {
                                    this.$toast.open('Action pressed')
                                }
                            })
                        }
                    }
                }`
            }
        },
        methods: {
            snackbar() {
                this.$snackbar.open(`Default, positioned bottom-right with a green 'OK' button`)
            },
            warning() {
                this.$snackbar.open({
                    message: 'Yellow button and positioned top-left',
                    type: 'is-warning',
                    position: 'is-top-left',
                    actionText: 'Retry',
                    onAction: () => {
                        this.$toast.open('Action pressed')
                    }
                })
            },
            danger() {
                this.$snackbar.open({
                    message: 'Snackbar with red action, positioned on bottom-left and a callback',
                    type: 'is-danger',
                    position: 'is-bottom-left',
                    actionText: 'Undo',
                    onAction: () => {
                        this.$toast.open('Action pressed')
                    }
                })
            }
        }
    }
</script>
