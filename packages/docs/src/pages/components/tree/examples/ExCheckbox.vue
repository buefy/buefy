<template>
    <div>
        <b-tree
            :data="nodes"
            selection-mode="checkbox"
            v-model:checked-keys="checked"
        />
        <p class="mt-2">Checked keys: <strong>{{ checked.join(', ') || '—' }}</strong></p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BTree } from 'buefy'

export default defineComponent({
    components: { BTree },
    data() {
        return {
            checked: [] as string[],
            nodes: [
                {
                    id: 'fruits',
                    label: 'Fruits',
                    children: [
                        { id: 'apple', label: 'Apple', isLeaf: true },
                        { id: 'banana', label: 'Banana', isLeaf: true },
                        { id: 'cherry', label: 'Cherry', isLeaf: true }
                    ]
                },
                {
                    id: 'vegs',
                    label: 'Vegetables',
                    children: [
                        { id: 'carrot', label: 'Carrot', isLeaf: true },
                        { id: 'spinach', label: 'Spinach', isLeaf: true, disabled: true },
                        { id: 'tomato', label: 'Tomato', isLeaf: true }
                    ]
                }
            ]
        }
    }
})
</script>
