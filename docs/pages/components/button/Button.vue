<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypesStates" :code="ExTypesStatesCode" title="Types and states" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons" vertical/>

        <Example :component="ExTags" :code="ExTagsCode" title="Tags" vertical/>

        <Example :component="ExRouter" :code="ExRouterCode" title="Router" vertical>
            <div class="tags has-addons">
                <span class="tag is-success">New!</span>
                <span class="tag is-info">0.7.6</span>
            </div>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/button'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExTypesStates from './examples/ExTypesStates'
    import ExTypesStatesCode from '!!raw-loader!./examples/ExTypesStates'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from '!!raw-loader!./examples/ExIcons'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    import ExTags from './examples/ExTags'
    import ExTagsCode from '!!raw-loader!./examples/ExTags'

    import ExRouter from './examples/ExRouter'
    import ExRouterCode from '!!raw-loader!./examples/ExRouter'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExTypesStates,
                ExIcons,
                ExSizes,
                ExTags,
                ExRouter,
                ExSimpleCode,
                ExTypesStatesCode,
                ExIconsCode,
                ExSizesCode,
                ExTagsCode,
                ExRouterCode
            }
        }
    }
</script>
