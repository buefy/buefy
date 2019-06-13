<template>
    <section class="columns">
        <div class="column">
            <b-field>
                <b-switch v-model="isAmPm">AM/PM</b-switch>
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
                :hour-format="format"></b-clockpicker>
        </div>
    </section>
</template>

<script>
export default {
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
            ]
        }
    },
    computed: {
        format() {
            return this.isAmPm ? '12' : '24'
        }
    }
}
</script>
