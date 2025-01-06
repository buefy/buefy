<template>
    <section>
        <div class="block">
            <b-switch v-model="indeterminate"> Indeterminate </b-switch>
            <b-field label="Type and Size">
                <b-field grouped>
                    <b-select v-model="type" placeholder="Type">
                        <option :value="undefined">Default</option>
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
            <b-field label="Locale">
                <b-select v-model="locale" :disabled="!showValue">
                    <option :value="undefined"></option>
                    <option value="de-DE">de-DE</option>
                    <option value="en-CA">en-CA</option>
                    <option value="en-GB">en-GB</option>
                    <option value="en-US">en-US</option>
                    <option value="es-ES">es-ES</option>
                    <option value="es-MX">es-MX</option>
                    <option value="fr-CA">fr-CA</option>
                    <option value="fr-FR">fr-FR</option>
                    <option value="it-IT">it-IT</option>
                    <option value="ja-JP">ja-JP</option>
                    <option value="pt-BR">pt-BR</option>
                    <option value="ru-RU">ru-RU</option>
                    <option value="zn-CN">zn-CN</option>
                </b-select>
            </b-field>
        </div>

        <b-progress
            :type="type"
            :size="size"
            :max="100000"
            :value="indeterminate ? undefined : 80500"
            :show-value="showValue"
            :format="format"
            :precision="precision"
            :keep-trailing-zeroes="keepTrailingZeroes"
            :locale="locale"></b-progress>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BField, BNumberinput, BProgress, BSelect, BSwitch } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BField,
            BNumberinput,
            BProgress,
            BSelect,
            BSwitch
        },
        data() {
            return {
                indeterminate: false,
                type: undefined,
                size: 'is-medium',
                showValue: true,
                format: 'raw',
                precision: 2,
                keepTrailingZeroes: false,
                locale: undefined // Browser locale
            }
        }
    })
</script>
