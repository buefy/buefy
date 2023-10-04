<template>
    <section>
        <b-field grouped group-multiline>
            <b-field>
                <div class="control">
                    <b-switch v-model="showWeekNumber">Show week number</b-switch>
                </div>
            </b-field>
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
            </b-field>
        </b-field>
        <b-field label="Select a date">
            <b-datepicker
                v-model="selected"
                :show-week-number="showWeekNumber"
                :locale="locale"
                placeholder="Click to select..."
                icon="calendar-today"
                :icon-right="selected ? 'close-circle' : ''"
                icon-right-clickable
                @icon-right-click="clearDate"
                trap-focus>
            </b-datepicker>
        </b-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            selected: new Date(),
            showWeekNumber: false,
            locale: undefined // Browser locale
        }
    },
    methods: {
        clearDate () {
            this.selected = null
        }
    }
}
</script>

