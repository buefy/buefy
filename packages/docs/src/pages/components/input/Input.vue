<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExHorizontal" :code="ExHorizontalCode" vertical/>

        <Example :component="ExTypesStates" :code="ExTypesStatesCode" title="Types and states" vertical/>

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons" vertical/>

        <Example :component="ExValidation" :code="ExValidationCode" title="Validation" vertical>
            <p>Automatic HTML5 validation on-blur.</p>
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.7.2</span>
            </div>
            <p>You can use <code>use-html5-validation</code> prop to disable the default HTML5 validation.</p>
        </Example>

        <Example :component="ExPassword" :code="ExPasswordCode" title="Password" vertical>
            <p>You can use the <code>password-reveal</code> prop to add a button that reveals password.</p>
        </Example>

        <Example :component="ExLazy" :code="ExLazyCode" title="Lazy" vertical>
            <p>You could make the binding lazy, comparable with <code>v-model.lazy</code>, see <a href="https://vuejs.org/v2/guide/forms.html#lazy">.lazy modifier</a>.
            As <code>v-model.lazy</code> won't work with custom components like Buefy, you could use this property.</p>
        </Example>

        <Example :component="ExSizes" :code="ExSizesCode" title="Sizes" vertical/>

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

    import api from './api/input'
    import variables from './variables/input'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExHorizontal from './examples/ExHorizontal.vue'
    import ExHorizontalCode from './examples/ExHorizontal.vue?raw'

    import ExTypesStates from './examples/ExTypesStates.vue'
    import ExTypesStatesCode from './examples/ExTypesStates.vue?raw'

    import ExIcons from './examples/ExIcons.vue'
    import ExIconsCode from './examples/ExIcons.vue?raw'

    import ExValidation from './examples/ExValidation.vue'
    import ExValidationCode from './examples/ExValidation.vue?raw'

    import ExPassword from './examples/ExPassword.vue'
    import ExPasswordCode from './examples/ExPassword.vue?raw'

    import ExSizes from './examples/ExSizes.vue'
    import ExSizesCode from './examples/ExSizes.vue?raw'

    import ExLazy from './examples/ExLazy.vue'
    import ExLazyCode from './examples/ExLazy.vue?raw'

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
                    ExHorizontal,
                    ExTypesStates,
                    ExIcons,
                    ExValidation,
                    ExPassword,
                    ExSizes,
                    ExLazy
                }),
                ExSimpleCode,
                ExHorizontalCode,
                ExTypesStatesCode,
                ExIconsCode,
                ExValidationCode,
                ExPasswordCode,
                ExSizesCode,
                ExLazyCode
            }
        }
    })
</script>
