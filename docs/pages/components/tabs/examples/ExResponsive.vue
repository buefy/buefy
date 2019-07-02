<template>
    <section>
        <div class="block">
            <b-field>
                <b-switch v-model="animatedAccordion"> Has animated accordion </b-switch>
            </b-field>
            <b-field>
                <b-radio native-value="" v-model="type">Default</b-radio>
                <b-radio native-value="is-boxed" v-model="type">Boxed</b-radio>
                <b-radio native-value="is-toggle" v-model="type">Toggle</b-radio>
                <b-radio native-value="is-toggle-rounded" v-model="type">Toggle rounded</b-radio>
            </b-field>
        </div>
        <b-tabs
            v-model="activeTab"
            :has-mobile-accordion="true"
            :type="type"
            :animated-accordion="animatedAccordion">
            <b-tab-item label="Pictures">
                Lorem ipsum dolor sit amet.
            </b-tab-item>

            <b-tab-item label="Music">
                Lorem <br>
                ipsum <br>
                dolor <br>
                sit <br>
                amet.
            </b-tab-item>

            <b-tab-item label="Books">
                What light is light, if Silvia be not seen? <br>
                What joy is joy, if Silvia be not by— <br>
                Unless it be to think that she is by <br>
                And feed upon the shadow of perfection? <br>
                Except I be by Silvia in the night, <br>
                There is no music in the nightingale.
            </b-tab-item>

            <b-tab-item label="Videos">
                Nunc nec velit nec libero vestibulum eleifend.
                Curabitur pulvinar congue luctus.
                Nullam hendrerit iaculis augue vitae ornare.
                Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
            </b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                type: '',
                activeTab: 0,
                animatedAccordion: true
            }
        }
    }
</script>
