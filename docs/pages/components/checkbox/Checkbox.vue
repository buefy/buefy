<template>
    <div class="is-clipped">
        <h1 class="title is-spaced">Checkbox</h1>
        <h2 class="subtitle">Select a single or grouped options</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <hr>
        <h2 class="title">Grouped (Array)</h2>
        <p class="content">Just add the same <code>v-model</code> to multiple Checkboxes, and set a <code>native-value</code>.</p>
        <Example :component="ExArray" :code="ExArrayCode" vertical/>

        <hr>
        <h2 class="title">Sizes</h2>
        <Example :component="ExSizes" :code="ExSizesCode" vertical/>

        <hr>
        <h2 class="title">Checkbox Button</h2>
        <p class="content">You have to wrap them on a <router-link to="/documentation/field">Field</router-link>.</p>
        <Example :component="ExCheckboxButton" :code="ExCheckboxButtonCode"/>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/Checkbox'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExArray from './examples/ExArray'
    import ExArrayCode from '!!raw-loader!./examples/ExArray'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    import ExCheckboxButton from './examples/ExCheckboxButton'
    import ExCheckboxButtonCode from '!!raw-loader!./examples/ExCheckboxButton'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode,
                ExArray,
                ExArrayCode,
                ExSizes,
                ExSizesCode,
                ExCheckboxButton,
                ExCheckboxButtonCode
            }
        }
    }
</script>
