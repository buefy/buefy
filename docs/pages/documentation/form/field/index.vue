<template>
    <div class="container">
        <h1 class="title is-spaced">Field</h1>
        <h2 class="subtitle">Fields are used to add functionality to controls and to attach/group components and elements together</h2>
        <hr>

        <div class="content">
            <p>These components should be used as a <strong>direct child</strong> of Field:</p>
            <ul>
                <li>Input</li>
                <li>Select</li>
                <li>Autocomplete</li>
                <li>Upload</li>
                <li>Radio Button</li>
                <li><code>.control</code> elements (html class)</li>
            </ul>
        </div>
        <hr>

        <div class="columns">
            <div class="column">
                <ex-simple></ex-simple>
            </div>
            <div class="column">
                <code-view :code="ExSimpleCode"></code-view>
            </div>
        </div>

        <hr>
        <h2 class="title is-spaced">Addons</h2>
        <h3 class="subtitle">Those components are automatically attached together when inside a Field</h3>
        <p class="content">Use the <code>expanded</code> prop <u>on the control</u> to <b>fill up the remaining space</b>.</p>
        <b-message type="is-warning">
            <b>Note:</b> Beware of its responsiveness, avoid large groups of addons since they don't break lines.
        </b-message>
        <div class="columns">
            <div class="column">
                <ex-addons></ex-addons>
            </div>
            <div class="column">
                <code-view :code="ExAddonsCode"></code-view>
            </div>
        </div>

        <hr>
        <h2 class="title is-spaced">Groups</h2>
        <div class="content">
            <p>You can group those components together with the <code>grouped</code> property.</p>
            <p>Use the <code>expanded</code> prop <u>on the control</u> to <b>fill up the remaining space</b>.</p>
        </div>
        <div class="example">
            <ex-groups></ex-groups>
        </div>
        <code-view :code="ExGroupsCode" bordered></code-view>

        <p class="content">
            Nested Fields can be grouped as well,
            you have to use the <code>expanded</code> prop <u>on the Field</u> to <b>fill up the remaining space</b>.
        </p>
        <div class="example">
            <ex-group-expanded></ex-group-expanded>
        </div>
        <code-view :code="ExGroupExpandedCode" bordered></code-view>

        <div class="tags has-addons">
            <span class="tag is-success">New!</span>
            <span class="tag is-info">0.5.0</span>
        </div>
        <p class="content">
            Add the <code>group-multiline</code> prop to allow controls to fill up <b>multiple lines</b>.
            This is ideal for a long list of controls.
        </p>
        <div class="columns">
            <div class="column">
                <ex-group-multiline></ex-group-multiline>
            </div>
            <div class="column">
                <code-view :code="ExGroupMultilineCode"></code-view>
            </div>
        </div>

        <hr>
        <h3 class="title">Positions</h3>
        <p class="content">Add the <code>position</code> prop to modify its alignment.</p>
        <div class="example">
            <ex-positions></ex-positions>
        </div>
        <code-view :code="ExPositionsCode" bordered></code-view>

        <hr>
        <h3 class="title">Combining addons and groups</h3>
        <div class="example">
            <ex-combine-addons-groups></ex-combine-addons-groups>
        </div>
        <code-view :code="ExCombineAddonsGroupsCode" bordered></code-view>

        <hr>

        <h2 class="title is-spaced">API</h2>
        <api-view :data="api"></api-view>
    </div>
</template>

<script>
    import api from './api'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExAddons from './examples/ExAddons'
    import ExAddonsCode from '!!raw-loader!./examples/ExAddons'

    import ExGroups from './examples/ExGroups'
    import ExGroupsCode from '!!raw-loader!./examples/ExGroups'

    import ExGroupExpanded from './examples/ExGroupExpanded'
    import ExGroupExpandedCode from '!!raw-loader!./examples/ExGroupExpanded'

    import ExGroupMultiline from './examples/ExGroupMultiline'
    import ExGroupMultilineCode from '!!raw-loader!./examples/ExGroupMultiline'

    import ExPositions from './examples/ExPositions'
    import ExPositionsCode from '!!raw-loader!./examples/ExPositions'

    import ExCombineAddonsGroups from './examples/ExCombineAddonsGroups'
    import ExCombineAddonsGroupsCode from '!!raw-loader!./examples/ExCombineAddonsGroups'

    export default {
        components: {
            ExSimple,
            ExAddons,
            ExGroups,
            ExGroupExpanded,
            ExGroupMultiline,
            ExPositions,
            ExCombineAddonsGroups
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExAddonsCode,
                ExGroupsCode,
                ExGroupExpandedCode,
                ExGroupMultilineCode,
                ExPositionsCode,
                ExCombineAddonsGroupsCode
            }
        }
    }
</script>
