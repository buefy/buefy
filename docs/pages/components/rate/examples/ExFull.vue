<template>
    <section>
        <b-field grouped group-multiline>
            <b-field label="Max">
                <b-numberinput v-model="maxs" min="1" controls-position="compact">
                </b-numberinput>
            </b-field>
            <b-field label="Pack Icon">
                <b-input v-model="packs" placeholder="e.g. mdi, fa or other">
                </b-input>
            </b-field>
            <b-field label="Icon">
                <b-input v-model="icons">
                </b-input>
            </b-field>
        </b-field>
        <b-field grouped group-multiline>
            <b-field label="Value">
                <b-numberinput v-model="rate" min="0" :max="maxs" 
                    :step="isDisabled ? '.1' : '1'" controls-position="compact">
                </b-numberinput>
            </b-field>
            <b-field label="Custom Text">
                <b-input v-model="custom" placeholder="e.g. Points or Total rates" :disabled="text">
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
        </b-field>
        <div class="block">
            <b-switch v-model="score" :disabled="text">Show Score</b-switch>
            <b-switch v-model="text" :disabled="score">Show Text</b-switch>
            <b-switch v-model="isDisabled">Read Only (Support Decimal)</b-switch>
            <b-switch v-model="isSpaced">Space</b-switch>
        </div>
        <hr>
        <b-rate 
            v-model="rate"
            :icon-pack="packs"
            :icon="icons" 
            :max='maxs' 
            :size="sizes"
            :show-score="score"
            :show-text="text"
            :custom-text="custom"
            :disabled="isDisabled"
            :spaced="isSpaced">
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
                packs: '',
                icons: 'star',
                score: false,
                text: false,
                custom: '',
                isSpaced: false,
                isDisabled: true
            }
        }
    }
</script>
