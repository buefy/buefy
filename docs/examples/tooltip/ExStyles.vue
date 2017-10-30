<template>
    <section>
        <b-tooltip label="Text is dashed" dashed>
            Simple text
        </b-tooltip>

        <b-tooltip label="Maybe you like a little animation"
            position="is-bottom"
            animated>
            <button class="button">Animated</button>
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
