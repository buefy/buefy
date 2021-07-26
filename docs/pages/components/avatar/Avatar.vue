<template>
    <div>Hello World!!!!!
        <Example :component="ExImage" :code="ExImageCode" title="With Image" vertical/>

        <Example :component="ExWithoutImage" :code="ExWithoutImageCode" title="Without Image" vertical/>
    <!--     <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons" vertical/>

        <Example :component="ExTags" :code="ExTagsCode" title="Tags" vertical/> -->

       <!--  <Example :component="ExRouter" :code="ExRouterCode" title="Router" vertical>
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.7.6</span>
            </div>
        </Example> -->

       <!--  <ApiView :data="api"/>
        <VariablesView :data="variables"/> -->
    </div>
</template>

<script>
    import api from './api/avatar'
    import variables from './variables/avatar'

    import ExImage from './examples/ExImage'
    import ExImageCode from '!!raw-loader!./examples/ExImage'
    import ExWithoutImage from './examples/ExWithoutImage'
    import ExWithoutImageCode from '!!raw-loader!./examples/ExWithoutImage'

    export default {

        // name: 'Avatar',

        data () {
            return {
                api,
                variables,
                ExImage,
                ExImageCode,
                ExWithoutImage,
                ExWithoutImageCode
            }
        }
    }
</script>

<style lang="css" scoped>
</style>