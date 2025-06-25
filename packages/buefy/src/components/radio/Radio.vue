<template>
    <label
        class="b-radio radio"
        ref="label"
        :class="[size, { 'is-disabled': disabled }]"
        :disabled="disabledOrUndefined"
        @click="focus"
        @keydown.prevent.enter="($refs.label as HTMLElement).click()"
    >
        <input
            v-model="computedValue"
            type="radio"
            ref="input"
            @click.stop
            :disabled="disabledOrUndefined"
            :required="requiredOrUndefined"
            :name="name"
            :value="nativeValue"
        >
        <span class="check" :class="type" />
        <span class="control-label"><slot /></span>
    </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CheckRadioMixin from '../../utils/CheckRadioMixin'

const Radio = defineComponent({
    name: 'BRadio',
    mixins: [CheckRadioMixin]
})

export default Radio
</script>
