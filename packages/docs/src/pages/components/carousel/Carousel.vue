<template>
    <div>
        <div class="content">
            <blockquote>
                Because images can take a few seconds to load (or not at all), use the <code>image</code> container to specify a <strong>precisely sized</strong>
                container so that your layout isn't broken because of image loading or image errors - Bulma <a href="https://bulma.io/documentation/elements/image/" target="_blank">image</a>.
            </blockquote>
        </div>

        <Example :component="ExSimple" :code="ExSimpleCode" paddingless vertical />

        <Example title="Custom" :component="ExFull" :code="ExFullCode" paddingless>
          This example uses <code>order</code> to maintain the consitent order while the number of items may change.
        </Example>

        <Example title="Arrow" :component="ExArrow" :code="ExArrowCode" paddingless />

        <Example title="Progress" :component="ExProgress" :code="ExProgressCode" paddingless />

        <Example title="Indicator" :component="ExIndicator" :code="ExIndicatorCode" paddingless />

        <p class="has-text-centered">Some source by <a href="https://picsum.photos/" target="_blank">Picsum</a> and Images from <a href="https://unsplash.com/" target="_blank">Unsplash</a>.</p><br>

        <Example title="Custom Indicators" :component="ExCustomIndicator" :code="ExCustomIndicatorCode" paddingless>
            When there are more than 6 images, add <code>indicator-custom</code><br>
            If you want custom indicator to stay big, use <code>is-medium</code> on <code>indicator-custom-size</code>
        </Example>

        <Example title="Switch like a gallery" :component="ExGallery" :code="ExGalleryCode" paddingless>
            <p>You may also want to add the <code>is-clipped</code> modifier to a containing element (usually <code>html</code>) to stop scroll overflow.</p>
        </Example>

        <Example title="Carousel List" :component="ExCarouselList" :code="ExCarouselListCode" paddingless>
            <p>An imposing <strong>carousel list</strong> to showcase viewer something.</p>
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.8.9</span>
            </div>
        </Example>

        <Example title="Custom With Card" :component="ExWithCard" :code="ExWithCardCode" paddingless />

        <Example title="Custom As indicators" :component="ExWithList" :code="ExWithListCode" paddingless>
            <p>With <strong>Breakpoint</strong> and <strong>Switch like a Gallery</strong>.</p>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import { shallowFields } from '@/utils'
    import ApiView from '@/components/ApiView.vue'
    import Example from '@/components/Example.vue'
    import VariablesView from '@/components/VariablesView.vue'

    import api from './api/carousel'
    import variables from './variables/carousel'

    import ExSimple from './examples/ExSimple.vue'
    import ExFull from './examples/ExFull.vue'
    import ExArrow from './examples/ExArrow.vue'
    import ExProgress from './examples/ExProgress.vue'
    import ExIndicator from './examples/ExIndicator.vue'
    import ExCustomIndicator from './examples/ExCustomIndicator.vue'
    import ExGallery from './examples/ExGallery.vue'
    import ExCarouselList from './examples/ExCarouselList.vue'
    import ExWithCard from './examples/ExWithCard.vue'
    import ExWithList from './examples/ExWithList.vue'

    import ExSimpleCode from './examples/ExSimple.vue?raw'
    import ExFullCode from './examples/ExFull.vue?raw'
    import ExArrowCode from './examples/ExArrow.vue?raw'
    import ExProgressCode from './examples/ExProgress.vue?raw'
    import ExIndicatorCode from './examples/ExIndicator.vue?raw'
    import ExCustomIndicatorCode from './examples/ExCustomIndicator.vue?raw'
    import ExGalleryCode from './examples/ExGallery.vue?raw'
    import ExCarouselListCode from './examples/ExCarouselList.vue?raw'
    import ExWithCardCode from './examples/ExWithCard.vue?raw'
    import ExWithListCode from './examples/ExWithList.vue?raw'


    export default defineComponent({
        components: {
            ApiView,
            Example,
            VariablesView
        },
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExFull,
                    ExArrow,
                    ExIndicator,
                    ExProgress,
                    ExCustomIndicator,
                    ExGallery,
                    ExCarouselList,
                    ExWithCard,
                    ExWithList
                }),
                ExSimpleCode,
                ExFullCode,
                ExArrowCode,
                ExProgressCode,
                ExIndicatorCode,
                ExCustomIndicatorCode,
                ExGalleryCode,
                ExCarouselListCode,
                ExWithCardCode,
                ExWithListCode
            }
        }
    })
</script>
