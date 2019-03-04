<template>
  <div>
    <b-table :data="data" :columns="columns" :draggable="true" @dragstart="dragstart" @drop="drop" @dragover="dragover"></b-table>
    <pre>Dragging row:{{ draggingRowIndex }}<br />{{ draggingRow }}</pre>
    <pre>Dragging over row:{{ draggingOverRowIndex }} <br />{{ draggingOverRow }}</pre>
    <pre>Dropped on:{{ droppedOnRowIndex }} <br />{{ droppedOnRow }}</pre>
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
              draggingRow: '',
              draggingRowIndex: '',
              draggingOverRow: '',
              draggingOverRowIndex: '',
              droppedOnRow: '',
              droppedOnRowIndex: ''
          }
      },
      methods: {
        async dragstart (payload) {
          this.draggingRow = JSON.stringify(payload.row, null, 2)
          this.draggingRowIndex = '[' + payload.index + ']'
        },
        async dragover(payload) {
          payload.event.preventDefault();
          if(payload.row.id === 3) {
            payload.event.dataTransfer.dropEffect = 'link'
          } else {
            payload.event.dataTransfer.dropEffect = 'copy'
          }
          this.draggingOverRow = JSON.stringify(payload.row, null, 2) 
          this.draggingOverRowIndex = '[' + payload.index + ']'
        },
        async drop(payload) {
          this.droppedOnRow = JSON.stringify(payload.row, null, 2)
          this.droppedOnRowIndex = '[' + payload.index + ']'
        }
      }
  }
</script>
