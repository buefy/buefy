<template>
    <section>
        <p class="content"><b>selected</b>: {{ selectedOptions }}</p>
        <b-dropdown
            v-model="selectedOptions"
            multiple
            aria-role="list">
            <template #trigger>
                <b-button
                    type="is-primary"
                    icon-right="menu-down">
                    Selected ({{ selectedOptions.length }})
                </b-button>
            </template>


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

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BButton, BDropdown, BDropdownItem } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BButton,
            BDropdown,
            BDropdownItem
        },
        data() {
            return {
                selectedOptions: []
            }
        }
    })
</script>
