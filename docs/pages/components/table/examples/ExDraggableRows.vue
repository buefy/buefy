<template>
  <div>
    <b-table
      :data="data"
      :columns="columns"
      draggable
      @dragstart="dragstart"
      @drop="drop"
      @dragover="dragover"
      @dragleave="dragleave">
    </b-table>
  </div> 
</template>

<script>
  export default {
      data() {
          return {
              data: [
                  { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                  { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                  { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                  { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
                  { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
              ],
              columns: [
                  {
                      field: 'id',
                      label: 'ID',
                      width: '40',
                      numeric: true
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
                      centered: true
                  },
                  {
                      field: 'gender',
                      label: 'Gender',
                  }
              ],
              draggingRow: null,
              draggingRowIndex: null
          }
      },
      methods: {
        dragstart (payload) {
          this.draggingRow = payload.row
          this.draggingRowIndex = payload.index
          payload.event.dataTransfer.effectAllowed = 'copy'
        },
        dragover(payload) {
          payload.event.dataTransfer.dropEffect = 'copy'
          payload.event.target.closest('tr').classList.add('is-selected')
          payload.event.preventDefault()
        },
        dragleave(payload) {
          payload.event.target.closest('tr').classList.remove('is-selected')
          payload.event.preventDefault()
        },
        drop(payload) {
          payload.event.target.closest('tr').classList.remove('is-selected')
          const droppedOnRowIndex = payload.index
          this.$toast.open(`Moved ${this.draggingRow.first_name} from row ${this.draggingRowIndex + 1} to ${droppedOnRowIndex + 1}`)
        }
      }
  }
</script>
