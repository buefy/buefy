<template>
    <section id="variables-view" class="variables-view">
        <h2 class="title is-4">
            <router-link to="#variables-view">
                #
            </router-link>
            Variables
        </h2>
        <p>You can use these variables to customize this component.</p>

        <b-table
            :mobile-cards="false"
            :data="data"
            :columns="variablesColumns"
        />
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BTable } from 'buefy'

interface VariableInfo {
    name?: string;
    description?: string;
    default?: string;
}

export default defineComponent({
    components: { BTable },
    props: {
        data: Array<VariableInfo>
    },
    computed: {
        variablesColumns() {
            const columns = []
            if (this.data!.some((d) => d.name !== undefined)) {
                columns.push({
                    label: 'Name',
                    field: 'name',
                    renderHtml: true
                })
            }
            if (this.data!.some((d) => d.description !== undefined)) {
                columns.push({
                    label: 'Description',
                    field: 'description',
                    renderHtml: true
                })
            }
            if (this.data!.some((d) => d.default !== undefined)) {
                columns.push({
                    label: 'Default',
                    field: 'default',
                    renderHtml: true
                })
            }
            return columns
        }
    }
})
</script>
