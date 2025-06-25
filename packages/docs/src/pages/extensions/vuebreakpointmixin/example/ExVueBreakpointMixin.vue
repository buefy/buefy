<template>
  <div id="main">
    <h1 v-if="isMobile">Mobile Screen</h1>
    <h1 v-else-if="isTablet">Tablet Screen</h1>
    <h1 v-else-if="isDesktop">Desktop Screen</h1>
    <h1>Screen Size: <b>{{sizeType}}</b></h1>
    <p>Adjust screen to see different messages</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { DefineComponent } from 'vue';
// @ts-expect-error - vue-breakpoint-mixin does not provide types so far
import VueBreakpointMixin from 'vue-breakpoint-mixin';

// TODO: ask vue-breakpoint-mixin to support Vue 3
VueBreakpointMixin.onMounted = VueBreakpointMixin.mounted;
VueBreakpointMixin.onBeforeUnmount = VueBreakpointMixin.beforeDestroy;

// TODO: ask vue-breakpoint-mixin to provide types
type VueBreakpointMixinType = DefineComponent<
  {}, // P(rops)
  {}, // B (raw bindings)
  {}, // D(ata)
  {
    isMobile: () => boolean,
    isTablet: () => boolean,
    isDesktop: () => boolean
  } // C(omputed)
>

export default defineComponent({
  name: 'ExVueBreakpointMixin',
  mixins: [VueBreakpointMixin as VueBreakpointMixinType],
})
</script>

<style>
#main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 25vh;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
