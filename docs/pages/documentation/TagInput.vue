<template>
    <div class="container">
        <h1 class="title is-spaced">Tag input</h1>
        <h2 class="subtitle">A simple tag input field. Tags are added when enter or comma are pressed, or when the field loses focus.</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <ExSimple/>
            </div>
            <div class="column">
                <CodeView :code="ExSimpleCode"/>
            </div>
        </div>

        <hr>
        <h2 class="title">Autocomplete</h2>
        <!-- <p class="content">You can limit the length and number of tags with the <code>maxlength</code> and <code>maxtags</code> props.</p> -->

        <div class="columns">
            <div class="column">
                <ExAutocomplete/>
            </div>
            <div class="column">
                <CodeView :code="ExAutocompleteCode"/>
            </div>
        </div>

        <hr>
        <h2 class="title">Limits</h2>
        <p class="content">You can limit the length and number of tags with the <code>maxlength</code> and <code>maxtags</code> props.</p>

        <div class="columns">
            <div class="column">
                <ExLimit/>
            </div>
            <div class="column">
                <CodeView :code="ExLimitCode"/>
            </div>
        </div>

        <hr>
        <h2 class="title">States</h2>
        <p class="content">You can change the input type setting a <code>type</code> on <b>Field</b>.</p>

        <div class="columns">
            <div class="column">
                <ExState/>
            </div>
            <div class="column">
                <CodeView :code="ExStateCode"/>
            </div>
        </div>

        <hr>
        <h2 class="title">Types</h2>

        <div class="columns">
            <div class="column">
                <ExType/>
            </div>
            <div class="column">
                <CodeView :code="ExTypeCode"/>
            </div>
        </div>

        <hr>
        <h2 class="title">Sizes</h2>

        <div class="columns">
            <div class="column">
                <ExSize/>
            </div>
            <div class="column">
                <CodeView :code="ExSizeCode"/>
            </div>
        </div>

        <hr>
        <h2 class="title">Modifiers</h2>
        <p class="content">You can change the style of the tags by setting the <code>rounded</code> and <code>attached</code> props.</p>

        <div class="columns">
            <div class="column">
                <ExModifier/>
            </div>
            <div class="column">
                <CodeView :code="ExModifierCode"/>
            </div>
        </div>

        <hr>
        <h2 class="title">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from '@/apis/apiTagInput'

    import ExSimple from '@/examples/tag-input/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/tag-input/ExSimple'

    import ExAutocomplete from '@/examples/tag-input/ExAutocomplete'
    import ExAutocompleteCode from '!!raw-loader!@/examples/tag-input/ExAutocomplete'

    import ExLimit from '@/examples/tag-input/ExLimit'
    import ExLimitCode from '!!raw-loader!@/examples/tag-input/ExLimit'

    import ExState from '@/examples/tag-input/ExState'
    import ExStateCode from '!!raw-loader!@/examples/tag-input/ExState'

    import ExType from '@/examples/tag-input/ExType'
    import ExTypeCode from '!!raw-loader!@/examples/tag-input/ExType'

    import ExSize from '@/examples/tag-input/ExSize'
    import ExSizeCode from '!!raw-loader!@/examples/tag-input/ExSize'

    import ExModifier from '@/examples/tag-input/ExModifier'
    import ExModifierCode from '!!raw-loader!@/examples/tag-input/ExModifier'

    export default {
        components: {
            ExSimple,
            ExAutocomplete,
            ExLimit,
            ExState,
            ExType,
            ExSize,
            ExModifier
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExAutocompleteCode,
                ExLimitCode,
                ExStateCode,
                ExTypeCode,
                ExSizeCode,
                ExModifierCode
            }
        }
    }
</script>
