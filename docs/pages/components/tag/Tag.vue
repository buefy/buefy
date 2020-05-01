<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <p class="content">Closable tags have a button that can be focused, it emits a <code>close</code> event when clicked or when <b>delete</b> key is pressed.</p>
        <Example :component="ExClosable" :code="ExClosableCode" title="Closable" vertical/>

        <Example :component="ExTaglist" :code="ExTaglistCode" title="Tag list" vertical/>

        <Example :component="ExTaglistAttached" :code="ExTaglistAttachedCode" vertical>
            <p>Use the <code>attached</code> prop to attach tags together.</p>
        </Example>

        <Example :component="ExFieldCombine" :code="ExFieldCombineCode" vertical>
            <p>Combine with field to group attached tags.</p>
        </Example>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical>
            <p>Two additional sizes.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/tag'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExClosable from './examples/ExClosable'
    import ExClosableCode from '!!raw-loader!./examples/ExClosable'

    import ExTaglist from './examples/ExTaglist'
    import ExTaglistCode from '!!raw-loader!./examples/ExTaglist'

    import ExTaglistAttached from './examples/ExTaglistAttached'
    import ExTaglistAttachedCode from '!!raw-loader!./examples/ExTaglistAttached'

    import ExFieldCombine from './examples/ExFieldCombine'
    import ExFieldCombineCode from '!!raw-loader!./examples/ExFieldCombine'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExClosable,
                ExTaglist,
                ExTaglistAttached,
                ExFieldCombine,
                ExSizes,
                ExSimpleCode,
                ExClosableCode,
                ExTaglistCode,
                ExTaglistAttachedCode,
                ExFieldCombineCode,
                ExSizesCode
            }
        }
    }
</script>
