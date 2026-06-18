<template>
    <div>
        <b-tree :data="nodes" selection-mode="single" v-model:selected="selected">
            <template #default="{ data, expanded }">
                <span :style="{ color: data.color }">
                    <b-icon :icon="expanded ? 'folder-open' : data.icon || 'file'" />
                    {{ data.label }}
                    <b-tag v-if="data.badge" type="is-primary is-light" size="is-small">
                        {{ data.badge }}
                    </b-tag>
                </span>
            </template>
        </b-tree>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BIcon, BTag, BTree } from 'buefy'

export default defineComponent({
    components: { BIcon, BTag, BTree },
    data() {
        return {
            selected: null as string | null,
            nodes: [
                {
                    id: '1',
                    label: 'src',
                    color: '#3273dc',
                    children: [
                        { id: '1-1', label: 'components', isLeaf: false, color: '#3273dc',
                            children: [
                                { id: '1-1-1', label: 'Button.vue', isLeaf: true, icon: 'code-tags', badge: 'Vue' },
                                { id: '1-1-2', label: 'Input.vue', isLeaf: true, icon: 'code-tags', badge: 'Vue' }
                            ]
                        },
                        { id: '1-2', label: 'utils', isLeaf: false, color: '#3273dc',
                            children: [
                                { id: '1-2-1', label: 'helpers.ts', isLeaf: true, icon: 'language-typescript', badge: 'TS' }
                            ]
                        }
                    ]
                },
                {
                    id: '2',
                    label: 'package.json',
                    isLeaf: true,
                    icon: 'code-json',
                    color: '#48c774'
                }
            ]
        }
    }
})
</script>
