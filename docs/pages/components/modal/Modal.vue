<template>
    <div class="default-container">
        <h1 class="title is-spaced">Modal</h1>
        <h2 class="subtitle">Classic modal overlay to include any content you may need</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExComponent" :code="ExComponentCode" title="Component">
            <p>
                A modal with a component. When you want to close the Modal, call the 'close' method —
                <code>this.$parent.close()</code> — from the component's parent.
            </p>
        </Example>

        <Example :component="ExProgrammatic" :code="ExProgrammaticCode" title="Programmatic">
            <p>Syntax:</p>
            <CodeView lang="javascript" :code="programmaticSyntax | pre" expanded/>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/modal'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExComponent from './examples/ExComponent'
    import ExComponentCode from '!!raw-loader!./examples/ExComponent'

    import ExProgrammatic from './examples/ExProgrammatic'
    import ExProgrammaticCode from '!!raw-loader!./examples/ExProgrammatic'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExComponent,
                ExProgrammatic,
                ExSimpleCode,
                ExComponentCode,
                ExProgrammaticCode,
                programmaticSyntax: `
                // From inside Vue instance
                this.$modal.open(props)

                // From outside Vue instance
                import { ModalProgrammatic } from 'buefy'
                ModalProgrammatic.open(props)`
            }
        }
    }
</script>
