<template>
    <section>
        <div class="block">
            <b-field label="Format and locale">
                <b-field>
                    <b-select v-model="format">
                        <option value="raw">Raw</option>
                        <option value="percent">Percent</option>
                    </b-select>
                </b-field>
                <b-field>
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
        </div>

        <b-field label="Simple indicator">
            <b-slider v-model="value1" indicator :tooltip="false" :max="10000" :format="format" :locale="locale"></b-slider>
        </b-field>
        <b-field label="Custom format (bypass locale)">
            <b-slider v-model="value2" :custom-formatter="(val) => val + '%'" :tooltip="false" indicator></b-slider>
        </b-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                format: "raw",
                locale: undefined, // Browser locale

                value1: 6000,
                value2: 40,
            }
        }
    }
</script>
