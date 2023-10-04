<template>
    <section>
        <b-field grouped group-multiline>
            <b-field label="Max">
                <b-numberinput v-model="maxs" min="1" controls-position="compact"></b-numberinput>
            </b-field>
            <b-field label="Icon Pack">
                <b-input v-model="packs" placeholder="e.g. mdi, fa or other"></b-input>
            </b-field>
            <b-field label="Icon">
                <b-input v-model="icons"></b-input>
            </b-field>
        </b-field>
        <div class="block">
            <b-field grouped group-multiline>
                <b-field label="Value">
                    <b-numberinput v-model="rate" min="0" :max="maxs"
                        :step="isDisabled ? '.1' : '1'" controls-position="compact">
                    </b-numberinput>
                </b-field>
                <b-field label="Custom Text">
                    <b-input v-model="custom" placeholder="e.g. Points or Total reviews" :disabled="text">
                    </b-input>
                </b-field>
                <b-field label="Size">
                    <b-select v-model="sizes">
                        <option value="">default</option>
                        <option value="is-small">is-small</option>
                        <option value="is-medium">is-medium</option>
                        <option value="is-large">is-large</option>
                    </b-select>
                </b-field>
                <b-field label="Locale">
                    <b-select v-model="locale" :disabled="!score">
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
        <b-field grouped group-multiline>
            <div class="control">
                <b-switch v-model="isRtl">Rtl</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="score" :disabled="text">Show Score</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="text" :disabled="score">Show Text</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="isDisabled">Read Only (Support Decimal)</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="isSpaced">Spaced</b-switch>
            </div>
        </b-field>
        <b-field label="Texts Template">
            <b-taginput
                v-model="texts"
                :maxtags="maxs"
                :disabled="score">
            </b-taginput>
        </b-field>
        <hr>
        <b-rate
            v-model="rate"
            :icon-pack="packs"
            :icon="icons"
            :max="maxs"
            :size="sizes"
            :locale="locale"
            :show-score="score"
            :custom-text="custom"
            :show-text="text"
            :texts="texts"
            :rtl="isRtl"
            :spaced="isSpaced"
            :disabled="isDisabled">
        </b-rate>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                rate: 4.6,
                maxs: 5,
                sizes: '',
                packs: 'mdi',
                icons: 'star',
                score: false,
                custom: '',
                text: false,
                texts: ['Very bad', 'Bad', 'Good', 'Very good', 'Awesome'],
                isRtl:false,
                isSpaced: false,
                isDisabled: true,
                locale: undefined // Browser locale
            }
        }
    }
</script>
