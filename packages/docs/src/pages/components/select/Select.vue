<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExMultiple" :code="ExMultipleCode" title="Multiple" vertical/>

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <ApiView :data="api"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import { shallowFields } from '@/utils'
    import ApiView from '@/components/ApiView.vue'
    import Example from '@/components/Example.vue'

    import api from './api/select'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExMultiple from './examples/ExMultiple.vue'
    import ExMultipleCode from './examples/ExMultiple.vue?raw'

    import ExIcons from './examples/ExIcons.vue'
    import ExIconsCode from './examples/ExIcons.vue?raw'

    import ExSizes from './examples/ExSizes.vue'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    export default defineComponent({
        components: {
            ApiView,
            Example
        },
        data() {
            return {
                api,
                ...shallowFields({
                    ExSimple,
                    ExMultiple,
                    ExIcons,
                    ExSizes
                }),
                ExSimpleCode,
                ExMultipleCode,
                ExIconsCode,
                ExSizesCode
            }
        }
    })
</script>
