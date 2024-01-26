<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExMultiple" :code="ExMultipleCode" title="Multiple" vertical/>

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons" vertical/>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/select'
    import { shallowFields } from '@/utils'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExMultiple from './examples/ExMultiple'
    import ExMultipleCode from './examples/ExMultiple.vue?raw'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from './examples/ExIcons.vue?raw'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    export default {
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
    }
</script>
