<template>
    <section>
        <b-field label="Tooltip type">
            <b-slider v-model="sliderValue" :tooltip-type="sliderType"></b-slider>
        </b-field>

        <b-field label="Tooltip Always">
            <b-slider tooltip-always></b-slider>
        </b-field>
        
        <b-field label="Hide tooltip">
            <b-slider :tooltip="false"></b-slider>
        </b-field>

        <b-field label="Custom tooltip label">
            <b-slider :custom-formatter="val => val + '%'"></b-slider>
        </b-field>

        <b-field label="Rounded thumb">
            <b-slider rounded></b-slider>
        </b-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                sliderValue: 0
            }
        },
        computed:{
            sliderType(){
                if (this.sliderValue > 25 && this.sliderValue < 75){
                    return "is-warning";
                } else if (this.sliderValue >= 75){
                    return "is-success";
                }
                return "is-danger";
            }
        }
    }
</script>
