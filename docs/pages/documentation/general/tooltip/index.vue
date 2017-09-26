<template>
    <div class="container">
        <h1 class="title is-spaced">Tooltip</h1>
        <h2 class="subtitle">Display a brief helper text to your user</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-simple></ex-simple>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExSimpleCode"></code-view>
            </div>
        </div>

        <hr>

        <h3 class="title is-spaced">Styles</h3>
        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-styles></ex-styles>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExStylesCode"></code-view>
            </div>
        </div>

        <hr>

        <h3 class="title is-spaced">Multilined</h3>
        <p class="content">Well, it's not always <em>that</em> brief.</p>
        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-multilined></ex-multilined>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExMultilinedCode"></code-view>
            </div>
        </div>

        <hr>

        <h3 class="title is-spaced">Toggle</h3>
        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-toggle></ex-toggle>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExToggleCode"></code-view>
            </div>
        </div>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExStyles from './examples/ExStyles'
    import ExStylesCode from '!!raw-loader!./examples/ExStyles'

    import ExMultilined from './examples/ExMultilined'
    import ExMultilinedCode from '!!raw-loader!./examples/ExMultilined'

    import ExToggle from './examples/ExToggle'
    import ExToggleCode from '!!raw-loader!./examples/ExToggle'

    export default {
        components: {
            ExSimple,
            ExStyles,
            ExMultilined,
            ExToggle
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExStylesCode,
                ExMultilinedCode,
                ExToggleCode
            }
        }
    }
</script>
