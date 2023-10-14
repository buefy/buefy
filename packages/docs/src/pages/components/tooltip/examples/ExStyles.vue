<template>
    <section class="b-tooltips">
        <b-tooltip label="Text is dashed" dashed>
            Simple text
        </b-tooltip>

        <b-tooltip label="Maybe you like a little animation"
            position="is-bottom"
            :animated="false">
            <b-button label="No animation" />
        </b-tooltip>

        <b-tooltip label="You prefer dark?"
            type="is-dark"
            position="is-bottom">
            <b-button label="Dark" />
        </b-tooltip>

        <b-tooltip label="Or light?"
            type="is-light"
            position="is-bottom">
            <b-button label="Light" />
        </b-tooltip>

        <b-tooltip label="I'm never closing" always>
            <b-button label="Always" />
        </b-tooltip>

        <b-tooltip label="I'm square"
            position="is-bottom"
            square>
            <b-button label="Square" />
        </b-tooltip>

        <b-tooltip label="You love the light variant, dont you?"
            type="is-primary is-light"
            position="is-bottom">
            <b-button label="Primary light variant" />
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
