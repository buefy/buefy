<template>
    <section>
        <b-tooltip label="Text is dashed" dashed>
            Simple text
        </b-tooltip>

        <b-tooltip label="Maybe you like a little animation"
            position="is-bottom"
            animated>
            <b-button text="Animated" />
        </b-tooltip>

        <b-tooltip label="You prefer dark?"
            type="is-dark"
            position="is-bottom">
            <b-button text="Dark" />
        </b-tooltip>

        <b-tooltip label="Or light?"
            type="is-light"
            position="is-bottom">
            <b-button text="Light" />
        </b-tooltip>

        <b-tooltip label="I'm never closing" always>
            <b-button text="Always" />
        </b-tooltip>

        <b-tooltip label="I'm square"
            position="is-bottom"
            square>
            <b-button text="Square" />
        </b-tooltip>
    </section>
</template>
