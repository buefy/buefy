<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExAutocomplete" :code="ExAutocompleteCode" title="Autocomplete" vertical>
            <p>
                To have autocomplete functionality, add the <code>autocomplete</code> prop.
                You can add any prop from <router-link to="/documentation/autocomplete">Autocomplete</router-link> API.
            </p>
        </Example>

        <Example :component="ExTemplatedAutocomplete" :code="ExTemplatedAutocompleteCode" title="Templated Autocomplete" vertical>
            <p>
                Slots are available for autocomplete items and the empty message, like with the <router-link to="/documentation/autocomplete">Autocomplete</router-link> control.
            </p>
        </Example>

        <Example :component="ExSelected" :code="ExSelectedCode" title="Custom selected" vertical>
            <p>
                You can have a custom template by adding <code>selected</code> scoped slot to it.
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

        <Example :component="ExValidation" :code="ExValidationCode" title="Validation" vertical>
            <p>You can validate the value before adding it to the tag list</p>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import { shallowFields } from '@/utils'
    import ApiView from '@/components/ApiView.vue'
    import Example from '@/components/Example.vue'
    import VariablesView from '@/components/VariablesView.vue'

    import api from './api/taginput'
    import variables from './variables/taginput'

    import ExSimple from './examples/ExSimple.vue'
    import ExSimpleCode from './examples/ExSimple.vue?raw'

    import ExAutocomplete from './examples/ExAutocomplete.vue'
    import ExAutocompleteCode from './examples/ExAutocomplete.vue?raw'

    import ExTemplatedAutocomplete from './examples/ExTemplatedAutocomplete.vue'
    import ExTemplatedAutocompleteCode from './examples/ExTemplatedAutocomplete.vue?raw'

    import ExSelected from './examples/ExSelected.vue'
    import ExSelectedCode from './examples/ExSelected.vue?raw'

    import ExLimit from './examples/ExLimit.vue'
    import ExLimitCode from './examples/ExLimit.vue?raw'

    import ExState from './examples/ExState.vue'
    import ExStateCode from './examples/ExState.vue?raw'

    import ExType from './examples/ExType.vue'
    import ExTypeCode from './examples/ExType.vue?raw'

    import ExSize from './examples/ExSize.vue'
    import ExSizeCode from './examples/ExSize.vue?raw'

    import ExModifier from './examples/ExModifier.vue'
    import ExModifierCode from './examples/ExModifier.vue?raw'

    import ExValidation from './examples/ExValidation.vue'
    import ExValidationCode from './examples/ExValidation.vue?raw'

    export default defineComponent({
        components: {
            ApiView,
            Example,
            VariablesView
        },
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExAutocomplete,
                    ExTemplatedAutocomplete,
                    ExSelected,
                    ExLimit,
                    ExState,
                    ExType,
                    ExSize,
                    ExModifier,
                    ExValidation
                }),
                ExSimpleCode,
                ExAutocompleteCode,
                ExTemplatedAutocompleteCode,
                ExSelectedCode,
                ExLimitCode,
                ExStateCode,
                ExTypeCode,
                ExSizeCode,
                ExModifierCode,
                ExValidationCode
            }
        }
    })
</script>
