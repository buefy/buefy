<template>
    <div>
        <div class="content">
            <blockquote>
                Because images can take a few seconds to load (or not at all), use the <code>image</code> container to specify a <strong>precisely sized</strong>
                container so that your layout isn't broken because of image loading or image errors - Bulma <a href="https://bulma.io/documentation/elements/image/" target="_blank">image</a>.
            </blockquote>
        </div>

        <Example :component="ExSimple" :code="ExSimpleCode" paddingless vertical />

        <Example title="Custom" :component="ExFull" :code="ExFullCode" paddingless />

        <Example title="Arrow" :component="ExArrow" :code="ExArrowCode" paddingless />

        <Example title="Indicator" :component="ExIndicator" :code="ExIndicatorCode" paddingless />

        <Example title="Custom Indicators" :component="ExCustomIndicator" :code="ExCustomIndicatorCode" paddingless>
            Source by <a href="https://picsum.photos/" target="_blank">Picsum</a> Images from <a href="https://unsplash.com/" target="_blank">Unsplash</a>.
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/carousel'
    import variables from './variables/carousel'

    import ExSimple from './examples/ExSimple'
    import ExFull from './examples/ExFull'
    import ExArrow from './examples/ExArrow'
    import ExIndicator from './examples/ExIndicator'
    import ExCustomIndicator from './examples/ExCustomIndicator'

    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'
    import ExFullCode from '!!raw-loader!./examples/ExFull'
    import ExArrowCode from '!!raw-loader!./examples/ExArrow'
    import ExIndicatorCode from '!!raw-loader!./examples/ExIndicator'
    import ExCustomIndicatorCode from '!!raw-loader!./examples/ExCustomIndicator'

    export default {
        data() {
            return {
                api,
                variables,
                ExSimple,
                ExFull,
                ExArrow,
                ExIndicator,
                ExCustomIndicator,
                ExSimpleCode,
                ExFullCode,
                ExArrowCode,
                ExIndicatorCode,
                ExCustomIndicatorCode
            }
        }
    }
</script>
