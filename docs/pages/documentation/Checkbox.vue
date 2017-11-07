<template>
    <div class="container">
        <h1 class="title is-spaced">Checkbox</h1>
        <h2 class="subtitle">Select a single or grouped options</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <ex-simple></ex-simple>
            </div>
            <div class="column">
                <CodeView :code="ExSimpleCode" />
            </div>
        </div>

        <hr>
        <h2 class="title">Grouped (Array)</h2>
        <p class="content">Just add the same <code>v-model</code> to multiple Checkboxes, and set a <code>native-value</code>.</p>
        <div class="columns">
            <div class="column">
                <ex-array></ex-array>
            </div>
            <div class="column">
                <CodeView :code="ExArrayCode" />
            </div>
        </div>

        <hr>
        <h2 class="title">Sizes</h2>
        <div class="columns">
            <div class="column">
                <ex-sizes></ex-sizes>
            </div>
            <div class="column">
                <CodeView :code="ExSizesCode" />
            </div>
        </div>

        <hr>
        <h2 class="title">Checkbox Button</h2>
        <p class="content">You have to wrap them on a <router-link to="/documentation/field">Field</router-link>.</p>
        <div class="example">
            <ex-checkbox-button></ex-checkbox-button>
        </div>
        <CodeView :code="ExCheckboxButtonCode" bordered />

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiCheckbox'

    import ExSimple from '@/examples/checkbox/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/checkbox/ExSimple'

    import ExArray from '@/examples/checkbox/ExArray'
    import ExArrayCode from '!!raw-loader!@/examples/checkbox/ExArray'

    import ExSizes from '@/examples/checkbox/ExSizes'
    import ExSizesCode from '!!raw-loader!@/examples/checkbox/ExSizes'

    import ExCheckboxButton from '@/examples/checkbox/ExCheckboxButton'
    import ExCheckboxButtonCode from '!!raw-loader!@/examples/checkbox/ExCheckboxButton'

    export default {
        components: {
            ExSimple,
            ExArray,
            ExSizes,
            ExCheckboxButton
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExArrayCode,
                ExSizesCode,
                ExCheckboxButtonCode
            }
        }
    }
</script>
