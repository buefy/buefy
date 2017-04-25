<template>
    <p
        class="control"
        :class="{ 'is-expanded': expanded }">
        <slot></slot>
        <span
            class="select"
            :class="[size, statusType, {
                'is-fullwidth': expanded,
                'is-loading': loading,
                'is-empty': selected === ''
            }]">

            <select
                v-model="selected"
                ref="select"
                :disabled="disabled"
                :readonly="readonly"
                :name="name"
                :required="required"
                @focus="$emit('focus', $event)"
                @blur="blur">

                <option
                    v-if="placeholder"
                    value=""
                    selected
                    disabled
                    hidden>
                    {{ placeholder }}
                </option>
                <template v-for="(option, i) in options">
                    <optgroup
                        v-if="isSubheader(option, options[i - 1], i)"
                        :label="option.group">
                    </optgroup>
                    <option
                        :value="option.value"
                        :disabled="option.disabled">
                        {{ option.label }}
                    </option>
                </template>
            </select>
        </span>
    </p>
</template>

<script>
    import SelectMixin from '../../utils/SelectMixin.js'

    export default {
        name: 'bSelect',
        mixins: [SelectMixin]
    }
</script>
