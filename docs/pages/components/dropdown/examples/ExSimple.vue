<template>
    <section>

        <b-dropdown aria-role="list">
            <b-button
                slot="trigger"
                slot-scope="{ active }"
                label="Click me!"
                type="is-primary"
                :icon-right="active ? 'menu-up' : 'menu-down'" />

            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
        </b-dropdown>

        <b-dropdown :triggers="['hover']" aria-role="list">
            <b-button
                slot="trigger"
                label="Hover me!"
                type="is-info"
                icon-right="menu-down" />

            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
        </b-dropdown>

        <b-dropdown disabled aria-role="list">
            <b-button
                slot="trigger"
                label="Disabled"
                icon-right="menu-down" />

            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
        </b-dropdown>

        <b-dropdown aria-role="list">
            <p
                class="tag is-success"
                slot="trigger"
                role="button">
                Custom trigger
            </p>

            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
        </b-dropdown>

        <b-dropdown :triggers="['contextmenu']" aria-role="list">
            <b-button
                slot="trigger"
                type="is-link"
                label="Right click" />

            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
        </b-dropdown>
    </section>
</template>

<style scoped>
    .tag {
        cursor: pointer;
    }
</style>
