<template>
    <div class="container">
        <h1 class="title is-spaced">Tooltip</h1>
        <h2 class="subtitle">Display a brief helper text to your user</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" column/>

        <hr>

        <h3 class="title is-spaced">Styles</h3>
        <Example :component="ExStyles" :code="ExStylesCode" column/>

        <hr>

        <h3 class="title is-spaced">Multilined</h3>
        <p class="content">Well, it's not always <em>that</em> brief.</p>
        <Example :component="ExMultilined" :code="ExMultilinedCode" column/>

        <hr>

        <h3 class="title is-spaced">Toggle</h3>
        <Example :component="ExToggle" :code="ExToggleCode" column/>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/Tooltip'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExStyles from './examples/ExStyles'
    import ExStylesCode from '!!raw-loader!./examples/ExStyles'

    import ExMultilined from './examples/ExMultilined'
    import ExMultilinedCode from '!!raw-loader!./examples/ExMultilined'

    import ExToggle from './examples/ExToggle'
    import ExToggleCode from '!!raw-loader!./examples/ExToggle'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExStyles,
                ExMultilined,
                ExToggle,
                ExSimpleCode,
                ExStylesCode,
                ExMultilinedCode,
                ExToggleCode
            }
        }
    }
</script>
