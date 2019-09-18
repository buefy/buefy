<template>
    <section id="variables-view" class="variables-view">
        <h2 class="title is-4">
            <router-link to="#variables-view">#</router-link>
            Variables
        </h2>
        <p>You can use these variables to customize this component.</p>

        <template>
            <b-table
                :mobile-cards="false"
                :data="data"
                :columns="variablesColumns"
            />
        </template>
    </section>
</template>

<script>
export default {
    props: {
        data: Array
    },
    data() {
        return {
            variablesColumns: [
                { label: 'Name', field: 'name', renderHtml: true },
                { label: 'Default', field: 'default', renderHtml: true }
            ]
        }
    }
}
</script>
