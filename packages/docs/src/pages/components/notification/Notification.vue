<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExTypes" :code="ExTypesCode" title="Types" vertical>
            <p>Many colors with light variant.</p>
        </Example>

        <Example :component="ExIcons" :code="ExIconsCode" title="Icons" vertical/>

        <Example :component="ExAutoClose" :code="ExAutoCloseCode" title="Auto Close" vertical>
            <p>Notification will be automatically closed after <code>duration</code>.</p>
        </Example>

        <Example :component="ExAutoCloseWithProgressBar" :code="ExAutoCloseWithProgressBarCode" title="Auto Close With Progress Bar" vertical>
            <p>Notification will be automatically closed after <code>duration</code> with a progress bar which indicates the delay passed.</p>
        </Example>

        <Example :component="ExProgrammatically" :code="ExProgrammaticallyCode" title="Programmatically opening">
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.7.4</span>
            </div>
        </Example>

         <Example title="From outside Vue instance">
            <p>You can use it on Vuex or VueRouter using this syntax:</p>
            <CodeView lang="javascript" :code="preformat(outsideVueInstance)" expanded/>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import { preformat as _preformat } from '@/utils'

    import api from './api/notification'
    import variables from './variables/notification'
    import { shallowFields } from '@/utils'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from './examples/ExTypes.vue?raw'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from './examples/ExIcons.vue?raw'

    import ExAutoClose from './examples/ExAutoClose'
    import ExAutoCloseCode from './examples/ExAutoClose.vue?raw'

    import ExAutoCloseWithProgressBar from './examples/ExAutoCloseWithProgressBar'
    import ExAutoCloseWithProgressBarCode from './examples/ExAutoCloseWithProgressBar.vue?raw'

    import ExProgrammatically from './examples/ExProgrammatically'
    import ExProgrammaticallyCode from './examples/ExProgrammatically.vue?raw'

    export default {
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExTypes,
                    ExIcons,
                    ExAutoClose,
                    ExAutoCloseWithProgressBar,
                    ExProgrammatically
                }),
                ExSimpleCode,
                ExTypesCode,
                ExIconsCode,
                ExAutoCloseCode,
                ExAutoCloseWithProgressBarCode,
                ExProgrammaticallyCode,
                outsideVueInstance: `
                    import { NotificationProgrammatic as Notification } from 'buefy'
                    Notification.open('Notify!')
                `
            }
        },
        methods: {
            preformat(text) {
                return _preformat(text)
            }
        }
    }
</script>
