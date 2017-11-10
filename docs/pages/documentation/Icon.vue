<template>
    <div>
        <h1 class="title is-spaced">Icon</h1>
        <h2 class="subtitle">Icons take an important role of any application</h2>
        <hr>

        <p class="content">Buefy is compatible with both <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a>
        and <a href="http://fontawesome.io/" target="_blank">FontAwesome</a>. They adapt to most elements background automatically
        — but you can also override their colors.</p>

        <div class="columns">
            <div class="column">
                <h3 class="subtitle">Material Design Icons</h3>
                <div class="example">
                    <ex-mdi></ex-mdi>
                </div>
                <CodeView :code="ExMdiCode" bordered />
            </div>

            <div class="column">
                <h3 class="subtitle">FontAwesome</h3>
                <div class="example">
                    <ex-fa></ex-fa>
                </div>
                <CodeView :code="ExFaCode" bordered />
            </div>
        </div>

        <hr>
        <h2 class="title">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiIcon'

    import ExMdi from '@/examples/icon/ExMdi'
    import ExMdiCode from '!!raw-loader!@/examples/icon/ExMdi'

    import ExFa from '@/examples/icon/ExFa'
    import ExFaCode from '!!raw-loader!@/examples/icon/ExFa'

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
