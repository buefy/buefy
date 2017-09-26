<template>
    <div class="container">
        <h1 class="title is-spaced">Icon</h1>
        <h2 class="subtitle">Icons take an important role of any application</h2>
        <hr>

        <p class="content">Buefy is compatible with both <a href="https://material.io/icons/" target="_blank">Material Design Icons</a>
        and <a href="http://fontawesome.io/" target="_blank">FontAwesome</a>. They adapt to most elements background automatically
        — but you can also override their colors.</p>

        <div class="columns">
            <div class="column">
                <h3 class="subtitle">Material Design Icons</h3>
                <div class="example">
                    <ex-mdi></ex-mdi>
                </div>
                <code-view :code="ExMdiCode" bordered></code-view>
            </div>

            <div class="column">
                <h3 class="subtitle">FontAwesome</h3>
                <div class="example">
                    <ex-fa></ex-fa>
                </div>
                <code-view :code="ExFaCode" bordered></code-view>
            </div>
        </div>

        <hr>
        <h2 class="title">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExMdi from './examples/ExMdi'
    import ExMdiCode from '!!raw-loader!./examples/ExMdi'

    import ExFa from './examples/ExFa'
    import ExFaCode from '!!raw-loader!./examples/ExFa'

    export default {
        components: {
            ExMdi,
            ExFa
        },
        data() {
            return {
                api,
                ExMdiCode,
                ExFaCode
            }
        }
    }
</script>
