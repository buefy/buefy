<template>
  <section>
    <b-sidebar
      type="is-light"
      :fullheight="fullheight"
      :fullwidth="fullwidth"
      :overlay="overlay"
      :right="right"
      v-model="open"
    >
      <div class="p-1">
        <img
          src="/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
        <b-menu>
          <b-menu-list label="Menu">
            <b-menu-item icon="information-outline" label="Info"></b-menu-item>
            <b-menu-item icon="settings">
              <template #label="props">
                Administrator
                <b-icon class="is-pulled-right" :icon="props.expanded ? 'menu-down' : 'menu-up'"></b-icon>
              </template>
              <b-menu-item icon="account" label="Users"></b-menu-item>
              <b-menu-item icon="cellphone-link">
                <template #label>
                  Devices
                  <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                        <template #trigger>
                            <b-icon icon="dots-vertical"></b-icon>
                        </template>
                        <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
                        <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                        <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                  </b-dropdown>
                </template>
              </b-menu-item>
              <b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item>
            </b-menu-item>
            <b-menu-item icon="account" label="My Account">
              <b-menu-item label="Account data"></b-menu-item>
              <b-menu-item label="Addresses"></b-menu-item>
            </b-menu-item>
          </b-menu-list>
          <b-menu-list>
            <b-menu-item label="Expo" icon="link" tag="router-link" target="_blank" to="/expo"></b-menu-item>
          </b-menu-list>
          <b-menu-list label="Actions">
            <b-menu-item label="Logout"></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
    <div class="block">
      <b-field grouped group-multiline>
        <div class="control">
          <b-switch v-model="overlay">Overlay</b-switch>
        </div>
        <div class="control">
          <b-switch v-model="fullheight">Fullheight</b-switch>
        </div>
        <div class="control">
          <b-switch v-model="fullwidth">Fullwidth</b-switch>
        </div>
        <div class="control">
          <b-switch v-model="right">Right</b-switch>
        </div>
      </b-field>
    </div>
    <b-button @click="open = true">Show</b-button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  BButton,
  BDropdown,
  BDropdownItem,
  BField,
  BIcon,
  BMenu,
  BMenuList,
  BMenuItem,
  BSidebar,
  BSwitch
} from '@ntohq/buefy-next'

export default defineComponent({
  components: {
    BButton,
    BDropdown,
    BDropdownItem,
    BField,
    BIcon,
    BMenu,
    BMenuList,
    BMenuItem,
    BSidebar,
    BSwitch
  },
  data() {
    return {
      open: false,
      overlay: true,
      fullheight: true,
      fullwidth: false,
      right: false
    };
  }
})
</script>

<style>
.p-1 {
  padding: 1em;
}
</style>
