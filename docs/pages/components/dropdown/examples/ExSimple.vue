<template>
    <section>
        <b-field label="Can close the first dropdown by">
            <b-select v-model="canClose">
                <option value="escape">using escape key only</option>
                <option value="outside">clicking outside only</option>
                <option :value="true">using both</option>
            </b-select>
        </b-field>


        <b-dropdown aria-role="list" :canClose="canClose">
            <button class="button is-primary" slot="trigger">
                <span>Click me!</span>
                <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
        </b-dropdown>

        <b-dropdown hoverable aria-role="list">
            <button class="button is-info" slot="trigger">
                <span>Hover me!</span>
                <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
        </b-dropdown>

        <b-dropdown disabled aria-role="list">
            <button class="button" slot="trigger">
                <span>Disabled</span>
                <b-icon icon="menu-down"></b-icon>
            </button>

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
    </section>
</template>

<script>
export default {
    data() {
        return {
            canClose: true
        }
    }
}
</script>


<style scoped>
    .tag {
        cursor: pointer;
    }
</style>
