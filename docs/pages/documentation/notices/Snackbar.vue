<template>
    <div>
        <h1 class="title is-spaced">Snackbar</h1>
        <h2 class="subtitle">When Dialog seems a bit overkill for the task, Snackbars are good candidates</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <p>They can only have one button, and are queued to not confuse the user.</p>
                <p class="content"><small><strong>Note:</strong> They queue with <router-link to="/documentation/notices/toast">Toasts</router-link> as well.</small></p>
                <button class="button content" @click="snackbar">Snackbar (default)</button>
                <button class="button content is-warning" @click="warning">Snackbar (custom)</button>
                <button class="button content is-danger" @click="danger">Snackbar (custom)</button>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code }}</code></pre>
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
                        description: 'Color scheme',
                        type: 'String',
                        values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>, <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>, <code>is-warning</code>, <code>is-danger</code>, and any other colors you've set in the <code>$colors</code> list on Sass`,
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
                        values: '<code>top-right</code>, <code>top</code>, <code>top-left</code>, <code>bottom-right</code>, <code>bottom</code>, <code>bottom-left</code>',
                        default: '<code>bottom-right</code>'
                    },
                    {
                        name: '<code>duration</code>',
                        description: 'Visibility duration in miliseconds',
                        type: 'Number',
                        values: '—',
                        default: '<code>4000</code>'
                    },
                    {
                        name: '<code>container</code>',
                        description: 'DOM element the toast will be created on. Note that this also changes the <code>position</code> of the toast from <code>fixed</code> to <code>absolute</code>. Meaning that the container should be <code>fixed</code>.',
                        type: 'String',
                        values: '—',
                        default: '—'
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
                template:
`<button class="button content" @click="snackbar">Snackbar (default)</button>
<button class="button content is-warning" @click="warning">Snackbar (custom)</button>
<button class="button content is-danger" @click="danger">Snackbar (custom)</button>`,
                code:
`export default {
    methods: {
        snackbar() {
            this.$snackbar.open({
                message: \`Default, positioned bottom-right with a green 'OK' button\`
            })
        },
        warning() {
            this.$snackbar.open({
                message: 'Yellow button and positioned top-left',
                type: 'is-warning',
                actionText: 'Retry',
                position: 'top-left'
            })
        },
        danger() {
            this.$snackbar.open({
                message: 'Snackbar with red action, positioned on bottom-left and a callback',
                type: 'is-danger',
                actionText: 'Undo',
                position: 'bottom-left',
                onAction: () => {
                    this.$toast.open({
                        message: 'Action pressed'
                    })
                }
            })
        }
    }
}`
            }
        },
        methods: {
            snackbar() {
                this.$snackbar.open({
                    message: `Default, positioned bottom-right with a green 'OK' button`
                })
            },
            warning() {
                this.$snackbar.open({
                    message: 'Yellow button and positioned top-left',
                    type: 'is-warning',
                    actionText: 'Retry',
                    position: 'top-left'
                })
            },
            danger() {
                this.$snackbar.open({
                    message: 'Snackbar with red action, positioned on bottom-left and a callback',
                    type: 'is-danger',
                    actionText: 'Undo',
                    position: 'bottom-left',
                    onAction: () => {
                        this.$toast.open({
                            message: 'Action pressed'
                        })
                    }
                })
            }
        }
    }
</script>
