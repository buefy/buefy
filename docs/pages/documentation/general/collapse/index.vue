<template>
    <div class="container">
        <h1 class="title is-spaced">Collapse</h1>
        <h2 class="subtitle">Collapse is a easy way to toggle what you want</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-simple></ex-simple>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExSimpleCode"></code-view>
            </div>
        </div>

        <hr>

        <h2 class="title">Panel</h2>
        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-panel-template></ex-panel-template>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExPanelTemplateCode"></code-view>
            </div>
        </div>

        <hr>

        <h2 class="title">Card</h2>
        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-card-template></ex-card-template>
                </div>
            </div>
            <div class="column">
                <code-view :code="ExCardTemplateCode"></code-view>
            </div>
        </div>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExPanelTemplate from './examples/ExPanelTemplate'
    import ExPanelTemplateCode from '!!raw-loader!./examples/ExPanelTemplate'

    import ExCardTemplate from './examples/ExCardTemplate'
    import ExCardTemplateCode from '!!raw-loader!./examples/ExCardTemplate'

    export default {
        components: {
            ExSimple,
            ExPanelTemplate,
            ExCardTemplate
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExPanelTemplateCode,
                ExCardTemplateCode
            }
        }
    }
</script>
