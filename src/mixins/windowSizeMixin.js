export default{
    data: () => ({
    $sizeType: ''
  }),
  mounted () {
    window.addEventListener('resize', this.$resizeHandler);
    this.$resizeHandler();
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.$resizeHandler);
  },
  computed: {
    $isMobile () {
      return ['sm', 'xsm'].includes(this.$sizeType);
    },
    $isTablet () {
      return this.$sizeType === 'm';
    },
    $isDesktop () {
      return ['xl', 'l'].includes(this.$sizeType);
    }
  },
  methods: {
    $resizeHandler () {
      const xlResult = window.matchMedia('(min-width: 1408px)');
      const lResult = window.matchMedia('(min-width: 1216px)');
      const mResult = window.matchMedia('(min-width: 1024px)');
      const smResult = window.matchMedia('(min-width: 768px)');
      const xsmResult = window.matchMedia('(max-width: 768px)');
      if (xlResult.matches) {
        this.$sizeType = 'xl';
      } else if (lResult.matches) {
        this.$sizeType = 'l';
      } else if (mResult.matches) {
        this.$sizeType = 'm';
      } else if (smResult.matches) {
        this.$sizeType = 'sm';
      } else if (xsmResult.matches) {
        this.$sizeType = 'xsm';
      }
    }
  }
}
