<template>
    <div class="container">
        <h1 class="title is-spaced">Tooltip</h1>
        <h2 class="subtitle">Display a brief helper text to your user</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-simple/>
                </div>
            </div>
            <div class="column">
                <CodeView :code="ExSimpleCode" />
            </div>
        </div>

        <hr>

        <h3 class="title is-spaced">Styles</h3>
        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-styles/>
                </div>
            </div>
            <div class="column">
                <CodeView :code="ExStylesCode" />
            </div>
        </div>

        <hr>

        <h3 class="title is-spaced">Multilined</h3>
        <p class="content">Well, it's not always <em>that</em> brief.</p>
        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-multilined/>
                </div>
            </div>
            <div class="column">
                <CodeView :code="ExMultilinedCode" />
            </div>
        </div>

        <hr>

        <h3 class="title is-spaced">Toggle</h3>
        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-toggle/>
                </div>
            </div>
            <div class="column">
                <CodeView :code="ExToggleCode" />
            </div>
        </div>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiTooltip'

    import ExSimple from '@/examples/tooltip/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/tooltip/ExSimple'

    import ExStyles from '@/examples/tooltip/ExStyles'
    import ExStylesCode from '!!raw-loader!@/examples/tooltip/ExStyles'

    import ExMultilined from '@/examples/tooltip/ExMultilined'
    import ExMultilinedCode from '!!raw-loader!@/examples/tooltip/ExMultilined'

    import ExToggle from '@/examples/tooltip/ExToggle'
    import ExToggleCode from '!!raw-loader!@/examples/tooltip/ExToggle'

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
