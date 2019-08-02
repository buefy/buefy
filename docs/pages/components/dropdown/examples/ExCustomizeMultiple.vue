<template>
    <section>
        <p class="content"><b>selected</b>: {{ selectedOptions }}</p>
        <b-dropdown
            v-model="selectedOptions"
            multiple
            aria-role="list">
            <button class="button is-primary" type="button" slot="trigger">
                <span>Selected ({{ selectedOptions.length }})</span>
                <b-icon icon="menu-down"></b-icon>
            </button>

            <b-dropdown-item value="option1" aria-role="listitem">
                <span>Option 1</span>
            </b-dropdown-item>

            <b-dropdown-item value="option2" aria-role="listitem">
                <span>Option 2</span>
            </b-dropdown-item>

            <b-dropdown-item value="option3" aria-role="listitem">
                <span>Option 3</span>
            </b-dropdown-item>
        </b-dropdown>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                selectedOptions: []
            }
        }
    }
</script>
