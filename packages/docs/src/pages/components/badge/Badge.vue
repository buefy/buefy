<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExDot" :code="ExDotCode" title="Dot indicator" vertical>
            <p>Use the <code>dot</code> prop for a plain indicator with no content.</p>
        </Example>

        <Example :component="ExColors" :code="ExColorsCode" title="Colors" vertical/>

        <Example :component="ExPositions" :code="ExPositionsCode" title="Positions" vertical>
            <p>Use the <code>position</code> prop to overlay the badge on any of the four corners.</p>
        </Example>

        <Example :component="ExMax" :code="ExMaxCode" title="Overflow" vertical>
            <p>Use the <code>max</code> prop to cap large numeric values, e.g. <code>150</code> becomes <code>99+</code>.</p>
        </Example>

        <Example :component="ExVisible" :code="ExVisibleCode" title="Hiding the badge" vertical>
            <p>Use the <code>visible</code> prop to conditionally show or hide the badge.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import { shallowFields } from '@/utils'
    import ApiView from '@/components/ApiView.vue'
    import Example from '@/components/Example.vue'

    import api from './api/badge'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExDot from './examples/ExDot.vue'
    import ExDotCode from './examples/ExDot.vue?raw'

    import ExColors from './examples/ExColors.vue'
    import ExColorsCode from './examples/ExColors.vue?raw'

    import ExPositions from './examples/ExPositions.vue'
    import ExPositionsCode from './examples/ExPositions.vue?raw'

    import ExMax from './examples/ExMax.vue'
    import ExMaxCode from './examples/ExMax.vue?raw'

    import ExVisible from './examples/ExVisible.vue'
    import ExVisibleCode from './examples/ExVisible.vue?raw'

    export default defineComponent({
        components: {
            ApiView,
            Example
        },
        data() {
            return {
                api,
                ...shallowFields({
                    ExSimple,
                    ExDot,
                    ExColors,
                    ExPositions,
                    ExMax,
                    ExVisible
                }),
                ExSimpleCode,
                ExDotCode,
                ExColorsCode,
                ExPositionsCode,
                ExMaxCode,
                ExVisibleCode
            }
        }
    })
</script>
