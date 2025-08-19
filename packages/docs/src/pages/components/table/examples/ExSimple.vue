<template>
  <b-table
    :data="data"
    :columns="columns"
    @click="rowClick"
    @mouseenter="rowMouseEnter"
    @mouseleave="rowMouseLeave"
  >
  </b-table>
  <p>
    Id of Row clicked on: <strong>{{ selectedRowClicked }}</strong>
  </p>
  <p>
    Id of Row hovering on: <strong>{{ selectedRowHovered }}</strong>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BTable } from 'buefy';

export default defineComponent({
  components: {
    BTable,
  },
  data() {
    return {
      selectedRowClicked: '',
      selectedRowHovered: '',
      data: [
        {
          id: 1,
          first_name: 'Jesse',
          last_name: 'Simmons',
          date: '2016-10-15 13:43:27',
          gender: 'Male',
        },
        {
          id: 2,
          first_name: 'John',
          last_name: 'Jacobs',
          date: '2016-12-15 06:00:53',
          gender: 'Male',
        },
        {
          id: 3,
          first_name: 'Tina',
          last_name: 'Gilbert',
          date: '2016-04-26 06:26:28',
          gender: 'Female',
        },
        {
          id: 4,
          first_name: 'Clarence',
          last_name: 'Flores',
          date: '2016-04-10 10:28:46',
          gender: 'Male',
        },
        {
          id: 5,
          first_name: 'Anne',
          last_name: 'Lee',
          date: '2016-12-06 14:38:38',
          gender: 'Female',
        },
      ],
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true,
        },
        {
          field: 'first_name',
          label: 'First Name',
        },
        {
          field: 'last_name',
          label: 'Last Name',
        },
        {
          field: 'date',
          label: 'Date',
          centered: true,
        },
        {
          field: 'gender',
          label: 'Gender',
        },
      ],
    };
  },
  methods: {
    rowClick(row) {
      console.log(row);
      this.selectedRowClicked = row.id;
    },
    rowMouseEnter(event, row) {
      console.log(row);
      this.selectedRowHovered = row.id;
    },
    rowMouseLeave(event, row) {
      console.log(row);
      this.selectedRowHovered = '';
    },
  },
});
</script>
