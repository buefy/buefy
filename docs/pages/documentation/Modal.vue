<template>
    <div>
        <h1 class="title is-spaced">Modal</h1>
        <h2 class="subtitle">Classic modal overlay to include any content you may need</h2>
        <hr>

        <div class="block">
            <ex-simple></ex-simple>
        </div>
        <CodeView :code="ExSimpleCode" />

        <hr>

        <h2 class="title">Component Modal</h2>
        <div class="content">
            <p>A modal with a component. When you want to close the Modal, call the 'close' method — <code>this.$parent.close()</code> — from the component's parent.</p>
        </div>
        <div class="block">
            <ex-component></ex-component>
        </div>
        <CodeView :code="ExComponentCode" />

        <h3 class="subtitle">ModalForm component</h3>
        <b-message type="is-warning">
            <b>Note:</b> You should't mutate a prop directly, this is just an example.
        </b-message>
        <CodeView :code="ModalFormCode" />

        <hr>

        <h2 class="title is-spaced">Programmatically opening HTML Modal</h2>
        <div class="block">
            <ex-programmatic></ex-programmatic>
        </div>
        <CodeView :code="ExProgrammaticCode" />

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiModal'

    import ExSimple from '@/examples/modal/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/modal/ExSimple'

    import ExComponent from '@/examples/modal/ExComponent'
    import ExComponentCode from '!!raw-loader!@/examples/modal/ExComponent'
    import ModalFormCode from '!!raw-loader!@/examples/modal/ModalForm'

    import ExProgrammatic from '@/examples/modal/ExProgrammatic'
    import ExProgrammaticCode from '!!raw-loader!@/examples/modal/ExProgrammatic'

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
