<template>
    <div class="container">
        <h1 class="title is-spaced">Loading</h1>
        <h2 class="subtitle">A simple loading overlay</h2>
        <hr>

        <div class="block">
            <p class="content">The Loading will be closed after about 10 seconds, by pressing escape or by clicking outside.</p>
            <ex-simple></ex-simple>
        </div>
        <code-view :code="ExSimpleCode"></code-view>

        <hr>

        <h2 class="title is-spaced">Programmatically opening</h2>
        <p class="content">When you want to close the Loading, call the <code>close()</code> method from the component.</p>
        <div class="block">
            <ex-programmatically></ex-programmatically>
        </div>
        <code-view :code="ExProgrammaticallyCode"></code-view>

        <hr>
        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExProgrammatically from './examples/ExProgrammatically'
    import ExProgrammaticallyCode from '!!raw-loader!./examples/ExProgrammatically'

    export default {
        components: {
            ExSimple,
            ExProgrammatically
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExProgrammaticallyCode
            }
        }
    }
</script>
