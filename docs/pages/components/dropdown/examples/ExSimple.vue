<template>
    <section>
        <b-dropdown>
            <button class="button is-primary" slot="trigger">
                <span>Click me!</span>
                <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item>Action</b-dropdown-item>
            <b-dropdown-item>Another action</b-dropdown-item>
            <b-dropdown-item>Something else</b-dropdown-item>
        </b-dropdown>

        <b-dropdown hoverable>
            <button class="button is-info" slot="trigger">
                <span>Hover me!</span>
                <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item>Action</b-dropdown-item>
            <b-dropdown-item>Another action</b-dropdown-item>
            <b-dropdown-item>Something else</b-dropdown-item>
        </b-dropdown>

        <b-dropdown disabled>
            <button class="button" slot="trigger">
                <span>Disabled</span>
                <b-icon icon="menu-down"></b-icon>
            </button>

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
