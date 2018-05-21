<template>
    <section>
        <b-dropdown>
            <b-button
                text="Click me!"
                btn="is-primary"
                slot="trigger"
                icon="menu-down"
                icon-position="after"
            />

            <b-dropdown-item>Action</b-dropdown-item>
            <b-dropdown-item>Another action</b-dropdown-item>
            <b-dropdown-item>Something else</b-dropdown-item>
        </b-dropdown>

        <b-dropdown hoverable>
            <b-button
                text="Hover me!"
                btn="is-info"
                slot="trigger"
                icon="menu-down"
                icon-position="after"
            />

            <b-dropdown-item>Action</b-dropdown-item>
            <b-dropdown-item>Another action</b-dropdown-item>
            <b-dropdown-item>Something else</b-dropdown-item>
        </b-dropdown>

        <b-dropdown disabled>
            <b-button
                text="Disabled"
                slot="trigger"
                icon="menu-down"
                icon-position="after"
            />

            <b-dropdown-item>Action</b-dropdown-item>
            <b-dropdown-item>Another action</b-dropdown-item>
            <b-dropdown-item>Something else</b-dropdown-item>
        </b-dropdown>

        <b-dropdown>
            <p class="tag is-success" slot="trigger">
                Custom trigger
            </p>

            <b-dropdown-item>Action</b-dropdown-item>
            <b-dropdown-item>Another action</b-dropdown-item>
            <b-dropdown-item>Something else</b-dropdown-item>
        </b-dropdown>
    </section>
</template>

<style scoped>
    .tag {
        cursor: pointer;
    }
</style>
