<template>
    <div class="is-clipped">
        <h1 class="title is-spaced">Taginput</h1>
        <h2 class="subtitle">A simple tag input field that can have autocomplete functionality</h2>
        <hr>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <hr>
        <h2 class="title">Autocomplete</h2>
        <p class="content">
            To have autocomplete functionality, add the <code>autocomplete</code> prop.
            You can add any prop from <router-link to="/documentation/autocomplete">Autocomplete</router-link> API.
        </p>
        <Example :component="ExAutocomplete" :code="ExAutocompleteCode" vertical/>

        <hr>
        <h2 class="title">Limits</h2>
        <p class="content">
            You can limit the length and number of tags with the <code>maxlength</code> and <code>maxtags</code> props.
            Maxlength counter is only shown when typing.
        </p>
        <Example :component="ExLimit" :code="ExLimitCode" vertical/>

        <hr>
        <h2 class="title">States</h2>
        <p class="content">You can change the input type setting a <code>type</code> on <b>Field</b>.</p>
        <Example :component="ExState" :code="ExStateCode" vertical/>

        <hr>
        <h2 class="title">Tag types</h2>
        <Example :component="ExType" :code="ExTypeCode" vertical/>

        <hr>
        <h2 class="title">Sizes</h2>
        <Example :component="ExSize" :code="ExSizeCode" vertical/>

        <hr>
        <h2 class="title">Modifiers</h2>
        <p class="content">You can change the style of the tags by setting the <code>rounded</code> and <code>attached</code> props.</p>
        <Example :component="ExModifier" :code="ExModifierCode" vertical/>

        <hr>
        <h2 class="title">API</h2>
        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/taginput'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExAutocomplete from './examples/ExAutocomplete'
    import ExAutocompleteCode from '!!raw-loader!./examples/ExAutocomplete'

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
                ExLimit,
                ExState,
                ExType,
                ExSize,
                ExModifier,
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
