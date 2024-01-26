<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypesStates" :code="ExTypesStatesCode" title="Types and states" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons" vertical/>

        <Example :component="ExTags" :code="ExTagsCode" title="Tags" vertical/>

        <Example :component="ExRouter" :code="ExRouterCode" title="Router" vertical>
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.7.6</span>
            </div>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/button'
    import variables from './variables/button'
    import { shallowFields } from '@/utils'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExTypesStates from './examples/ExTypesStates'
    import ExTypesStatesCode from './examples/ExTypesStates.vue?raw'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from './examples/ExIcons.vue?raw'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    import ExTags from './examples/ExTags'
    import ExTagsCode from './examples/ExTags.vue?raw'

    import ExRouter from './examples/ExRouter'
    import ExRouterCode from './examples/ExRouter.vue?raw'

    export default {
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExTypesStates,
                    ExIcons,
                    ExSizes,
                    ExTags,
                    ExRouter
                }),
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
