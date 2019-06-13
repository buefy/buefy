<template>
    <div>
        <p class="content">
            Buefy is compatible with both <a href="https://materialdesignicons.com/" target="_blank">Material Design Icons</a>
            , <a href="http://fontawesome.io/" target="_blank">FontAwesome 4</a>
            and <a href="https://fontawesome.com/" target="_blank">FontAwesome 5</a>.
            They adapt to most elements background automatically — but you can also override their colors.
        </p>

        <Example :component="ExMdi" :code="ExMdiCode" title="Material Design Icons" vertical/>

        <b-message type="is-info">
            Using <code>far</code> or <code>fad</code> while having FontAwesome free tier might have missing icons.
        </b-message>
        
        <Example :component="ExFa" :code="ExFaCode" title="FontAwesome" vertical/>

        <b-message type="is-info">
            You can set the <code>defaultIconComponent</code> constructor option to render icons with the
            <a href="https://www.npmjs.com/package/@fortawesome/vue-fontawesome" target="_blank">vue-fontawesome</a> component.
        </b-message>

        <div class="example is-paddingless">
            <CodeView :code="usage | pre" lang="javascript" expanded/>
        </div>

        <Example :component="ExObjectSyntax" :code="ExObjectSyntaxCode" title="Object syntax" vertical>
            <div class="tags has-addons">
                <span class="tag is-success">New!</span>
                <span class="tag is-info">0.7.0</span>
            </div>
            <p>You can also use object syntax for <code>type</code> props just like Vuejs <code>class</code>.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/icon'

    import ExMdi from './examples/ExMdi'
    import ExMdiCode from '!!raw-loader!./examples/ExMdi'

    import ExFa from './examples/ExFa'
    import ExFaCode from '!!raw-loader!./examples/ExFa'

    import ExObjectSyntax from './examples/ExObjectSyntax'
    import ExObjectSyntaxCode from '!!raw-loader!./examples/ExObjectSyntax'

    export default {
        data() {
            return {
                api,
                ExMdi,
                ExFa,
                ExObjectSyntax,
                ExMdiCode,
                ExFaCode,
                ExObjectSyntaxCode,
                usage: `
                import { library } from '@fortawesome/fontawesome-svg-core';
                // internal icons
                import { faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
                    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
                    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload } from "@fortawesome/free-solid-svg-icons";
                import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

                library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
                    faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
                    faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload);
                Vue.component('vue-fontawesome', FontAwesomeIcon);

                // ...

                import Buefy from 'buefy'
                Vue.use(Buefy, {
                  defaultIconComponent: 'vue-fontawesome',
                  defaultIconPack: 'fas',
                });`
            }
        }
    }
</script>
