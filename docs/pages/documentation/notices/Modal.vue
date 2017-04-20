<template>
    <div>
        <h1 class="title is-spaced">Modals</h1>
        <h2 class="subtitle">Modals inform users</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <h3 class="subtitle">Modal</h3>


                <button class="button is-primary" @click="showMyRichModal = true">Open modal</button>


                <b-modal v-if="showMyRichModal" @close="showMyRichModal = false">
                    <header slot="header" accesskey=""class="modal-card-head">
                        <p class="modal-card-title">Header title</p>
                    </header>
                    <section class="modal-card-body">
                        <p>This can be text, html or any other component</p>
                        <h5 class="title is-5">Example: b-icon</h5>
                        <b-icon
                            icon="person"
                            size="is-large">
                        </b-icon>
                        <h5 class="title is-5">Example: b-message</h5>
                        <b-message type="is-success" has-icon>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                        </b-message>
                    </section>
                    <footer slot="footer" class="modal-card-foot">
                        <button class="button is-danger" @click="showMyRichModal = false">Close</button>
                    </footer>
                </b-modal>


            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template | pre }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code | pre }}</code></pre>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showMyRichModal: false,
                template: `
                    <button class="button is-primary"
                        @click="showMyRichModal = true">
                        Open modal
                    </button>

                    <b-modal v-if="showMyRichModal" @close="showMyRichModal = false">
                        <header slot="header" accesskey=""class="modal-card-head">
                            <p class="modal-card-title">Header title</p>
                        </header>
                        <section class="modal-card-body">
                            <p>This can be text, html or any other component</p>
                            <h5 class="title is-5">Example: b-icon</h5>
                            <b-icon
                                icon="person"
                                size="is-large">
                            </b-icon>
                            <h5 class="title is-5">Example: b-message</h5>
                            <b-message type="is-success" has-icon>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Fusce id fermentum quam. Proin sagittis, nibh id hendrerit
                                imperdiet, elit sapien laoreet elit
                            </b-message>
                        </section>
                        <footer slot="footer" class="modal-card-foot">
                            <button class="button is-danger"
                                @click="showMyRichModal = false">
                                Close
                            </button>
                        </footer>
                    </b-modal>`,
                code: `
                    export default {
                        data() {
                            return {
                                showMyRichModal: false
                            }
                        }
                    }`
            }
        }
    }
</script>
