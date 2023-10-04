<template>
    <section class="b-tooltips">

        <b-tooltip label="Tooltip right"
            position="is-right">
            <b-button label="Right" type="is-dark" />
        </b-tooltip>

        <b-tooltip label="Tooltip top">
            <b-button label="Top (default)" type="is-dark" />
        </b-tooltip>

        <b-tooltip label="Tooltip bottom"
            position="is-bottom">
            <b-button label="Bottom" type="is-dark" />
        </b-tooltip>

        <b-tooltip label="Tooltip left"
            position="is-left">
            <b-button label="Left" type="is-dark" />
        </b-tooltip>

        <b-tooltip label="delayed by 1000ms"
            :delay="1000">
            <b-button label="Delayed" type="is-dark" />
        </b-tooltip>
    </section>
</template>

<style lang="scss" scoped>
.b-tooltips {
    .b-tooltip:not(:last-child) {
        margin-right: .5em
    }
    .b-tooltip {
        margin-bottom: .5em
    }
}
</style>
