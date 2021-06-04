<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExComponent" :code="ExComponentCode" title="Component">
            <p>
                A modal with a component. When you want to close the Modal, call the 'close' method —
                <code>this.$parent.close()</code> — from the injected component.
            </p>
            <p>
                <code>trap-focus</code> prop could be useful in this case.
            </p>
        </Example>

        <Example :component="ExProgrammatic" :code="ExProgrammaticCode" title="Programmatic">
            <p>Syntax:</p>
            <CodeView lang="javascript" :code="preformat(programmaticSyntax)" expanded/>
        </Example>

        <Example :component="ExFullScreen" :code="ExFullScreenCode" title="Full Screen">
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.7.8</span>
            </div>
            <p>Add the <code>full-screen</code> prop to cover the whole page.</p>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import { preformat as _preformat } from '@/utils'

    import api from './api/modal'
    import variables from './variables/modal'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExComponent from './examples/ExComponent'
    import ExComponentCode from '!!raw-loader!./examples/ExComponent'

    import ExProgrammatic from './examples/ExProgrammatic'
    import ExProgrammaticCode from '!!raw-loader!./examples/ExProgrammatic'

    import ExFullScreen from './examples/ExFullScreen'
    import ExFullScreenCode from '!!raw-loader!./examples/ExFullScreen'

    export default {
        data() {
            return {
                api,
                variables,
                ExSimple,
                ExComponent,
                ExProgrammatic,
                ExFullScreen,
                ExSimpleCode,
                ExComponentCode,
                ExProgrammaticCode,
                ExFullScreenCode,
                programmaticSyntax: `
                // From inside Vue instance
                this.$buefy.modal.open(props)

                // From outside Vue instance
                import { ModalProgrammatic as Modal } from 'buefy'
                Modal.open(props)`
            }
        },
        methods: {
            preformat(text) {
                return _preformat(text)
            }
        }
    }
</script>
