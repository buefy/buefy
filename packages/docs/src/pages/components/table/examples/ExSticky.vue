<template>
    <section>
        <b-field grouped group-multiline>
            <div class="control">
                <b-switch v-model="stickyHeaders">Sticky Headers</b-switch>
            </div>
            <div class="control">
                <b-switch v-model="dateSearchable">Date searchable</b-switch>
            </div>
        </b-field>

        Give each sticky column an explicit pixel <code>width</code> so
        they stack, left to right, instead of overlapping. Here
        <code>ID</code> and <code>Date</code> are both sticky.
        <br />
        <br />
        <b-table
            :data="data"
            :columns="columns"
            :sticky-header="stickyHeaders"
        ></b-table>

        <br />

        Use <code>checkable</code> and <code>sticky-checkbox</code> to make
        a sticky checkbox column too — sticky data columns automatically
        account for its width.
        <br />
        <br />
        <b-table
            :data="data"
            :columns="checkableColumns"
            :sticky-header="stickyHeaders"
            checkable
            sticky-checkbox
            striped
        ></b-table>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BField, BSwitch, BTable } from "buefy";

// Extra columns just to force horizontal scrolling, so the sticky
// columns' effect is visible.
const fillerColumns = ["A", "B", "C", "D", "E", "F"].map((letter) => ({
    field: "id",
    label: `Column ${letter}`,
}));

export default defineComponent({
    components: {
        BField,
        BSwitch,
        BTable,
    },
    data() {
        return {
            data: [
                {
                    id: 1,
                    user: { first_name: "Jesse", last_name: "Simmons" },
                    date: "2016/10/15 13:43:27",
                    gender: "Male",
                },
                {
                    id: 2,
                    user: { first_name: "John", last_name: "Jacobs" },
                    date: "2016/12/15 06:00:53",
                    gender: "Male",
                },
                {
                    id: 3,
                    user: { first_name: "Tina", last_name: "Gilbert" },
                    date: "2016/04/26 06:26:28",
                    gender: "Female",
                },
                {
                    id: 4,
                    user: { first_name: "Clarence", last_name: "Flores" },
                    date: "2016/04/10 10:28:46",
                    gender: "Male",
                },
                {
                    id: 5,
                    user: { first_name: "Anne", last_name: "Lee" },
                    date: "2016/12/06 14:38:38",
                    gender: "Female",
                },
            ],
            stickyHeaders: true,
            dateSearchable: false,
        };
    },
    computed: {
        columns() {
            return [
                {
                    field: "id",
                    label: "ID",
                    width: "40",
                    numeric: true,
                    sticky: true,
                },
                {
                    field: "user.first_name",
                    label: "First Name",
                },
                {
                    field: "user.last_name",
                    label: "Last Name",
                },
                {
                    field: "date",
                    label: "Date",
                    width: "180",
                    searchable: this.dateSearchable,
                    centered: true,
                    sticky: true,
                },
                {
                    field: "gender",
                    label: "Gender",
                },
                ...fillerColumns,
            ];
        },
        checkableColumns() {
            return [
                {
                    field: "id",
                    label: "ID",
                    width: "40",
                    numeric: true,
                    sticky: true,
                },
                {
                    field: "user.first_name",
                    label: "First Name",
                },
                {
                    field: "user.last_name",
                    label: "Last Name",
                },
                {
                    field: "date",
                    label: "Date",
                    searchable: this.dateSearchable,
                    centered: true,
                },
                {
                    field: "gender",
                    label: "Gender",
                },
                ...fillerColumns,
            ];
        },
    },
});
</script>
