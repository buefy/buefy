<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExComponent" :code="ExComponentCode" title="Component">
            <p>
                A modal with a component. When you want to close the Modal, call the 'close' method —
                <code>this.$parent.close()</code> — from the injected component.
            </p>
            <p>
                <code>trap-focus</code> prop could be useful in this case.
            </p>
        </Example>

        <Example :component="ExFullScreen" :code="ExFullScreenCode" title="Full Screen">
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.7.8</span>
            </div>
            <p>Add the <code>full-screen</code> prop to cover the whole page.</p>
        </Example>

        <Example :component="ExCompositionApi" :code="ExCompositionApiCode" title="Composition API">
            When using the Composition API, you can access the current Model instance
            with <code>useModal()</code>:
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables" link="https://bulma.io/documentation/components/modal/#sass-and-css-variables"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import { shallowFields } from '@/utils'
    import ApiView from '@/components/ApiView.vue'
    import CodeView from '@/components/CodeView.vue'
    import Example from '@/components/Example.vue'
    import VariablesView from '@/components/VariablesView.vue'

    import api from './api/modal'
    import variables from './variables/modal'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExComponent from './examples/ExComponent.vue'
    import ExComponentCode from './examples/ExComponent.vue?raw'

    import ExFullScreen from './examples/ExFullScreen.vue'
    import ExFullScreenCode from './examples/ExFullScreen.vue?raw'

    import ExCompositionApi from './examples/ExCompositionApi.vue'
    import ExCompositionApiCode from './examples/ExCompositionApi.vue?raw'

    export default defineComponent({
        components: {
            ApiView,
            CodeView,
            Example,
            VariablesView
        },
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExComponent,
                    ExFullScreen,
                    ExCompositionApi,
                }),
                ExSimpleCode,
                ExComponentCode,
                ExFullScreenCode,
                ExCompositionApiCode,
            }
        },
    })
</script>
