<template>
  <small :class="getClasses"><!-- i class="fa fa-rocket"></i--> {{data}}</small>
</template>

<script>
  export default {
    props: {
      data: Number
    },
    computed: {
      getClasses: function () {
        var classes = "tag ";
        if (this.data <= "200") {
          classes += "is-info";
        } else if (this.data <= "500") {
          classes += "is-success";
        } else if (this.data <= "1000") {
          classes += "is-warning";
        } else {
          classes += "is-danger";
        }
        return classes;
      }
    }
  }
</script>
