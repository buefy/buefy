<template>
    <section class="b-tooltips">
        <b-tooltip label="Text is dashed" dashed>
            Simple text
        </b-tooltip>

        <b-tooltip label="Maybe you like a little animation"
            position="is-bottom"
            :animated="false">
            <button class="button">No animation</button>
        </b-tooltip>

        <b-tooltip label="You prefer dark?"
            type="is-dark"
            position="is-bottom">
            <button class="button">Dark</button>
        </b-tooltip>

        <b-tooltip label="Or light?"
            type="is-light"
            position="is-bottom">
            <button class="button">Light</button>
        </b-tooltip>

        <b-tooltip label="I'm never closing" always>
            <button class="button">Always</button>
        </b-tooltip>

        <b-tooltip label="I'm square"
            position="is-bottom"
            square>
            <button class="button">Square</button>
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