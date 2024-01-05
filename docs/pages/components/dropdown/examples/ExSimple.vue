<template>
    <section>

        <b-dropdown aria-role="list">
            <template #trigger="{ active }">
                <b-button
                    label="Click me!"
                    type="is-primary"
                    :icon-right="active ? 'menu-up' : 'menu-down'" />
            </template>


            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
        </b-dropdown>

        <b-dropdown :triggers="['hover']" aria-role="list">
            <template #trigger>
                <b-button
                    label="Hover me!"
                    type="is-info"
                    icon-right="menu-down" />
            </template>


            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
        </b-dropdown>

        <b-dropdown disabled aria-role="list">
            <template #trigger>
                <b-button
                    label="Disabled"
                    icon-right="menu-down" />
            </template>


            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
        </b-dropdown>

        <b-dropdown aria-role="list">
            <template #trigger>
                <p
                    class="tag is-success"
                    role="button">
                    Custom trigger
                </p>
            </template>


            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
        </b-dropdown>

        <b-dropdown :triggers="['contextmenu']" aria-role="list">
            <template #trigger>
                <b-button
                    type="is-link"
                    label="Right click" />
            </template>


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
