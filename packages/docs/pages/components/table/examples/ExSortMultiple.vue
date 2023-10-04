<template>
  <div>
    <b-field grouped group-multiline>
      <div class="control is-flex">
        <b-switch v-model="multiColumnSortingEnabled" @input="resetPriority">Sort multiple rows</b-switch>
      </div>
      <div class="control is-flex">
        <span class="button" :disabled="multiColumnSortingDisabledOrUndefined" @click="resetPriority">Reset sorting</span>
      </div>
      <div class="control is-flex">
        <b-select v-model="customKey" :disabled="multiColumnSortingDisabledOrUndefined">
          <option :value="null">None</option>
          <option value="shiftKey">Shift</option>
          <option value="altKey">Alt/Option</option>
          <option value="ctrlKey">Control</option>
        </b-select>
      </div>
      <div class="control is-flex">
        <b-switch v-model="backendSortingEnabled" @input="resetPriority">Backend sorting</b-switch>
      </div>
    </b-field>
    <b-table
      :data="data"
      ref="multiSortTable"
      :backend-sorting="backendSortingEnabled"
      @sort="sortPressed"
      @sorting-priority-removed="sortingPriorityRemoved"

      :sort-multiple="multiColumnSortingEnabled"
      :sort-multiple-data="sortingPriority"
      :sort-multiple-key="customKey"
    >

        <b-table-column field="first_name" label="First name" sortable v-slot="props">
            {{ props.row.first_name }}
        </b-table-column>
        <b-table-column field="last_name" label="Last name" sortable v-slot="props">
            {{ props.row.last_name }}
        </b-table-column>
        <b-table-column field="team" label="Team" sortable v-slot="props">
            {{ props.row.team }}
        </b-table-column>

    </b-table>
  </div>
</template>

<script>
import orderBy from 'lodash/orderBy'

const dataSource = [
  { 'id': 1, 'first_name': 'Abbie', 'last_name': 'Archer', 'team': 'Team B'},
  { 'id': 2, 'first_name': 'Abbie', 'last_name': 'Smith', 'team': 'Team A'},
  { 'id': 3, 'first_name': 'Jones', 'last_name': 'Smith', 'team': 'Team C'},
  { 'id': 4, 'first_name': 'Abbie', 'last_name': 'Archer', 'team': 'Team A'}
]
  export default {
      data() {
          return {
            customKey: null,
            backendSortingEnabled: false,
            multiColumnSortingEnabled: true,
            data: [],
            sortingPriority: []
          }
      },
      computed: {
          multiColumnSortingDisabledOrUndefined() {
              // On Vue 3, setting a boolean attribute `false` does not remove
              // it. `null` or `undefined` has to be given to do so.
              return !this.multiColumnSortingEnabled || undefined
          }
      },
      methods: {
        resetPriority(){
          this.$refs.multiSortTable.resetMultiSorting()

          // reset local backend sorting
          if(this.backendSortingEnabled) {
            this.sortingPriority = []
            this.loadAsyncData()
          }
        },

        // Backend sorting
        sortingPriorityRemoved(field){
          this.sortingPriority = this.sortingPriority.filter(
            (priority) => priority.field !== field)
          this.loadAsyncData(this.sortingPriority)
        },

        sortPressed(field, order, event) {
          if(this.backendSortingEnabled) {
            if(this.multiColumnSortingEnabled){
              if((this.customKey && event[this.customKey]) || !this.customKey) {
                let existingPriority = this.sortingPriority.filter(i => i.field === field)[0]
                if(existingPriority) {
                  existingPriority.order = existingPriority.order === 'desc' ? 'asc' : 'desc'
                } else {
                  // request sorted data from backend
                  this.sortingPriority.push({field, order})
                }
                this.loadAsyncData(this.sortingPriority)
              } else {
                // request regular sorted data from backend
                this.sortingPriority = [] // [{field, order}]
                this.loadAsyncData([{field, order}])
              }
            }
          }
        },

        // "API request" for data
        async loadAsyncData(sortingPriority = []) {
          let mockdata = JSON.parse(JSON.stringify(dataSource));
          // get data already sorted from the backend using sortingPriority
          this.data = orderBy(mockdata, sortingPriority.map(i => i.field), sortingPriority.map(i => i.order))
        }
      },
      created () {
        this.data = JSON.parse(JSON.stringify(dataSource));
      }
  }
</script>
