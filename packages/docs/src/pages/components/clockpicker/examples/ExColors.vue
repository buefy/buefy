<template>
    <section class="columns">
        <div class="column">
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
            <b-field label="Bulma color class"></b-field>
            <b-field v-for="color in colors" :key="color">
                <b-radio v-model="selectedColor" :native-value="color">is-{{color}}</b-radio>
            </b-field>
        </div>
        <div class="column">
            <b-clockpicker
                v-model="time"
                inline
                :type="'is-' + selectedColor"
                :locale="locale"
                :hour-format="hourFormat"></b-clockpicker>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BClockpicker, BField, BRadio, BSelect } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BClockpicker,
        BField,
        BRadio,
        BSelect
    },
    data() {
        return {
            time: new Date(),
            isAmPm: false,
            selectedColor: 'primary',
            colors: [
                'primary',
                'info',
                'success',
                'warning',
                'danger',
                'white',
                'black',
                'light',
                'dark'
            ],
            hourFormat: undefined, // Browser locale
            locale: undefined // Browser locale
        }
    }
})
</script>
