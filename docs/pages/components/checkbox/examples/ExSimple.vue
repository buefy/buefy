<template>
    <section>
        <div class="field">
            <b-checkbox>Basic</b-checkbox>
        </div>
        <div class="field">
            <b-checkbox v-model="checkbox">
                {{ checkbox }}
            </b-checkbox>
        </div>
        <div class="field">
            <b-checkbox v-model="checkboxCustom"
                true-value="Yes"
                false-value="No">
                {{ checkboxCustom }}
            </b-checkbox>
        </div>
        <div class="field">
            <b-checkbox :indeterminate="true">
                Indeterminate
            </b-checkbox>
        </div>
        <div class="field">
            <b-checkbox disabled>Disabled</b-checkbox>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                checkbox: false,
                checkboxCustom: 'Yes'
            }
        }
    }
</script>
