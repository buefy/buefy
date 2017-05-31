<template>
    <div class="container">
        <h1 class="title is-spaced">Modal</h1>
        <h2 class="subtitle">Classic modal overlay to include any content you may need</h2>
        <hr>

        <div class="block">
            <button class="button is-primary is-medium" @click="isImageModalActive = true">Launch image modal</button>
            <button class="button is-primary is-medium" @click="isCardModalActive = true">Launch card modal</button>
        </div>
        <b-modal :active.sync="isImageModalActive">
            <p class="image is-4by3">
                <img src="static/placeholder-1280x960.png">
            </p>
        </b-modal>
        <b-modal :active.sync="isCardModalActive" :width="640">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img src="static/placeholder-1280x960.png" alt="Image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <img src="static/placeholder-1280x960.png" alt="Image">
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
            </div>
        </b-modal>
        <pre class="content" v-highlight><code class="html">{{ template1 | pre }}</code></pre>

        <hr>

        <h2 class="title">Component Modal</h2>
        <div class="content">
            <p>A modal with an injected component. When you want to close the Modal, emit a 'close' event — <code>this.$emit('close')</code> — from the component.</p>
            <p>The component will receive all props from the <code>props</code> object.</p>
            <button class="button is-primary is-medium" @click="isComponentModalActive = true">Launch component modal</button>
        </div>
        <b-modal
            :active.sync="isComponentModalActive"
            :component="ModalForm"
            :props="formProps"
            :width="380">
        </b-modal>
        <pre class="content" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
        <pre class="content" v-highlight><code class="javascript">{{ code2 | pre }}</code></pre>

        <h3 class="subtitle">ModalForm component</h3>
        <p class="content"><b>Note:</b> You should't mutate a prop directly, this is just an example.</p>
        <pre class="content" v-highlight><code class="html">{{ component | pre }}</code></pre>

        <hr>

        <h2 class="title is-spaced">Programmatically opening</h2>

        <div class="block">
            <button class="button is-primary is-medium" @click="imageModal">Launch image modal</button>
            <button class="button is-primary is-medium" @click="cardModal">Launch card modal</button>
        </div>
        <pre class="content" v-highlight><code class="javascript">{{ code3 | pre }}</code></pre>

        <hr>

        <h2 class="title">Programmatically opening Component Modal</h2>
        <div class="content">
            <p>A modal with an injected component. When you want to close the Modal, emit a 'close' event — <code>this.$emit('close')</code> — from the component.</p>
            <p>The component will receive all props from the <code>props</code> object.</p>
            <button class="button is-primary is-medium" @click="componentModal">Launch component modal</button>
        </div>
        <pre class="content" v-highlight><code class="javascript">{{ code4 | pre }}</code></pre>

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
    import ModalForm from '../../../components/ModalForm'

    export default {
        data() {
            return {
                ModalForm,
                isImageModalActive: false,
                isCardModalActive: false,
                isComponentModalActive: false,
                formProps: {
                    email: 'evan@you.com',
                    password: 'testing'
                },
                props: [
                    {
                        name: '<code>active</code>',
                        description: 'Whether modal is active or not, use the <code>.sync</code> modifier to make it two-way binding',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>component</code>',
                        description: `Component to be shown. Close Modal programatically by emitting a 'close' event — <code>this.$emit('close')</code> — from the component`,
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>props</code>',
                        description: 'Props to be binded to the injected component',
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
                events: [
                    {
                        name: '<code>close</code>',
                        description: 'Triggers when user closed/canceled or called programmatically from the injected component',
                        parameters: '—'
                    }
                ],
                template1: `
                <button class="button is-primary is-medium" @click="isImageModalActive = true">Launch image modal</button>
                <button class="button is-primary is-medium" @click="isCardModalActive = true">Launch card modal</button>

                <b-modal :active.sync="isImageModalActive">
                    <p class="image is-4by3">
                        <img src="static/placeholder-1280x960.png">
                    </p>
                </b-modal>

                <b-modal :active.sync="isCardModalActive" :width="640">
                    <div class="card">
                        <div class="card-image">
                            <figure class="image is-4by3">
                                <img src="static/placeholder-1280x960.png" alt="Image">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-48x48">
                                        <img src="static/placeholder-1280x960.png" alt="Image">
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
                    </div>
                </b-modal>
                `,
                template2: `
                <button class="button is-primary is-medium" @click="isComponentModalActive = true">Launch component modal</button>

                <b-modal
                    :active.sync="isComponentModalActive"
                    :component="ModalForm"
                    :props="formProps"
                    :width="380">
                </b-modal>`,
                code2: `
                import ModalForm from './components/ModalForm'

                export default {
                    data() {
                        return {
                            ModalForm,
                            isComponentModalActive: false,
                            formProps: {
                                email: 'evan@you.com',
                                password: 'testing'
                            }
                        }
                    }
                }`,
                code3: `
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
                code4: `
                import ModalForm from './components/ModalForm'

                export default {
                    methods: {
                        componentModal() {
                            this.$modal.open({
                                component: ModalForm,
                                width: 380,
                                props: {
                                    email: 'evan@you.com',
                                    password: 'testing'
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
                        email: 'evan@you.com',
                        password: 'testing'
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
