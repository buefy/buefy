<template>
    <div>
        <Example :component="ExImage" :code="ExImageCode" title="With Image" vertical/>

        <Example :component="ExWithoutImage" :code="ExWithoutImageCode" title="Without Image" vertical/>

        <Example :component="ExVariants" :code="ExVariantsCode" title="Colors" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/avatar'
    import variables from './variables/avatar'

    import ExImage from './examples/ExImage'
    import ExImageCode from '!!raw-loader!./examples/ExImage'

    import ExWithoutImage from './examples/ExWithoutImage'
    import ExWithoutImageCode from '!!raw-loader!./examples/ExWithoutImage'

    import ExVariants from './examples/ExVariants'
    import ExVariantsCode from '!!raw-loader!./examples/ExVariants'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    export default {

        data () {
            return {
                api,
                variables,
                ExImage,
                ExImageCode,
                ExWithoutImage,
                ExWithoutImageCode,
                ExVariants,
                ExVariantsCode,
                ExSizes,
                ExSizesCode
            }
        }
    }
</script>

<style lang="css" scoped>
</style>
