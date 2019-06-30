<template>
    <section>
        <b-field>
            <b-datepicker
                ref="datepicker"
                placeholder="Select a date">
            </b-datepicker>
            <b-button
                @click="$refs.datepicker.toggle()"
                icon-left="calendar-today"
                type="is-primary" />
        </b-field>
    </section>
</template>
