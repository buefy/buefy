<template>
    <div class="container">
        <h1 class="title is-spaced">Dropdown</h1>
        <h2 class="subtitle">
            Dropdowns are very versatile, can used as a quick menu or even like a select for discoverable content
        </h2>
        <hr>

        <p class="content">
            While it appear as a modal for tablet and smartphones,
            Dropdowns with <code>hoverable</code> prop won't change it's behavior to avoid any malfunction with hover.
        </p>
        <div class="example">
            <ex-simple></ex-simple>
        </div>
        <code-view :code="ExSimpleCode" bordered></code-view>

        <hr>

        <h2 class="title is-spaced">Dropdown content and position</h2>
        <p class="content">Add the <code>custom</code> prop to the item to add <strong>any type of content</strong>.</p>
        <div class="example is-paddingless">
            <ex-content-position></ex-content-position>
        </div>
        <code-view :code="ExContentPositionCode" bordered></code-view>

        <p class="content">Add the <code>has-link</code> prop to add a anchor tag / router-link, or <code>disabled</code> to disable an item.</p>
        <div class="example is-paddingless">
            <ex-has-link-disabled></ex-has-link-disabled>
        </div>
        <code-view :code="ExHasLinkDisabledCode" bordered></code-view>

        <hr>

        <h2 class="title">Customizing with v-model</h2>
        <div class="example">
            <ex-customize></ex-customize>
        </div>
        <code-view :code="ExCustomizeCode" bordered></code-view>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExContentPosition from './examples/ExContentPosition'
    import ExContentPositionCode from '!!raw-loader!./examples/ExContentPosition'

    import ExHasLinkDisabled from './examples/ExHasLinkDisabled'
    import ExHasLinkDisabledCode from '!!raw-loader!./examples/ExHasLinkDisabled'

    import ExCustomize from './examples/ExCustomize'
    import ExCustomizeCode from '!!raw-loader!./examples/ExCustomize'

    export default {
        components: {
            ExSimple,
            ExContentPosition,
            ExHasLinkDisabled,
            ExCustomize
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExContentPositionCode,
                ExHasLinkDisabledCode,
                ExCustomizeCode
            }
        }
    }
</script>
