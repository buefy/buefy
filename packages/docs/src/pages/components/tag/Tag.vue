<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExIcon" :code="ExIconCode" vertical/>

        <p class="content">Closable tags have a button that can be focused, it emits a <code>close</code> event when clicked or when <b>delete</b> key is pressed.</p>
        <Example :component="ExClosable" :code="ExClosableCode" title="Closable" vertical/>

        <Example :component="ExTaglist" :code="ExTaglistCode" title="Tag list" vertical/>

        <Example :component="ExTaglistAttached" :code="ExTaglistAttachedCode" vertical>
            <p>Use the <code>attached</code> prop to attach tags together.</p>
        </Example>

        <Example :component="ExFieldCombine" :code="ExFieldCombineCode" vertical>
            <p>Combine with field to group attached tags.</p>
        </Example>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes and types" vertical>
            <p>Two additional sizes. Many colors with light variant.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/tag'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'
    import { shallowFields } from '@/utils'

    import ExIcon from './examples/ExIcon'
    import ExIconCode from './examples/ExIcon.vue?raw'

    import ExClosable from './examples/ExClosable'
    import ExClosableCode from './examples/ExClosable.vue?raw'

    import ExTaglist from './examples/ExTaglist'
    import ExTaglistCode from './examples/ExTaglist.vue?raw'

    import ExTaglistAttached from './examples/ExTaglistAttached'
    import ExTaglistAttachedCode from './examples/ExTaglistAttached.vue?raw'

    import ExFieldCombine from './examples/ExFieldCombine'
    import ExFieldCombineCode from './examples/ExFieldCombine.vue?raw'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    export default {
        data() {
            return {
                api,
                ...shallowFields({
                    ExSimple,
                    ExIcon,
                    ExClosable,
                    ExTaglist,
                    ExTaglistAttached,
                    ExFieldCombine,
                    ExSizes
                }),
                ExSimpleCode,
                ExIconCode,
                ExClosableCode,
                ExTaglistCode,
                ExTaglistAttachedCode,
                ExFieldCombineCode,
                ExSizesCode
            }
        }
    }
</script>
