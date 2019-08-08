<template>
    <section>
        <b-field grouped group-multiline>
            <b-field label="Max">
                <b-numberinput v-model="maxs" min="1" controls-position="compact"></b-numberinput>
            </b-field>
            <b-field label="Size">
               <b-select v-model="sizes">
                    <option value="">default</option>
                    <option value="is-small">is-small</option>
                    <option value="is-medium">is-medium</option>
                    <option value="is-large">is-large</option>
                </b-select>
            </b-field>
            <b-field label="Icon">
                <b-input v-model="icons">
                </b-input>
            </b-field>
        </b-field>
        <b-field grouped group-multiline>
            <b-field label="Value">
                <b-input v-model="rate">
                </b-input>
            </b-field>
            <b-field label="Custom Text">
                <b-input v-model="custom" :disabled="text">
                </b-input>
            </b-field>
        </b-field>
        <div class="block">
            <b-switch v-model="score" :disabled="text || isDisabled">Show Score</b-switch>
            <b-switch v-model="text" :disabled="score">Show Text</b-switch>
            <b-switch v-model="isDisabled" :disabled="text">Read Only (Half star)</b-switch>
        </div>
        <hr>
        <b-rate 
            v-model="rate"
            :icon="icons" 
            :max='maxs' 
            :size="sizes"
            :show-score="score"
            :show-text="text"
            :custom-text="custom"
            :disabled="isDisabled">
        </b-rate>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                rate: 0,
                custom: '',
                maxs: 5,
                sizes: '',
                icons: 'mdi mdi-star',
                score: true,
                text: false,
                isDisabled: false
            }
        }
    }
</script>
