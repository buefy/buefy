<template>
  <div id="main">
    <h1 v-if="isMobile">Mobile Screen</h1>
    <h1 v-else-if="isTablet">Tablet Screen</h1>
    <h1 v-else-if="isDesktop">Desktop Screen</h1>
    <h1>Screen Size: <b>{{sizeType}}</b></h1>
    <p>Adjust screen to see different messages</p>
  </div>
</template>

<script>
import VueBreakpointMixin from 'vue-breakpoint-mixin';

export default {
  name: 'ExVueBreakpointMixin',
  mixins: [VueBreakpointMixin],
}
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