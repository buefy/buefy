<template>
    <div class="is-clipped">
        <h1 class="title is-spaced">Icon</h1>
        <h2 class="subtitle">Icons take an important role of any application</h2>
        <hr>

        <p class="content">Buefy is compatible with both <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a>
            and <a href="http://fontawesome.io/" target="_blank">FontAwesome</a>. They adapt to most elements background automatically
        — but you can also override their colors.</p>

        <div class="columns">
            <div class="column">
                <h3 class="subtitle">Material Design Icons</h3>
                <Example :component="ExMdi" :code="ExMdiCode"/>
            </div>

            <div class="column">
                <h3 class="subtitle">FontAwesome</h3>
                <Example :component="ExFa" :code="ExFaCode"/>
            </div>
        </div>

        <hr>
        <h2 class="title">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/Icon'

    import ExMdi from './examples/ExMdi'
    import ExMdiCode from '!!raw-loader!./examples/ExMdi'

    import ExFa from './examples/ExFa'
    import ExFaCode from '!!raw-loader!./examples/ExFa'

    export default {
        data() {
            return {
                api,
                ExMdi,
                ExFa,
                ExMdiCode,
                ExFaCode
            }
        }
    }
</script>
