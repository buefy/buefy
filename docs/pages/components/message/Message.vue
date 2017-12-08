<template>
    <div class="container">
        <h1 class="title is-spaced">Message</h1>
        <h2 class="subtitle">Colored message blocks, to draw attention of your user</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" column/>

        <hr>

        <h2 class="title">Types</h2>
        <Example :component="ExTypes" :code="ExTypesCode" column/>

        <hr>

        <h2 class="title">Icons</h2>
        <Example :component="ExIcons" :code="ExIconsCode" column/>

        <hr>

        <h2 class="title">Headerless</h2>
        <p class="content">Message without title becomes headerless, they are always non-closable.</p>
        <Example :component="ExHeaderless" :code="ExHeaderlessCode" column/>

        <hr>

        <h2 class="title">Sizes</h2>
        <Example :component="ExSizes" :code="ExSizesCode" column/>

        <hr>
        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/Message'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from '!!raw-loader!./examples/ExIcons'

    import ExHeaderless from './examples/ExHeaderless'
    import ExHeaderlessCode from '!!raw-loader!./examples/ExHeaderless'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExTypes,
                ExIcons,
                ExHeaderless,
                ExSizes,
                ExSimpleCode,
                ExTypesCode,
                ExIconsCode,
                ExHeaderlessCode,
                ExSizesCode
            }
        }
    }
</script>
