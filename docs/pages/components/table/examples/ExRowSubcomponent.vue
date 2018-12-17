<template>
  <tr>
    <b-table-column field="id" label="ID" meta="Internal ID" width="40" numeric sortable>
      {{ row.id }}
    </b-table-column>
    <b-table-column field="first_name" label="FN" meta="First Name" sortable>
      {{ row.first_name }}
    </b-table-column>
    <b-table-column field="last_name" label="LN" meta="Last Name" sortable>
      {{ row.last_name }}
    </b-table-column>
    <b-table-column field="date" label="Acc. Date" meta="Account created date" centered sortable>
      {{ new Date(row.date).toLocaleDateString() }}
    </b-table-column>
    <b-table-column field="gender" label="Gender" sortable>
      {{ row.gender }}
    </b-table-column>
  </tr>
</template>
<script>
export default {
  props: {
    row: Object
  }
}
</script>
