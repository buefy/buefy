export default {
  data() {
    return {
      isAmPm: false
    }
  },
  computed: {
    format() {
      return this.isAmPm ? '12' : '24'
    }
  }
}