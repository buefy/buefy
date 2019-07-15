<template>
    <section>
        <b-field label="Tooltip color">
            <b-slider tooltip-type="is-light"></b-slider>
        </b-field>

        <b-field label="Hide tooltip">
            <b-slider :show-tooltip="false"></b-slider>
        </b-field>

        <b-field label="Rounded thumb">
            <b-slider rounded></b-slider>
        </b-field>

        <b-field label="Show ticks">
            <div>
                <b-slider type="is-primary" :min="1" :max="10" show-ticks></b-slider>
                <b-slider size="is-large" :min="1" :max="10" show-ticks></b-slider>
            </div>
        </b-field>

    </section>
</template>
