<template>
  <div>
    <b-table
      :data="data"
      :columns="columns"
      draggable
      draggable-column
      @dragstart="dragstart"
      @drop="drop"
      @dragover="dragover"
      @dragleave="dragleave"
      @columndragstart="columndragstart"
      @columndrop="columndrop"
      @columndragover="columndragover"
      @columndragleave="columndragleave">
    </b-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { BTable } from '@ntohq/buefy-next'
  import type {
    ITableColumn,
    TableColumnDragEvent,
    TableRow,
    TableRowDragEvent
} from '@ntohq/buefy-next'

  export default defineComponent({
      components: {
          BTable
      },
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
              draggingRow: null as TableRow | null,
              draggingRowIndex: null as number | null,
              draggingColumn: null as ITableColumn | null,
              draggingColumnIndex: null as number | null
          }
      },
      methods: {
        dragstart(payload: TableRowDragEvent) {
          this.draggingRow = payload.row
          this.draggingRowIndex = payload.index
          payload.event.dataTransfer!.effectAllowed = 'copy'
        },
        dragover(payload: TableRowDragEvent) {
          payload.event.dataTransfer!.dropEffect = 'copy';
          (payload.event.target as Element).closest('tr')!.classList.add('is-selected')
          payload.event.preventDefault()
        },
        dragleave(payload: TableRowDragEvent) {
          (payload.event.target as Element).closest('tr')!.classList.remove('is-selected')
          payload.event.preventDefault()
        },
        drop(payload: TableRowDragEvent) {
          (payload.event.target as Element).closest('tr')!.classList.remove('is-selected')
          const droppedOnRowIndex = payload.index
          this.$buefy.toast.open(`Moved ${this.draggingRow.first_name} from row ${this.draggingRowIndex! + 1} to ${droppedOnRowIndex! + 1}`)
        },

        columndragstart(payload: TableColumnDragEvent) {
          this.draggingColumn = payload.column
          this.draggingColumnIndex = payload.index
          payload.event.dataTransfer!.effectAllowed = 'copy'
        },
        columndragover(payload: TableColumnDragEvent) {
          payload.event.dataTransfer!.dropEffect = 'copy';
          (payload.event.target as Element).closest('th')!.classList.add('is-selected')
          payload.event.preventDefault()
        },
        columndragleave(payload: TableColumnDragEvent) {
          (payload.event.target as Element).closest('th')!.classList.remove('is-selected')
          payload.event.preventDefault()
        },
        columndrop(payload: TableColumnDragEvent) {
          (payload.event.target as Element).closest('th')!.classList.remove('is-selected')
          const droppedOnColumnIndex = payload.index
          this.$buefy.toast.open(`Moved ${this.draggingColumn!.field} from column ${this.draggingColumnIndex! + 1} to ${droppedOnColumnIndex! + 1}`)
        }
      }
  })
</script>
