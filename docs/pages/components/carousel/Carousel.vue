<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" paddingless vertical />
        <Example title="Custom Carousel" :component="ExFull" :code="ExFullCode" paddingless />
        <Example title="Custom Indicators" :component="ExIndicator" :code="ExIndicatorCode" paddingless>
            Source Images from picsum and Unsplash
        </Example>

        <div class="content">
            <h4>Todo</h4>
            <div class="columns">
                <div class="column">
                    <h6>General:</h6>
                    <ol type="1">
                        <li><s>Auto Play</s></li>
                        <li><s>Pause on hover</s></li>
                        <li><s>Animated: fade, slide</s></li>
                        <li>Responsive with Custom CSS <code>height</code> or use <code>.image</code></li>
                        <li>Support <code>touchDrag</code></li>
                        <li>Support <code>mouseDrag</code></li>
                        <li>Support <code>event.key</code></li>
                        <li>like google card without <code>$el.getBoundingClientRect()</code> or use columns with card for <code>b-carousel-card</code></li>
                    </ol>
                </div>
                <div class="column">
                    <h6>Arrow:</h6>
                    <ol type="1">
                        <li><s>Between both</s></li>
                        <li><s>Style: Hover, Always, Hidden</s></li>
                        <li><s>Icon: Pack, Size, Prev, Next</s></li>
                    </ol>
                    <h6>Indicator:</h6>
                    <ol type="1">
                        <li><s>Inside/Outside</s></li>
                        <li>
                            Style: <s>Dots</s>, Stick, Line, Box
                        </li>
                        <li><s>Custom Indicator</s></li>
                    </ol>
                </div>
            </div>
            <h4>Bugs</h4>
            <ul>
                <li><s>Blank if click Prev or Next</s></li>
                <li>Custom indicator: in :src include <code>props.i + 1</code></li>
            </ul>
        </div>
        <hr>
        <b-message type="is-info">
            <strong>Api, Test and Variable on Progress!</strong>
        </b-message>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/carousel'
    import variables from './variables/carousel'

    import ExSimple from './examples/ExSimple'
    import ExFull from './examples/ExFull'
    import ExIndicator from './examples/ExIndicator'

    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'
    import ExFullCode from '!!raw-loader!./examples/ExFull'
    import ExIndicatorCode from '!!raw-loader!./examples/ExIndicator'

    export default {
        data() {
            return {
                api,
                variables,
                ExSimple,
                ExFull,
                ExIndicator,
                ExSimpleCode,
                ExFullCode,
                ExIndicatorCode
            }
        }
    }
</script>
