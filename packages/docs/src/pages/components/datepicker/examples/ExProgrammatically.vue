<template>
    <section>
        <b-field>
            <b-datepicker
                ref="datepicker"
                expanded
                placeholder="Select a date">
            </b-datepicker>
            <b-button
                @click="$refs.datepicker.toggle()"
                icon-left="calendar-today"
                type="is-primary" />
        </b-field>
    </section>
</template>

<script>
// TODO: remove this empty script section after TypeScript migration completes
export default {}
</script>
