<template>
    <div>
        <p class="content">Children are loaded asynchronously when a node is first expanded.</p>
        <b-tree :data="roots" :load="loadChildren" lazy @load-error="onLoadError" />
        <p v-if="errorMsg" class="has-text-danger mt-2">{{ errorMsg }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BTree } from 'buefy'

let counter = 1

export default defineComponent({
    components: { BTree },
    data() {
        return {
            errorMsg: '' as string,
            roots: [
                { id: 'node-a', label: 'Node A' },
                { id: 'node-b', label: 'Node B (will error)' },
                { id: 'node-c', label: 'Node C' }
            ]
        }
    },
    methods: {
        loadChildren(node: Record<string, unknown>): Promise<Record<string, unknown>[]> {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (node.id === 'node-b') {
                        reject(new Error('Failed to load Node B children'))
                        return
                    }
                    resolve([
                        { id: `${node.id}-child-${counter++}`, label: `Child of ${node.label}`, isLeaf: true },
                        { id: `${node.id}-child-${counter++}`, label: `Child of ${node.label}`, isLeaf: true }
                    ])
                }, 800)
            })
        },
        onLoadError(_node: unknown, _key: unknown, err: Error) {
            this.errorMsg = err.message
        }
    }
})
</script>
