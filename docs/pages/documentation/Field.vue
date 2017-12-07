<template>
    <div class="container">
        <h1 class="title is-spaced">Field</h1>
        <h2 class="subtitle">Fields are used to add functionality to controls and to attach/group components and elements together</h2>
        <hr>

        <div class="content">
            <p>These components should be used as a <strong>direct child</strong> of Field:</p>
            <ul>
                <li>Autocomplete</li>
                <li>Checkbox Button</li>
                <li>Datepicker</li>
                <li>Input</li>
                <li>Radio Button</li>
                <li>Select</li>
                <li>Taginput</li>
                <li>Timepicker</li>
                <li>Upload</li>
                <li><code>.control</code> elements (html class)</li>
            </ul>
        </div>
        <hr>

        <div class="columns">
            <div class="column">
                <ex-simple></ex-simple>
            </div>
            <div class="column">
                <CodeView :code="ExSimpleCode" />
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
                <CodeView :code="ExAddonsCode" />
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
        <CodeView :code="ExGroupsCode" bordered />

        <p class="content">
            Nested Fields can be grouped as well,
            you have to use the <code>expanded</code> prop <u>on the Field</u> to <b>fill up the remaining space</b>.
        </p>
        <div class="example">
            <ex-group-expanded></ex-group-expanded>
        </div>
        <CodeView :code="ExGroupExpandedCode" bordered />

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
                <CodeView :code="ExGroupMultilineCode" />
            </div>
        </div>

        <hr>
        <h3 class="title">Positions</h3>
        <p class="content">Add the <code>position</code> prop to modify its alignment.</p>
        <div class="example">
            <ex-positions></ex-positions>
        </div>
        <CodeView :code="ExPositionsCode" bordered />

        <hr>
        <h3 class="title">Combining addons and groups</h3>
        <div class="example">
            <ex-combine-addons-groups></ex-combine-addons-groups>
        </div>
        <CodeView :code="ExCombineAddonsGroupsCode" bordered />

        <hr>
        <h3 class="title">Horizontal</h3>
        <p class="content">Add the <code>horizontal</code> prop for aligning label and control in horizontal forms.</p>
        <div class="example">
            <ex-horizontal></ex-horizontal>
        </div>
        <CodeView :code="ExHorizontalCode" bordered />
        <hr>

        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiField'

    import ExSimple from '@/examples/field/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/field/ExSimple'

    import ExAddons from '@/examples/field/ExAddons'
    import ExAddonsCode from '!!raw-loader!@/examples/field/ExAddons'

    import ExGroups from '@/examples/field/ExGroups'
    import ExGroupsCode from '!!raw-loader!@/examples/field/ExGroups'

    import ExGroupExpanded from '@/examples/field/ExGroupExpanded'
    import ExGroupExpandedCode from '!!raw-loader!@/examples/field/ExGroupExpanded'

    import ExGroupMultiline from '@/examples/field/ExGroupMultiline'
    import ExGroupMultilineCode from '!!raw-loader!@/examples/field/ExGroupMultiline'

    import ExPositions from '@/examples/field/ExPositions'
    import ExPositionsCode from '!!raw-loader!@/examples/field/ExPositions'

    import ExCombineAddonsGroups from '@/examples/field/ExCombineAddonsGroups'
    import ExCombineAddonsGroupsCode from '!!raw-loader!@/examples/field/ExCombineAddonsGroups'

    import ExHorizontal from '@/examples/field/ExHorizontal'
    import ExHorizontalCode from '!!raw-loader!@/examples/field/ExHorizontal'

    export default {
        components: {
            ExSimple,
            ExAddons,
            ExGroups,
            ExGroupExpanded,
            ExGroupMultiline,
            ExPositions,
            ExCombineAddonsGroups,
            ExHorizontal
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
                ExCombineAddonsGroupsCode,
                ExHorizontalCode
            }
        }
    }
</script>
