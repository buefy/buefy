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
            <CodeView lang="javascript" :code="outsideVueInstance | pre" expanded/>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/notification'
    import variables from './variables/notification'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExTypes from './examples/ExTypes'
    import ExTypesCode from '!!raw-loader!./examples/ExTypes'

    import ExIcons from './examples/ExIcons'
    import ExIconsCode from '!!raw-loader!./examples/ExIcons'

    import ExAutoClose from './examples/ExAutoClose'
    import ExAutoCloseCode from '!!raw-loader!./examples/ExAutoClose'

    import ExAutoCloseWithProgressBar from './examples/ExAutoCloseWithProgressBar'
    import ExAutoCloseWithProgressBarCode from '!!raw-loader!./examples/ExAutoCloseWithProgressBar'

    import ExProgrammatically from './examples/ExProgrammatically'
    import ExProgrammaticallyCode from '!!raw-loader!./examples/ExProgrammatically'

    export default {
        data() {
            return {
                api,
                variables,
                ExSimple,
                ExTypes,
                ExIcons,
                ExAutoClose,
                ExAutoCloseWithProgressBar,
                ExProgrammatically,
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
        }
    }
</script>
