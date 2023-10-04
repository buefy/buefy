<template>
    <section>
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
            </b-select>
            Current locale format: {{ sampleFormat }}
        </b-field>
        <b-field label="Select a date">
            <b-datepicker
                placeholder="Type or select a date..."
                icon="calendar-today"
                :locale="locale"
                editable>
            </b-datepicker>
        </b-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            locale: undefined // Browser locale
        }
    },
    computed: {
        sampleFormat() {
            const dtf = new Intl.DateTimeFormat(this.locale)
            return dtf.format(new Date(2000, 11, 25, 12))
        }
    }
}
</script>
