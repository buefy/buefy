<template>
    <div>
        <p class="content">
            This tree uses <code>name</code> instead of <code>label</code>,
            <code>kids</code> instead of <code>children</code>, and <code>key</code>
            instead of <code>id</code> — mapped via the <code>fields</code> prop.
        </p>
        <b-tree
            :data="org"
            :fields="{ label: 'name', children: 'kids', id: 'key' }"
            selection-mode="single"
            v-model:selected="selected"
        />
        <p class="mt-2">Selected: <strong>{{ selected ?? '—' }}</strong></p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BTree } from 'buefy'

export default defineComponent({
    components: { BTree },
    data() {
        return {
            selected: null as string | null,
            org: [
                {
                    key: 'ceo',
                    name: 'Alice (CEO)',
                    kids: [
                        {
                            key: 'cto',
                            name: 'Bob (CTO)',
                            kids: [
                                { key: 'dev1', name: 'Carol (Engineer)' },
                                { key: 'dev2', name: 'Dan (Engineer)' }
                            ]
                        },
                        {
                            key: 'cmo',
                            name: 'Eve (CMO)',
                            kids: [
                                { key: 'mkt1', name: 'Frank (Designer)' }
                            ]
                        }
                    ]
                }
            ]
        }
    }
})
</script>
