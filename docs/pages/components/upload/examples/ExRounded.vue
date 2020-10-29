<template>
  <section>
    <b-field class="file">
      <b-upload v-model="file" rounded>
        <a class="button is-primary is-rounded">
          <b-icon icon="upload"></b-icon>
          <span>{{ file.name || "Click to upload"}}</span>
        </a>
      </b-upload>
    </b-field>
  </section>
</template>

<script>
export default {
  data() {
    return {
      file: {},
    };
  },
};
</script>
