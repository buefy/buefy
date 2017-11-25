<template>
    <div>
        <h1 class="title is-spaced">Loading</h1>
        <h2 class="subtitle">A simple loading overlay</h2>
        <hr>

        <div class="block">
            <p class="content">The Loading will be closed after about 10 seconds, by pressing escape or by clicking outside.</p>
            <ex-simple></ex-simple>
        </div>
        <CodeView :code="ExSimpleCode" />

        <hr>

        <h2 class="title is-spaced">Programmatically opening</h2>
        <p class="content">When you want to close the Loading, call the <code>close()</code> method from the component.</p>
        <div class="block">
            <ex-programmatically></ex-programmatically>
        </div>
        <CodeView :code="ExProgrammaticallyCode" />

        <hr>
        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiLoading'

    import ExSimple from '@/examples/loading/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/loading/ExSimple'

    import ExProgrammatically from '@/examples/loading/ExProgrammatically'
    import ExProgrammaticallyCode from '!!raw-loader!@/examples/loading/ExProgrammatically'

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
