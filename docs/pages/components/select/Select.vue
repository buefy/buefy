<template>
    <div class="container">
        <h1 class="title is-spaced">Select</h1>
        <h2 class="subtitle">
            Select an item in a dropdown list.
            Use with <strong><router-link to="/documentation/field">Field</router-link></strong> to access all functionalities
        </h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" column/>

        <hr>
        <h2 class="title is-spaced">Multiple</h2>
        <Example :component="ExMultiple" :code="ExMultipleCode" column/>

        <hr>
        <h2 class="title">Icons</h2>
        <Example :component="ExIcons" :code="ExIconsCode" column/>

        <hr>
        <h2 class="title">Sizes</h2>
        <Example :component="ExSizes" :code="ExSizesCode" column/>

        <hr>
        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/Select'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExMultiple from './examples/ExMultiple'
    import ExMultipleCode from '!!raw-loader!./examples/ExMultiple'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from '!!raw-loader!./examples/ExIcons'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExMultiple,
                ExIcons,
                ExSizes,
                ExSimpleCode,
                ExMultipleCode,
                ExIconsCode,
                ExSizesCode
            }
        }
    }
</script>
