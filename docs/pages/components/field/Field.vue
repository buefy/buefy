<template>
    <div>
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

        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExLabelPosition" :code="ExLabelPositionCode" title="Label Position" vertical>
            <div class="tags has-addons">
                <span class="tag is-success">New!</span>
                <span class="tag is-info">0.7.8</span>
            </div>
            <p>Add the <code>label-position</code> prop to modify field style.</p>
            <b-message type="is-info">
                You can set the <code>defaultFieldLabelPosition</code> constructor option to override the default style
            </b-message>
        </Example>

        <Example :component="ExObjectSyntax" :code="ExObjectSyntaxCode" title="Object syntax" vertical>
            <div class="tags has-addons">
                <span class="tag is-success">New!</span>
                <span class="tag is-info">0.7.0</span>
            </div>
            <p>You can also use object syntax for <code>type</code> and <code>message</code> props just like Vuejs <code>class</code>.</p>
        </Example>

        <Example :component="ExAddons" :code="ExAddonsCode" title="Addons" vertical>
            <p>The above cited components are automatically attached together when inside a Field.</p>
            <p>Use the <code>expanded</code> prop <u>on the control</u> to <b>fill up the remaining space</b>.</p>
            <b-message type="is-info">
                <b>Note:</b> Beware of its responsiveness, avoid large groups of addons since they don't break lines.
            </b-message>
        </Example>

        <Example :component="ExGroups" :code="ExGroupsCode" title="Groups">
            <p>You can group those components together with the <code>grouped</code> property.</p>
            <p>Use the <code>expanded</code> prop <u>on the control</u> to <b>fill up the remaining space</b>.</p>
        </Example>

        <Example :component="ExGroupExpanded" :code="ExGroupExpandedCode" title="Nested groups">
            <p>
                Nested Fields can be grouped as well,
                you have to use the <code>expanded</code> prop <u>on the Field</u> to <b>fill up the remaining space</b>.
            </p>
        </Example>

        <Example :component="ExGroupMultiline" :code="ExGroupMultilineCode" title="Responsive groups" vertical>
            <p>
                Add the <code>group-multiline</code> prop to allow controls to fill up <b>multiple lines</b>.
                This is ideal for a long list of controls.
            </p>
        </Example>

        <Example :component="ExPositions" :code="ExPositionsCode" title="Positions">
            <p>Add the <code>position</code> prop to modify its alignment.</p>
        </Example>

        <Example :component="ExCombineAddonsGroups" :code="ExCombineAddonsGroupsCode" title="Combining addons and groups"/>

        <Example :component="ExHorizontal" :code="ExHorizontalCode" title="Horizontal">
            <p>Add the <code>horizontal</code> prop for aligning label and control in horizontal forms.</p>
            <b-message type="is-info">
                <b>Note:</b> Each child element of a <code>&lt;b-field horizontal/&gt;</code> will be
                automatically wrapped inside a <code>Field</code> component.
            </b-message>
        </Example>

        <Example :component="ExCustomClass" :code="ExCustomClassCode" title="Label classes">
            <p>Add the <code>custom-class</code> prop to adjust the styling of the label.</p>
        </Example>

        <Example :component="ExLabelSlot" :code="ExLabelSlotCode" title="Label slot">
            <div class="tags has-addons">
                <span class="tag is-success">New!</span>
                <span class="tag is-info">0.7.6</span>
            </div>
            <p>Use the <code>label</code> slot for complex labels with HTML content or components. Note it overrides the <code>label</code> prop.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/field'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExObjectSyntax from './examples/ExObjectSyntax'
    import ExObjectSyntaxCode from '!!raw-loader!./examples/ExObjectSyntax'

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

    import ExHorizontal from './examples/ExHorizontal'
    import ExHorizontalCode from '!!raw-loader!./examples/ExHorizontal'

    import ExCustomClass from './examples/ExCustomClass'
    import ExCustomClassCode from '!!raw-loader!./examples/ExCustomClass'

    import ExLabelSlot from './examples/ExLabelSlot'
    import ExLabelSlotCode from '!!raw-loader!./examples/ExLabelSlot'

    import ExLabelPosition from './examples/ExLabelPosition'
    import ExLabelPositionCode from '!!raw-loader!./examples/ExLabelPosition'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExObjectSyntax,
                ExAddons,
                ExGroups,
                ExGroupExpanded,
                ExGroupMultiline,
                ExPositions,
                ExCombineAddonsGroups,
                ExHorizontal,
                ExCustomClass,
                ExLabelSlot,
                ExLabelPosition,
                ExSimpleCode,
                ExObjectSyntaxCode,
                ExAddonsCode,
                ExGroupsCode,
                ExGroupExpandedCode,
                ExGroupMultilineCode,
                ExPositionsCode,
                ExCombineAddonsGroupsCode,
                ExHorizontalCode,
                ExCustomClassCode,
                ExLabelSlotCode,
                ExLabelPositionCode
            }
        }
    }
</script>
