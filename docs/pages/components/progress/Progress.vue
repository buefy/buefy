<template>
    <div>
        <div class="tags has-addons">
            <span class="tag is-success">New!</span>
            <span class="tag is-info">0.6.8</span>
        </div>

        <Example :component="ExSimple" :code="ExSimpleCode"></Example>

        <Example :component="ExComplex" :code="ExComplexCode" title="Complex Example">
            <p>Shows all the possibilities of the progressbar</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/progress'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExComplex from './examples/ExComplex'
    import ExComplexCode from '!!raw-loader!./examples/ExComplex'

    export default {
        data() {
            return {
                api,
                ExSimpleCode,
                ExComplexCode,
                ExSimple,
                ExComplex
            }
        }
    }
</script>
