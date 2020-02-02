<template>
    <section>
        <div class="block">
            <b-switch v-model="indeterminate"> Indeterminate </b-switch>
            <b-field label="Type and Size">
                <b-field grouped>
                    <b-select v-model="type" placeholder="Type">
                        <option value="null">Default</option>
                        <option value="is-primary">Primary</option>
                        <option value="is-success">Success</option>
                        <option value="is-warning">Warning</option>
                        <option value="is-danger">Danger</option>
                    </b-select>
                    <b-select v-model="size" placeholder="Size">
                        <option value="null">Default</option>
                        <option value="is-small">Small</option>
                        <option value="is-medium">Medium</option>
                        <option value="is-large">Large</option>
                    </b-select>
                </b-field>
            </b-field>
            <b-switch v-model="showValue"> Show Value </b-switch>
            <b-switch v-model="keepTrailingZeroes" :disabled="!showValue"> Keep Trailing Zeroes </b-switch>
            <b-field label="Format and Precision">
                <b-field>
                    <b-select v-model="format" :disabled="!showValue">
                        <option value="raw">Raw</option>
                        <option value="percent">Percent</option>
                    </b-select>
                    <b-numberinput v-model="precision" :disabled="!showValue" controls-position="compact" />
                </b-field>
            </b-field>
        </div>

        <b-progress
            :type="type"
            :size="size"
            :value="indeterminate ? undefined : 80"
            :show-value="showValue"
            :format="format"
            :precision="precision"
            :keep-trailing-zeroes="keepTrailingZeroes"></b-progress>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                indeterminate: false,
                type: null,
                size: 'is-medium',
                showValue: true,
                format: 'raw',
                precision: 2,
                keepTrailingZeroes: false
            }
        }
    }
</script>
