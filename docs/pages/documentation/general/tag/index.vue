<template>
    <div class="container">
        <h1 class="title is-spaced">Tag</h1>
        <h2 class="subtitle">Tag labels to insert anywhere</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-simple></ex-simple>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExSimpleCode"></code-view>
            </div>
        </div>

        <hr>
        <h2 class="title">Closable</h2>
        <p class="content">Closable tags have a button that can be focused, it emits a <code>close</code> event when clicked or when <b>delete</b> key is pressed.</p>
        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-closable></ex-closable>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExClosableCode"></code-view>
            </div>
        </div>

        <hr>
        <h2 class="title">Tag list</h2>
        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-taglist></ex-taglist>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExTaglistCode"></code-view>
            </div>
        </div>

        <p class="content">Use the <code>attached</code> prop to attach tags together.</p>
        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-taglist-attached></ex-taglist-attached>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExTaglistAttachedCode"></code-view>
            </div>
        </div>

        <p class="content">Combine with field to group attached tags.</p>
        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-field-combine></ex-field-combine>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExFieldCombineCode"></code-view>
            </div>
        </div>

        <h2 class="title">Sizes</h2>
        <p class="content">Two additional sizes.</p>
        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-sizes></ex-sizes>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExSizesCode"></code-view>
            </div>
        </div>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

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
        components: {
            ExSimple,
            ExClosable,
            ExTaglist,
            ExTaglistAttached,
            ExFieldCombine,
            ExSizes
        },
        data() {
            return {
                api,
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
