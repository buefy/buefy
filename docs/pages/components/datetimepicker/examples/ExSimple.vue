<template>
    <section>
        <b-field grouped group-multiline>
            <div class="control">
                <b-switch v-model="showWeekNumber">Show week number</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="enableSeconds">Enable seconds</b-switch>
            </div>
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
            <b-field label="First day of week">
                <b-select v-model="firstDayOfWeek">
                    <option :value="undefined"></option>
                    <option :value="0">Sunday</option>
                    <option :value="1">Monday</option>
                    <option :value="2">Tuesday</option>
                    <option :value="3">Wednesday</option>
                    <option :value="4">Thursday</option>
                    <option :value="5">Friday</option>
                    <option :value="6">Saturday</option>
                </b-select>
            </b-field>
            <b-field label="Hour format">
                <b-select v-model="hourFormat">
                    <option :value="undefined"></option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                </b-select>
            </b-field>
        </b-field>
        <b-field label="Select datetime">
            <b-datetimepicker
                v-model="selected"
                rounded
                placeholder="Click to select..."
                icon="calendar-today"
                :icon-right="selected ? 'close-circle' : ''"
                icon-right-clickable
                @icon-right-click="clearDateTime"
                :locale="locale"
                :first-day-of-week="firstDayOfWeek"
                :datepicker="{ showWeekNumber }"
                :timepicker="{ enableSeconds, hourFormat }"
                horizontal-time-picker>
            </b-datetimepicker>
        </b-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            selected: new Date(),
            showWeekNumber: false,
            enableSeconds: false,
            hourFormat: undefined, // Browser locale
            locale: undefined, // Browser locale
            firstDayOfWeek: undefined // 0 - Sunday
        }
    },
    methods: {
        clearDateTime () {
            this.selected = null
        }
    }
}
</script>
