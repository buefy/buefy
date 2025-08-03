<template>
    <div id="sidebar-ad" />
</template>

<script lang="ts">
export default {
    mounted() {
    interface BSA {
      init(
        template: 'default' | 'stickybar' | 'fancybar' | 'flexbar' | 'hovercard' | 'hellobar' | 'stickybox',
        zoneKey: string,
        placement: string,
        options?: {
          target?: string;
          align?: 'horizontal' | 'vertical';
        }
      ): void;
    }

    const _bsa = (window as { _bsa?: BSA })._bsa

    if (_bsa) {
        _bsa.init('default', 'CWYITK77', 'buefy.org', {
            target: '#sidebar-ad',
            align: 'horizontal'
        })
    }
    }
}
</script>

<style lang="scss" scoped>
#sidebar-ad {
    margin: auto;
}
</style>
