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
            <b-field label="Hour format">
                <b-select v-model="hourFormat">
                    <option :value="undefined"></option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                </b-select>
            </b-field>
            <b-field label="Current locale format">
                {{ sampleFormat }}
            </b-field>
        </b-field>
        <b-field label="Select timepicker">
            <b-clockpicker
                placeholder="Type or select a date..."
                icon="clock"
                :hour-format="hourFormat"
                :locale="locale"
                editable>
            </b-clockpicker>
        </b-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            hourFormat: undefined, // Browser locale
            locale: undefined // Browser locale
        }
    },
    computed: {
        sampleFormat() {
            const dtf = new Intl.DateTimeFormat(this.locale, {
                hour: 'numeric',
                minute: 'numeric',
                hour12: this.hourFormat ? this.hourFormat === '12' : undefined
            })
            return dtf.format(new Date(2000, 12, 12, 22, 23, 24))
        }
    }
}
</script>
