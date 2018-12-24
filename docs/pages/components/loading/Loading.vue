<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode">
            <p>The Loading will be closed after about 10 seconds, by pressing escape or by clicking outside.</p>
            <p>
                Use <code>:is-full-page="false"</code> to limit loader to its container.<br>
                In this case, the container element should be positioned as <code>position: relative</code>.
            </p>
        </Example>

        <Example :component="ExProgrammatically" :code="ExProgrammaticallyCode" title="Programmatically opening">
            <p>When you want to close the Loading, call the <code>close()</code> method from the component.</p>
        </Example>

        <Example :component="ExRouterHook" :code="ExRouterHookCode" title="Using inside router hooks">
            <p>If you want to use the loading component in a component's navigation guard.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/loading'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExProgrammatically from './examples/ExProgrammatically'
    import ExProgrammaticallyCode from '!!raw-loader!./examples/ExProgrammatically'

    import ExRouterHook from './examples/ExRouterHook'
    import ExRouterHookCode from '!!raw-loader!./examples/ExRouterHook'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExProgrammatically,
                ExSimpleCode,
                ExProgrammaticallyCode,
                ExRouterHook,
                ExRouterHookCode
            }
        }
    }
</script>
