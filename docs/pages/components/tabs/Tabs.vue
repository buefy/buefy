<template>
    <div class="container">
        <h1 class="title is-spaced">Tabs</h1>
        <h2 class="subtitle">Responsive horizontal navigation tabs, switch between contents with ease</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <h2 class="title">Position</h2>
        <Example :component="ExPosition" :code="ExPositionCode"/>

        <h2 class="title">Icons</h2>
        <Example :component="ExIcons" :code="ExIconsCode"/>

        <h2 class="title">Sizes</h2>
        <Example :component="ExSizes" :code="ExSizesCode"/>

        <h2 class="title is-spaced">Types</h2>
        <p class="content">If you want a more classic style with borders add the <code>is-boxed</code> type.</p>
        <Example :component="ExBoxed" :code="ExBoxedCode"/>

        <p class="content">Or like Radio Buttons with the <code>is-toggle</code> type.</p>
        <Example :component="ExToggle" :code="ExToggleCode"/>

        <h2 class="title is-spaced">Expanded</h2>
        <p class="content">If you want the tabs to take full width, add the <code>expanded</code> prop.</p>
        <Example :component="ExExpanded" :code="ExExpandedCode"/>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/Tabs'

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
        data() {
            return {
                api,
                ExSimple,
                ExPosition,
                ExIcons,
                ExSizes,
                ExBoxed,
                ExToggle,
                ExExpanded,
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
