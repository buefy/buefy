<template>
    <section>
        <b-field grouped group-multiline>
            <b-field label="Locale">
                <b-select v-model="locale">
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
        </b-field>
        Current locale format: {{ sampleFormat }}
        <b-field label="Select datetime">
            <b-datetimepicker
                placeholder="Type or select a date..."
                icon="calendar-today"
                :locale="locale"
                editable>
            </b-datetimepicker>
        </b-field>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BDatetimepicker, BField, BSelect } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BDatetimepicker,
        BField,
        BSelect
    },
    data() {
        return {
            locale: undefined, // Browser locale
            enableSeconds: false
        }
    },
    computed: {
        sampleFormat() {
            const dtf = new Intl.DateTimeFormat(this.locale, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: this.enableSeconds ? 'numeric' : undefined
            })
            return dtf.format(new Date(2020, 11, 11, 13, 14, 15))
        }
    }
})
</script>
