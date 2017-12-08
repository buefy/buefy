<template>
    <div class="container">
        <h1 class="title is-spaced">Radio</h1>
        <h2 class="subtitle">Select an option from a set</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" column/>

        <hr>
        <h2 class="title">Sizes</h2>
        <Example :component="ExSizes" :code="ExSizesCode" column/>

        <hr>
        <h2 class="title">Radio Button</h2>
        <p class="content">You have to wrap them on a <router-link to="/documentation/field">Field</router-link>.</p>
        <Example :component="ExRadioButton" :code="ExRadioButtonCode"/>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/Radio'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    import ExRadioButton from './examples/ExRadioButton'
    import ExRadioButtonCode from '!!raw-loader!./examples/ExRadioButton'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSizes,
                ExRadioButton,
                ExSimpleCode,
                ExSizesCode,
                ExRadioButtonCode
            }
        }
    }
</script>
