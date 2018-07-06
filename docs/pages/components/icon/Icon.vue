<template>
    <div>
        <h1 class="title is-spaced">Icon</h1>
        <h2 class="subtitle">Icons take an important role of any application</h2>
        <hr>

        <p class="content">
            Buefy is compatible with both <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a>
            , <a href="http://fontawesome.io/" target="_blank">FontAwesome 4</a>
            and <a href="https://fontawesome.com/" target="_blank">FontAwesome 5</a>.
            They adapt to most elements background automatically — but you can also override their colors.
        </p>

        <Example :component="ExMdi" :code="ExMdiCode" title="Material Design Icons" vertical/>

        <b-message type="is-info">
            Using <code>far</code> or <code>fad</code> while having FontAwesome free tier might have missing icons.
        </b-message>
        <Example :component="ExFa" :code="ExFaCode" title="FontAwesome" vertical/>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/icon'

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
