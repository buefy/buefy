<template>
    <section>
        <b-tooltip
            label="Tooltip multilined, probably because it's too long for a casual tooltip"
            multilined>
            <button class="button is-dark">
                Multiline (default)
            </button>
        </b-tooltip>

        <b-tooltip
            label="It's not briefy, but also not long enough"
            size="is-small"
            multilined>
            <button class="button is-dark">
                Multiline (small)
            </button>
        </b-tooltip>

        <b-tooltip
            label="Tooltip large multilined, because it's really long to be on a medium size. Did I tell you it's really long? Yes, it is — I asure you!"
            position="is-bottom"
            size="is-large"
            multilined>
            <button class="button is-dark">
                Multiline (large)
            </button>
        </b-tooltip>
    </section>
</template>
