<template>
    <div class="is-clipped">
        <h1 class="title is-spaced">Loading</h1>
        <h2 class="subtitle">A simple loading overlay</h2>
        <hr>

        <p class="content">The Loading will be closed after about 10 seconds, by pressing escape or by clicking outside.</p>
        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <hr>

        <h2 class="title is-spaced">Programmatically opening</h2>
        <p class="content">When you want to close the Loading, call the <code>close()</code> method from the component.</p>
        <Example :component="ExProgrammatically" :code="ExProgrammaticallyCode"/>

        <hr>
        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/Loading'

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
