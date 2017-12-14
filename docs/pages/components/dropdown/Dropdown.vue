<template>
    <div class="default-container">
        <h1 class="title is-spaced">Dropdown</h1>
        <h2 class="subtitle">
            Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content
        </h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode">
            <p>
                While it appear as a modal for tablet and smartphones,
                Dropdowns with <code>hoverable</code> prop won't change it's behavior to avoid any malfunction with hover.
            </p>
        </Example>

        <Example :component="ExContentPosition" :code="ExContentPositionCode" title="Content and position" paddingless>
            <p>Add the <code>custom</code> prop to the item to add <strong>any type of content</strong>.</p>
        </Example>

        <Example :component="ExHasLinkDisabled" :code="ExHasLinkDisabledCode" title="Links within" paddingless>
            <p>Add the <code>has-link</code> prop to add a anchor tag / router-link, or <code>disabled</code> to disable an item.</p>
        </Example>

        <Example :component="ExCustomize" :code="ExCustomizeCode" title="Customizing with v-model"/>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/dropdown'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExContentPosition from './examples/ExContentPosition'
    import ExContentPositionCode from '!!raw-loader!./examples/ExContentPosition'

    import ExHasLinkDisabled from './examples/ExHasLinkDisabled'
    import ExHasLinkDisabledCode from '!!raw-loader!./examples/ExHasLinkDisabled'

    import ExCustomize from './examples/ExCustomize'
    import ExCustomizeCode from '!!raw-loader!./examples/ExCustomize'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode,
                ExContentPosition,
                ExContentPositionCode,
                ExHasLinkDisabled,
                ExHasLinkDisabledCode,
                ExCustomize,
                ExCustomizeCode
            }
        }
    }
</script>
