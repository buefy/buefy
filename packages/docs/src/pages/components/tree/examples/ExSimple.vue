<template>
    <div>
        <b-tree :data="nodes" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BTree } from 'buefy'

export default defineComponent({
    components: { BTree },
    data() {
        return {
            nodes: [
                {
                    id: '1',
                    label: 'Documents',
                    children: [
                        { id: '1-1', label: 'Resume.pdf', isLeaf: true },
                        { id: '1-2', label: 'Cover Letter.docx', isLeaf: true }
                    ]
                },
                {
                    id: '2',
                    label: 'Pictures',
                    children: [
                        { id: '2-1', label: 'Vacation', children: [
                            { id: '2-1-1', label: 'beach.jpg', isLeaf: true },
                            { id: '2-1-2', label: 'sunset.jpg', isLeaf: true }
                        ]},
                        { id: '2-2', label: 'Family', children: [
                            { id: '2-2-1', label: 'birthday.jpg', isLeaf: true }
                        ]}
                    ]
                },
                {
                    id: '3',
                    label: 'Music',
                    children: [
                        { id: '3-1', label: 'Playlist.m3u', isLeaf: true }
                    ]
                }
            ]
        }
    }
})
</script>
