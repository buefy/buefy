<template>
    <section>
        <b-tooltip
            label="Tooltip multilined, probably because it's too long for a casual tooltip"
            multilined>
            <b-button text="Multiline (default)" size="is-dark" />
        </b-tooltip>

        <b-tooltip
            label="It's not briefy, but also not long enough"
            size="is-small"
            multilined>
            <b-button text="Multiline (small)" size="is-dark" />
        </b-tooltip>

        <b-tooltip
            label="Tooltip large multilined, because it's really long to be on a medium size. Did I tell you it's really long? Yes, it is — I asure you!"
            position="is-bottom"
            size="is-large"
            multilined>
            <b-button text="Multiline (large)" size="is-dark" />
        </b-tooltip>
    </section>
</template>
