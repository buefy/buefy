<template>
  <section>
    <b-field label="Include filename">
      <b-field class="file is-primary" :class="{'has-name': !!file}">
        <b-upload v-model="file" class="file-label" rounded>
          <span class="file-cta">
            <b-icon icon="upload"></b-icon>
            <span class="file-label">{{ file.name || "Click to upload"}}</span>
          </span>
        </b-upload>
      </b-field>
    </b-field>

    <b-field label="Seperate filename">
        <b-field class="file is-primary"  :class="{'has-name': !!file}">
            <b-upload v-model="file" class="file-label" rounded>
                <span class="file-cta">
                    <b-icon class="file-icon" icon="upload"></b-icon>
                    <span class="file-label">Click to upload</span>
                </span>
                <span class="file-name" v-if="file">
                    {{ file.name }}
                </span>
            </b-upload>
        </b-field> 
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
