<template>
    <div class="container">
        <h1 class="title is-spaced">Modal</h1>
        <h2 class="subtitle">Classic modal overlay to include any content you may need</h2>
        <hr>

        <div class="block">
            <ex-simple></ex-simple>
        </div>
        <pre v-highlight><code class="html">{{ ExSimpleCode }}</code></pre>

        <hr>

        <h2 class="title">Component Modal</h2>
        <div class="content">
            <p>A modal with a component. When you want to close the Modal, call the 'close' method — <code>this.$parent.close()</code> — from the component's parent.</p>
        </div>
        <div class="block">
            <ex-component></ex-component>
        </div>
        <pre class="block" v-highlight><code class="html">{{ ExComponentCode }}</code></pre>

        <h3 class="subtitle">ModalForm component</h3>
        <b-message type="is-warning">
            <b>Note:</b> You should't mutate a prop directly, this is just an example.
        </b-message>
        <pre class="block" v-highlight><code class="html">{{ ModalFormCode }}</code></pre>

        <hr>

        <h2 class="title is-spaced">Programmatically opening HTML Modal</h2>
        <div class="block">
            <ex-programmatic></ex-programmatic>
        </div>
        <pre class="block" v-highlight><code class="html">{{ ExProgrammaticCode}}</code></pre>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExComponent from './examples/ExComponent'
    import ExComponentCode from '!!raw-loader!./examples/ExComponent'
    import ModalFormCode from '!!raw-loader!@/components/ModalForm'

    import ExProgrammatic from './examples/ExProgrammatic'
    import ExProgrammaticCode from '!!raw-loader!./examples/ExProgrammatic'

    export default {
        components: {
            ExSimple,
            ExComponent,
            ExProgrammatic
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExComponentCode,
                ModalFormCode,
                ExProgrammaticCode
            }
        }
    }
</script>
