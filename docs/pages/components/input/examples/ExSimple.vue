<template>
    <section>
    <b-field horizontal custom-class="username-field" expanded label="Username" label-for="identity-username">
      <b-field expanded>
        <b-input required aria-required="true" v-model="name" dir="auto" pattern="[a-z0-9_]+" id="identity-username">
        </b-input>
        <p class="control">
          <span class="button is-static">@somewhere</span>
        </p>
      </b-field>
    </b-field>
  </section>
</template>

<script>
    export default {
        data() {
            return {
                name: 'John Silver'
            }
        }
    }
</script>
