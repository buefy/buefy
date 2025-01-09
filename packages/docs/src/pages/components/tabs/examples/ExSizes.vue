<template>
    <section>
        <b-tabs size="is-small" class="block">
            <b-tab-item label="Pictures" icon="camera-iris"></b-tab-item>
            <b-tab-item label="Music" icon="library-music"></b-tab-item>
            <b-tab-item label="Videos" icon="video"></b-tab-item>
        </b-tabs>

        <b-tabs size="is-medium" class="block">
            <b-tab-item label="Pictures" icon="camera-iris"></b-tab-item>
            <b-tab-item label="Music" icon="music-box-multiple"></b-tab-item>
            <b-tab-item label="Videos" icon="video"></b-tab-item>
        </b-tabs>

        <b-tabs size="is-large" class="block">
            <b-tab-item label="Pictures" icon="camera-iris"></b-tab-item>
            <b-tab-item label="Music" icon="library-music"></b-tab-item>
            <b-tab-item label="Videos" icon="video"></b-tab-item>
        </b-tabs>
    </section>
</template>

<script setup lang="ts">
import { BTabs, BTabItem } from '@ntohq/buefy-next'
</script>
