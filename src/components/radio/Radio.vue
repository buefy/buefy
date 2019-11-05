<template>
    <label
        class="b-radio radio"
        ref="label"
        :class="[size, { 'is-disabled': disabled }]"
        :disabled="disabled"
        @click="focus"
        @keydown.prevent.enter="$refs.label.click()">
        <input
            v-model="computedValue"
            type="radio"
            ref="input"
            @click.stop
            :disabled="disabled"
            :required="required"
            :name="name"
            :value="nativeValue">
        <span class="check" :class="type" />
        <span class="control-label"><slot/></span>
    </label>
</template>

<script>
import CheckRadioMixin from '../../utils/CheckRadioMixin.js'

export default {
    name: 'BRadio',
    mixins: [CheckRadioMixin]
}
</script>
