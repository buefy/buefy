<template>
    <section>
        <b-tabs type="is-boxed">
            <b-tab-item label="Pictures" icon="camera-iris"></b-tab-item>
            <b-tab-item label="Music" icon="music-box-multiple"></b-tab-item>
            <b-tab-item label="Videos" icon="video"></b-tab-item>
        </b-tabs>

        <b-tabs type="is-toggle">
            <b-tab-item label="Pictures" icon="camera-iris"></b-tab-item>
            <b-tab-item label="Music" icon="music-box-multiple"></b-tab-item>
            <b-tab-item label="Videos" icon="video"></b-tab-item>
        </b-tabs>

        <b-tabs type="is-toggle-rounded">
            <b-tab-item label="Pictures" icon="camera-iris"></b-tab-item>
            <b-tab-item label="Music" icon="music-box-multiple"></b-tab-item>
            <b-tab-item label="Videos" icon="video"></b-tab-item>
        </b-tabs>
    </section>
</template>

<script setup lang="ts">
import { BTabs, BTabItem } from "buefy";
</script>
