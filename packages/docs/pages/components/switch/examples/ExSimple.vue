<template>
    <section>
        <b-field>
            <b-switch>Default</b-switch>
        </b-field>
        <b-field>
            <b-switch v-model="isSwitched">
                {{ isSwitched }}
            </b-switch>
        </b-field>
        <b-field>
            <b-switch v-model="isSwitchedCustom"
                true-value="Yes"
                false-value="No">
                {{ isSwitchedCustom }}
            </b-switch>
        </b-field>
        <b-field>
            <b-switch disabled>Disabled</b-switch>
        </b-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isSwitched: false,
                isSwitchedCustom: 'Yes'
            }
        }
    }
</script>
