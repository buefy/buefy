<template>
    <div class="container">
        <h1 class="title is-spaced">Modal</h1>
        <h2 class="subtitle">Programatically modal overlay to include any content you may need</h2>
        <hr>

        <div class="block">
            <button class="button is-primary is-medium" @click="imageModal"> Launch image modal</button>
            <button class="button is-primary is-medium" @click="cardModal"> Launch card modal</button>
        </div>
        <pre class="content" v-highlight><code class="javascript">{{ code1 | pre }}</code></pre>

        <hr>

        <h2 class="title is-spaced">Component Modal</h2>
        <div class="content">
            <p>A modal with an injected component. When you want to close the Modal, emit a 'close' event — <code>this.$emit('close')</code> — from the component.</p>
            <p>The component will receive all props from the <code>props</code> object.</p>
            <button class="button is-primary is-medium" @click="componentModal"> Launch component modal</button>
        </div>
        <pre class="content" v-highlight><code class="javascript">{{ code2 | pre }}</code></pre>
        <h3 class="subtitle">ModalForm component</h3>
        <p class="content"><b>Note:</b> You should't mutate a prop directly, this is just an example.</p>
        <pre class="content" v-highlight><code class="html">{{ component | pre }}</code></pre>


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
    </div>
</template>

<script>
    import ModalForm from '../../../components/ModalForm'

    export default {
        data() {
            return {
                email: 'evan@you.com',
                password: 'testing',
                props: [
                    {
                        name: '<code>component</code>',
                        description: `Component to be shown. Close Modal programatically by emitting a 'close' event — <code>this.$emit('close')</code> — from the component`,
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>props</code>',
                        description: 'Props to be binded to the component',
                        type: 'Object',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>content</code>',
                        description: 'HTML content',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>width</code>',
                        description: 'Width of the Modal, maximum of <code>960</code>',
                        type: 'Number, String',
                        values: '—',
                        default: '<code>960</code>'
                    },
                    {
                        name: '<code>canCancel</code>',
                        description: `Can close Modal by clicking 'X', pressing escape or clicking outside`,
                        type: 'Boolean',
                        values: '—',
                        default: '<code>true</code>'
                    },
                    {
                        name: '<code>onCancel</code>',
                        description: `Callback function to call after user canceled (clicked 'X' / pressed escape / clicked outside)`,
                        type: 'Function',
                        values: '—',
                        default: '—'
                    }
                ],
                code1: `
                export default {
                    methods: {
                        imageModal() {
                            this.$modal.open(
                                \`<p class="image is-4by3">
                                    <img src="./static/placeholder-1280x960.png">
                                </p>\`
                            )
                        },
                        cardModal() {
                            this.$modal.open({
                                width: 640,
                                content: \`<div class="card">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                        <img src="./static/placeholder-1280x960.png" alt="Image">
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="media">
                                        <div class="media-left">
                                            <figure class="image is-48x48">
                                            <img src="./static/placeholder-1280x960.png" alt="Image">
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <p class="title is-4">John Smith</p>
                                            <p class="subtitle is-6">@johnsmith</p>
                                        </div>
                                        </div>

                                        <div class="content">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                                        <a>#css</a> <a>#responsive</a>
                                        <br>
                                        <small>11:09 PM - 1 Jan 2016</small>
                                        </div>
                                    </div>
                                </div>\`
                            })
                        }
                    }
                }`,
                code2: `
                import ModalForm from './components/ModalForm'

                export default {
                    data() {
                        return {
                            email: 'evan@you.com',
                            password: 'testing'
                        }
                    },
                    methods: {
                        componentModal() {
                            this.$modal.open({
                                component: ModalForm,
                                width: 380,
                                props: {
                                    email: this.email,
                                    password: this.password
                                }
                            })
                        }
                    }
                }`,
                component: `
                <template>
                    <div class="modal-card">
                        <form action="">
                            <header class="modal-card-head">
                                <p class="modal-card-title">Login</p>
                            </header>
                            <section class="modal-card-body">
                                <b-field label="Email">
                                    <b-input
                                        type="email"
                                        v-model="email"
                                        placeholder="Your email"
                                        required>
                                    </b-input>
                                </b-field>

                                <b-field label="Password">
                                    <b-input
                                        type="password"
                                        v-model="password"
                                        password-reveal
                                        placeholder="Your password"
                                        required>
                                    </b-input>
                                </b-field>

                                <b-checkbox>Remember me</b-checkbox>
                            </section>
                            <footer class="modal-card-foot">
                                <button class="button" type="button" @click="$emit('close')">Close</button>
                                <button class="button is-primary">Login</button>
                            </footer>
                        </form>
                    </div>
                </template>

                <script>
                    export default {
                        props: ['email', 'password']
                    }
                <\/script>


                <style scoped>
                    .modal-card {
                        margin: 0 auto;
                        width: auto;
                    }
                </style>`
            }
        },
        methods: {
            componentModal() {
                this.$modal.open({
                    component: ModalForm,
                    width: 380,
                    props: {
                        email: this.email,
                        password: this.password
                    }
                })
            },
            imageModal() {
                this.$modal.open(
                    `<p class="image is-4by3">
                        <img src="./static/placeholder-1280x960.png">
                    </p>`
                )
            },
            cardModal() {
                this.$modal.open({
                    width: 640,
                    content: `<div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                            <img src="./static/placeholder-1280x960.png" alt="Image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                            <div class="media-left">
                                <figure class="image is-48x48">
                                <img src="./static/placeholder-1280x960.png" alt="Image">
                                </figure>
                            </div>
                            <div class="media-content">
                                <p class="title is-4">John Smith</p>
                                <p class="subtitle is-6">@johnsmith</p>
                            </div>
                            </div>

                            <div class="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                            <a>#css</a> <a>#responsive</a>
                            <br>
                            <small>11:09 PM - 1 Jan 2016</small>
                            </div>
                        </div>
                    </div>`
                })
            }
        }
    }
</script>
