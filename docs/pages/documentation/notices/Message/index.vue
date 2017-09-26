<template>
    <div class="container">
        <h1 class="title is-spaced">Message</h1>
        <h2 class="subtitle">Colored message blocks, to draw attention of your user</h2>
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

        <h2 class="title">Types</h2>

        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-types></ex-types>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExTypesCode"></code-view>
            </div>
        </div>

        <hr>

        <h2 class="title">Icons</h2>

        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-icons></ex-icons>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExIconsCode"></code-view>
            </div>
        </div>

        <hr>

        <h2 class="title">Headerless</h2>
        <p class="content">Message without title becomes headerless, they are always non-closable.</p>

        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-headerless></ex-headerless>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExHeaderlessCode"></code-view>
            </div>
        </div>

        <hr>

        <h2 class="title">Sizes</h2>

        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-sizes></ex-sizes>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExSizesCode"></code-view>
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

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from '!!raw-loader!./examples/ExIcons'

    import ExHeaderless from './examples/ExHeaderless'
    import ExHeaderlessCode from '!!raw-loader!./examples/ExHeaderless'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    export default {
        components: {
            ExSimple,
            ExTypes,
            ExIcons,
            ExHeaderless,
            ExSizes
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExTypesCode,
                ExIconsCode,
                ExHeaderlessCode,
                ExSizesCode
            }
        }
    }
</script>
