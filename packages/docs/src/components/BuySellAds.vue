<template>
  <div id="native-ad" class="bsa-ad"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'BsaAd',
  setup() {
    onMounted(() => {
      if (typeof _bsa !== 'undefined' && _bsa) {
        _bsa.init('default', 'YOUR_ZONE_KEY', 'placement:buefyorg', {
          target: '#native-ad',
          align: 'horizontal'
        })
      }
    })
  }
})
</script>

<style scoped>
.bsa-ad {
  margin: 2rem auto;
  text-align: center;
}
</style>
