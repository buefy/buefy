<template>
    <section>
        <div class="field">
            <b-switch>Default</b-switch>
        </div>
        <div class="field">
            <b-switch v-model="isSwitched">
                {{ isSwitched }}
            </b-switch>
        </div>
        <div class="field">
            <b-switch v-model="isSwitchedCustom"
                true-value="Yes"
                false-value="No">
                {{ isSwitchedCustom }}
            </b-switch>
        </div>
        <div class="field">
            <b-switch disabled>Disabled</b-switch>
        </div>
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
