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
    </section>
</template>
