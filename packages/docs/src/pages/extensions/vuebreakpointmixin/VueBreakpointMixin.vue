<template>
  <div>
      <div class="buttons">
          <a
              class="button"
              href="https://www.npmjs.com/package/vue-breakpoint-mixin"
              target="_blank">
              Website
          </a>
      </div>

      <Example :component="ExVueBreakpointMixin" :code="ExVueBreakpointMixinCode" vertical>
        <b-message type="is-info">
            <p><strong>VueBreakpointMixin is not included in Buefy</strong>, you have to install it:</p>
            <CodeView code="npm install vue-breakpoint-mixin" expanded/>
        </b-message>
      </Example>

  </div>
</template>

<script>
import ExVueBreakpointMixin from './example/ExVueBreakpointMixin'
import ExVueBreakpointMixinCode from './example/ExVueBreakpointMixin.vue?raw'

export default {
  name: 'VueBreakpointMixin',
  data: () => ({
    ExVueBreakpointMixin,
    ExVueBreakpointMixinCode,
  }),
}
</script>
