<template>
    <div>
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
                <CodeView :code="ExSimpleCode" />
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
                <CodeView :code="ExPanelTemplateCode" />
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
                <CodeView :code="ExCardTemplateCode" />
            </div>
        </div>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiCollapse'

    import ExSimple from '@/examples/collapse/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/collapse/ExSimple'

    import ExPanelTemplate from '@/examples/collapse/ExPanelTemplate'
    import ExPanelTemplateCode from '!!raw-loader!@/examples/collapse/ExPanelTemplate'

    import ExCardTemplate from '@/examples/collapse/ExCardTemplate'
    import ExCardTemplateCode from '!!raw-loader!@/examples/collapse/ExCardTemplate'

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
