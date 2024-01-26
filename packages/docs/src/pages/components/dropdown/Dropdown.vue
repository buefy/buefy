<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode">
            <p>
                While it appear as a modal for tablet and smartphones,
                Dropdowns with <code>hoverable</code> prop won't change it's behavior to avoid any malfunction with hover.
            </p>
        </Example>

        <Example :component="ExContentPosition" :code="ExContentPositionCode" title="Content and position" paddingless>
            <p>Add the <code>custom</code> prop to the item to add <strong>any type of content</strong>.</p>
            <p>Add the <code>:focusable="false"</code> prop to the <code>dropdown-item</code> if you dont want it to be focusable.</p>
        </Example>

        <Example :component="ExHasLinkDisabled" :code="ExHasLinkDisabledCode" title="Links within" paddingless>
            <p>Add the <code>has-link</code> prop to add a anchor tag / router-link, or <code>disabled</code> to disable an item.</p>
        </Example>

        <Example :component="ExCustomize" :code="ExCustomizeCode" title="Customizing with v-model"/>

        <Example :component="ExCustomizeMultiple" :code="ExCustomizeMultipleCode" title="Multiple">
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.7.6</span>
            </div>
            <p>Add the <code>multiple</code> prop to select one or more item.</p>
        </Example>

        <Example :component="ExCustomizeScrollable" :code="ExCustomizeScrollableCode" title="Scrollable">
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.8.18</span>
            </div>
            <p>Add the <code>scrollable</code> prop to make the list scrollable.</p>
            <p>When the <code>scrollable</code> prop is set to <code>true</code>, use the <code>max-height</code> prop to define the max height of the list.</p>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/dropdown'
    import variables from './variables/dropdown'
    import { shallowFields } from '@/utils'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExContentPosition from './examples/ExContentPosition'
    import ExContentPositionCode from './examples/ExContentPosition.vue?raw'

    import ExHasLinkDisabled from './examples/ExHasLinkDisabled'
    import ExHasLinkDisabledCode from './examples/ExHasLinkDisabled.vue?raw'

    import ExCustomize from './examples/ExCustomize'
    import ExCustomizeCode from './examples/ExCustomize.vue?raw'

    import ExCustomizeMultiple from './examples/ExCustomizeMultiple'
    import ExCustomizeMultipleCode from './examples/ExCustomizeMultiple.vue?raw'

    import ExCustomizeScrollable from './examples/ExCustomizeScrollable'
    import ExCustomizeScrollableCode from './examples/ExCustomizeScrollable.vue?raw'

    export default {
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExContentPosition,
                    ExHasLinkDisabled,
                    ExCustomize,
                    ExCustomizeMultiple,
                    ExCustomizeScrollable
                }),
                ExSimpleCode,
                ExContentPositionCode,
                ExHasLinkDisabledCode,
                ExCustomizeCode,
                ExCustomizeMultipleCode,
                ExCustomizeScrollableCode
            }
        }
    }
</script>
