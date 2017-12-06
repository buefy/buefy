<template>
    <div class="container">
        <h1 class="title is-spaced">Tabs</h1>
        <h2 class="subtitle">Responsive horizontal navigation tabs, switch between contents with ease</h2>
        <hr>

        <div class="example">
            <ex-simple></ex-simple>
        </div>
        <CodeView :code="ExSimpleCode" bordered />

        <h2 class="title">Position</h2>
        <div class="example">
            <ex-position></ex-position>
        </div>
        <CodeView :code="ExPositionCode" bordered />

        <h2 class="title">Icons</h2>
        <div class="example">
            <ex-icons></ex-icons>
        </div>
        <CodeView :code="ExIconsCode" bordered />

        <h2 class="title">Sizes</h2>
        <div class="example">
            <ex-sizes></ex-sizes>
        </div>
        <CodeView :code="ExSizesCode" bordered />

        <h2 class="title is-spaced">Types</h2>
        <p class="content">If you want a more classic style with borders add the <code>is-boxed</code> type.</p>
        <div class="example">
            <ex-boxed></ex-boxed>
        </div>
        <CodeView :code="ExBoxedCode" bordered />

        <p class="content">Or like Radio Buttons with the <code>is-toggle</code> type.</p>
        <div class="example">
            <ex-toggle></ex-toggle>
        </div>
        <CodeView :code="ExToggleCode" bordered />

        <h2 class="title is-spaced">Expanded</h2>
        <p class="content">If you want the tabs to take full width, add the <code>expanded</code> prop.</p>
        <div class="example">
            <ex-expanded></ex-expanded>
        </div>
        <CodeView :code="ExExpandedCode" bordered />

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiTabs'

    import ExSimple from '@/examples/tabs/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/tabs/ExSimple'

    import ExPosition from '@/examples/tabs/ExPosition'
    import ExPositionCode from '!!raw-loader!@/examples/tabs/ExPosition'

    import ExIcons from '@/examples/tabs/ExIcons'
    import ExIconsCode from '!!raw-loader!@/examples/tabs/ExIcons'

    import ExSizes from '@/examples/tabs/ExSizes'
    import ExSizesCode from '!!raw-loader!@/examples/tabs/ExSizes'

    import ExBoxed from '@/examples/tabs/ExBoxed'
    import ExBoxedCode from '!!raw-loader!@/examples/tabs/ExBoxed'

    import ExToggle from '@/examples/tabs/ExToggle'
    import ExToggleCode from '!!raw-loader!@/examples/tabs/ExToggle'

    import ExExpanded from '@/examples/tabs/ExExpanded'
    import ExExpandedCode from '!!raw-loader!@/examples/tabs/ExExpanded'

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
