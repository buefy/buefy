<template>
    <div class="container">
        <h1 class="title is-spaced">Radio</h1>
        <h2 class="subtitle">Select an option from a set</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <ex-simple/>
            </div>
            <div class="column">
                <CodeView :code="ExSimpleCode" />
            </div>
        </div>

        <hr>
        <h2 class="title">Sizes</h2>
        <div class="columns">
            <div class="column">
                <ex-sizes/>
            </div>
            <div class="column">
                <CodeView :code="ExSizesCode" />
            </div>
        </div>

        <hr>
        <h2 class="title">Radio Button</h2>
        <p class="content">You have to wrap them on a <router-link to="/documentation/field">Field</router-link>.</p>
        <div class="example">
            <ex-radio-button/>
        </div>
        <CodeView :code="ExRadioButtonCode" bordered />

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiRadio'

    import ExSimple from '@/examples/radio/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/radio/ExSimple'

    import ExSizes from '@/examples/radio/ExSizes'
    import ExSizesCode from '!!raw-loader!@/examples/radio/ExSizes'

    import ExRadioButton from '@/examples/radio/ExRadioButton'
    import ExRadioButtonCode from '!!raw-loader!@/examples/radio/ExRadioButton'

    export default {
        components: {
            ExSimple,
            ExSizes,
            ExRadioButton
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExSizesCode,
                ExRadioButtonCode
            }
        }
    }
</script>
