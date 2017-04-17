<template>
  <span>
    <i :class="getIcon" aria-hidden="true"></i> {{data}}
  </span>
</template>

<script>
  export default {
    props: {
      data: String
    },
    computed: {
      getIcon() {
        var classes = "fa ";
        if (this.data == "Male") {
          classes += "fa-mars"
        } else if (this.data == "Female") {
          classes += "fa-venus"
        } else {
          classes += "fa-question"
        }

        return classes;
      }
    }
  }
</script>
