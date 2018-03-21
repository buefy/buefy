<template>
    <div class="default-container">
        <h1 class="title is-spaced">Taginput</h1>
        <h2 class="subtitle">A simple tag input field that can have autocomplete functionality</h2>
        <hr>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExAutocomplete" :code="ExAutocompleteCode" title="Autocomplete" vertical>
            <p>
                To have autocomplete functionality, add the <code>autocomplete</code> prop.
                You can add any prop from <router-link to="/documentation/autocomplete">Autocomplete</router-link> API.
            </p>
        </Example>

        <Example :component="ExTemplatedAutocomplete" :code="ExTemplatedAutocompleteCode" title="Templated Autocomplete" vertical>
            <div class="tags has-addons">
                <span class="tag is-success">New!</span>
                <span class="tag is-info">0.6.4</span>
            </div>
            <p>
                Slots are available for autocomplete items and the empty message, like with the <router-link to="/documentation/autocomplete">Autocomplete</router-link> control.
            </p>
        </Example>

        <Example :component="ExLimit" :code="ExLimitCode" title="Limits" vertical>
            <p>
                You can limit the length and number of tags with the <code>maxlength</code> and <code>maxtags</code> props.
                Maxlength counter is only shown when typing.
            </p>
        </Example>

        <Example :component="ExState" :code="ExStateCode" title="States" vertical>
            <p>You can change the input type setting a <code>type</code> on <b>Field</b>.</p>
        </Example>

        <Example :component="ExType" :code="ExTypeCode" title="Tag types" vertical/>

        <Example :component="ExSize" :code="ExSizeCode" title="Sizes" vertical/>

        <Example :component="ExModifier" :code="ExModifierCode" title="Modifiers" vertical>
            <p>You can change the style of the tags by setting the <code>rounded</code> and <code>attached</code> props.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/taginput'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExAutocomplete from './examples/ExAutocomplete'
    import ExAutocompleteCode from '!!raw-loader!./examples/ExAutocomplete'

    import ExTemplatedAutocomplete from './examples/ExTemplatedAutocomplete'
    import ExTemplatedAutocompleteCode from '!!raw-loader!./examples/ExTemplatedAutocomplete'

    import ExLimit from './examples/ExLimit'
    import ExLimitCode from '!!raw-loader!./examples/ExLimit'

    import ExState from './examples/ExState'
    import ExStateCode from '!!raw-loader!./examples/ExState'

    import ExType from './examples/ExType'
    import ExTypeCode from '!!raw-loader!./examples/ExType'

    import ExSize from './examples/ExSize'
    import ExSizeCode from '!!raw-loader!./examples/ExSize'

    import ExModifier from './examples/ExModifier'
    import ExModifierCode from '!!raw-loader!./examples/ExModifier'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExAutocomplete,
                ExTemplatedAutocomplete,
                ExLimit,
                ExState,
                ExType,
                ExSize,
                ExModifier,
                ExSimpleCode,
                ExAutocompleteCode,
                ExTemplatedAutocompleteCode,
                ExLimitCode,
                ExStateCode,
                ExTypeCode,
                ExSizeCode,
                ExModifierCode
            }
        }
    }
</script>
