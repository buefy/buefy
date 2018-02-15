<template>
    <div class="default-container">
        <h1 class="title is-spaced">Loading</h1>
        <h2 class="subtitle">A simple loading overlay</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode">
            <p>The Loading will be closed after about 10 seconds, by pressing escape or by clicking outside.</p>
            <p>Use <code>:is-full-page="false"</code> to limit loader to its container.</p>
        </Example>

        <Example :component="ExProgrammatically" :code="ExProgrammaticallyCode" title="Programmatically opening">
            <p>When you want to close the Loading, call the <code>close()</code> method from the component.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/loading'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExProgrammatically from './examples/ExProgrammatically'
    import ExProgrammaticallyCode from '!!raw-loader!./examples/ExProgrammatically'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExProgrammatically,
                ExSimpleCode,
                ExProgrammaticallyCode
            }
        }
    }
</script>
