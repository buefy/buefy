<template>
    <section>
        <b-dropdown v-model="selected" aria-role="listbox">
            <template #trigger>
                <b-button
                    :label="selected"
                    type="is-primary"
                    icon-right="menu-down"
                />
            </template>

            <b-dropdown-item value="Apple" aria-role="option">
                Apple
            </b-dropdown-item>
            <b-dropdown-item value="Banana" aria-role="option">
                Banana
            </b-dropdown-item>
            <b-dropdown-item value="Cherry" aria-role="option">
                Cherry
            </b-dropdown-item>
        </b-dropdown>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BButton, BDropdown, BDropdownItem } from "buefy";

export default defineComponent({
    components: {
        BButton,
        BDropdown,
        BDropdownItem,
    },
    data() {
        return {
            selected: "Apple",
        };
    },
});
</script>
