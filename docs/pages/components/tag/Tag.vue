<template>
    <div class="is-clipped">
        <h1 class="title is-spaced">Tag</h1>
        <h2 class="subtitle">Tag labels to insert anywhere</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <hr>
        <h2 class="title">Closable</h2>
        <p class="content">Closable tags have a button that can be focused, it emits a <code>close</code> event when clicked or when <b>delete</b> key is pressed.</p>
        <Example :component="ExClosable" :code="ExClosableCode" vertical/>

        <hr>
        <h2 class="title">Tag list</h2>
        <Example :component="ExTaglist" :code="ExTaglistCode" vertical/>

        <p class="content">Use the <code>attached</code> prop to attach tags together.</p>
        <Example :component="ExTaglistAttached" :code="ExTaglistAttachedCode" vertical/>

        <p class="content">Combine with field to group attached tags.</p>
        <Example :component="ExFieldCombine" :code="ExFieldCombineCode" vertical/>

        <h2 class="title">Sizes</h2>
        <p class="content">Two additional sizes.</p>
        <Example :component="ExSizes" :code="ExSizesCode" vertical/>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/Tag'

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
