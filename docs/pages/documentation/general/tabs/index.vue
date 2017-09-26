<template>
    <div class="container">
        <h1 class="title is-spaced">Tabs</h1>
        <h2 class="subtitle">Responsive horizontal navigation tabs, switch between contents with ease</h2>
        <hr>

        <div class="example">
            <ex-simple></ex-simple>
        </div>
        <code-view :code="ExSimpleCode" bordered></code-view>

        <h2 class="title">Position</h2>
        <div class="example">
            <ex-position></ex-position>
        </div>
        <code-view :code="ExPositionCode" bordered></code-view>

        <h2 class="title">Icons</h2>
        <div class="example">
            <ex-icons></ex-icons>
        </div>
        <code-view :code="ExIconsCode" bordered></code-view>

        <h2 class="title">Sizes</h2>
        <div class="example">
            <ex-sizes></ex-sizes>
        </div>
        <code-view :code="ExSizesCode" bordered></code-view>

        <h2 class="title is-spaced">Types</h2>
        <p class="content">If you want a more classic style with borders add the <code>is-boxed</code> type.</p>
        <div class="example">
            <ex-boxed></ex-boxed>
        </div>
        <code-view :code="ExBoxedCode" bordered></code-view>

        <p class="content">Or like Radio Buttons with the <code>is-toggle</code> type.</p>
        <div class="example">
            <ex-toggle></ex-toggle>
        </div>
        <code-view :code="ExToggleCode" bordered></code-view>

        <h2 class="title is-spaced">Expanded</h2>
        <p class="content">If you want the tabs to take full width, add the <code>expanded</code> prop.</p>
        <div class="example">
            <ex-expanded></ex-expanded>
        </div>
        <code-view :code="ExExpandedCode" bordered></code-view>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExPosition from './examples/ExPosition'
    import ExPositionCode from '!!raw-loader!./examples/ExPosition'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from '!!raw-loader!./examples/ExIcons'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    import ExBoxed from './examples/ExBoxed'
    import ExBoxedCode from '!!raw-loader!./examples/ExBoxed'

    import ExToggle from './examples/ExToggle'
    import ExToggleCode from '!!raw-loader!./examples/ExToggle'

    import ExExpanded from './examples/ExExpanded'
    import ExExpandedCode from '!!raw-loader!./examples/ExExpanded'

    export default {
        components: {
            ExSimple,
            ExPosition,
            ExIcons,
            ExSizes,
            ExBoxed,
            ExToggle,
            ExExpanded
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExPositionCode,
                ExIconsCode,
                ExSizesCode,
                ExBoxedCode,
                ExToggleCode,
                ExExpandedCode
            }
        }
    }
</script>
