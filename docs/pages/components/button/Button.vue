<template>
    <div class="default-container">
        <h1 class="title is-spaced">Button</h1>
        <h2 class="subtitle">The classic button, in different colors, sizes, and states</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExColors" :code="ExColorsCode" title="Colors" />

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical />

        <Example :component="ExStylesStates" :code="ExStylesStatesCode" title="Styles/States" />

        <Example :component="ExLinks" :code="ExLinksCode" title="Links" />

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons" />

        <Example :component="ExCustom" :code="ExCustomCode" title="Custom contents" />

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/button'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExColors from './examples/ExColors'
    import ExColorsCode from '!!raw-loader!./examples/ExColors'

    import ExSizes from './examples/ExSizes'
    import ExSizesCode from '!!raw-loader!./examples/ExSizes'

    import ExStylesStates from './examples/ExStylesStates'
    import ExStylesStatesCode from '!!raw-loader!./examples/ExStylesStates'

    import ExLinks from './examples/ExLinks'
    import ExLinksCode from '!!raw-loader!./examples/ExLinks'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from '!!raw-loader!./examples/ExIcons'

    import ExCustom from './examples/ExCustom'
    import ExCustomCode from '!!raw-loader!./examples/ExCustom'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode,
                ExColors,
                ExColorsCode,
                ExSizes,
                ExSizesCode,
                ExStylesStates,
                ExStylesStatesCode,
                ExLinks,
                ExLinksCode,
                ExIcons,
                ExIconsCode,
                ExCustom,
                ExCustomCode,
            }
        }
    }
</script>
