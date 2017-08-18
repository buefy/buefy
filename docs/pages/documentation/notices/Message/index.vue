<template>
    <div class="container">
        <h1 class="title is-spaced">Message</h1>
        <h2 class="subtitle">Colored message blocks, to draw attention of your user</h2>
        <hr>

        <div class="example">
            <div class="columns">
                <div class="column">
                    <ex-simple></ex-simple>
                </div>
                <div class="column">
                    <pre class="example-code" v-highlight><code class="html">{{ ExSimpleCode }}</code></pre>
                </div>
            </div>
        </div>

        <hr>

        <h2 class="title">Types</h2>

        <div class="example">
            <div class="columns">
                <div class="column">
                    <ex-types></ex-types>
                </div>
                <div class="column">
                    <pre class="example-code" v-highlight><code class="html">{{ ExTypesCode }}</code></pre>
                </div>
            </div>
        </div>

        <hr>

        <h2 class="title">Icons</h2>

        <div class="example">
            <div class="columns">
                <div class="column">
                    <ex-icons></ex-icons>
                </div>
                <div class="column">
                    <pre class="example-code" v-highlight><code class="html">{{ ExIconsCode }}</code></pre>
                </div>
            </div>
        </div>

        <hr>

        <h2 class="title">Headerless</h2>
        <p class="content">Message without title becomes headerless, they are always non-closable.</p>

        <div class="example">
            <div class="columns">
                <div class="column">
                    <ex-headerless></ex-headerless>
                </div>
                <div class="column">
                    <pre class="example-code" v-highlight><code class="html">{{ ExHeaderlessCode }}</code></pre>
                </div>
            </div>
        </div>

        <hr>

        <h2 class="title">Sizes</h2>

        <div class="example">
            <div class="columns">
                <div class="column">
                    <ex-sizes></ex-sizes>
                </div>
                <div class="column">
                    <pre class="example-code" v-highlight><code class="html">{{ ExSizesCode }}</code></pre>
                </div>
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
