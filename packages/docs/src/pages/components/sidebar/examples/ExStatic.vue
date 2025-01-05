<template>
    <div class="sidebar-page">
        <section class="sidebar-layout">
             <b-sidebar
                position="static"
                :mobile="mobile"
                :expand-on-hover="expandOnHover"
                :reduce="reduce"
                :delay="expandWithDelay ? 500 : null"
                type="is-light"
                :modelValue="true"
            >
                <div class="p-1">
                    <div class="block">
                    <img
                        src="/static/img/buefy-logo.png"
                        alt="Lightweight UI components for Vue.js based on Bulma"
                    />
                    </div>
                    <b-menu class="is-custom-mobile">
                        <b-menu-list label="Menu">
                            <b-menu-item icon="information-outline" label="Info"></b-menu-item>
                            <b-menu-item model-value expanded icon="settings" label="Administrator">
                                <b-menu-item icon="account" label="Users"></b-menu-item>
                                <b-menu-item icon="cellphone-link" label="Devices"></b-menu-item>
                                <b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item>
                            </b-menu-item>
                            <b-menu-item icon="account" label="My Account">
                                <b-menu-item icon="account-box" label="Account data"></b-menu-item>
                                <b-menu-item icon="home-account" label="Addresses"></b-menu-item>
                            </b-menu-item>
                        </b-menu-list>
                        <b-menu-list>
                            <b-menu-item label="Expo" icon="link"></b-menu-item>
                        </b-menu-list>
                        <b-menu-list label="Actions">
                            <b-menu-item icon="logout" label="Logout"></b-menu-item>
                        </b-menu-list>
                    </b-menu>
                </div>
            </b-sidebar>

            <div class="p-1">
                <b-field>
                    <b-switch v-model="reduce">Reduced</b-switch>
                </b-field>
                <b-field>
                    <b-switch v-model="expandOnHover">Expand on hover</b-switch>
                </b-field>
                <b-field>
                    <b-switch v-model="expandWithDelay">Hover with delay</b-switch>
                </b-field>
                <b-field label="Mobile Layout">
                    <b-select v-model="mobile">
                        <option :value="null"></option>
                        <option value="reduce">Reduced</option>
                        <option value="hide">Hidden</option>
                        <option value="fullwidth">Fullwidth</option>
                    </b-select>
                </b-field>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  BField,
  BMenu,
  BMenuItem,
  BMenuList,
  BSelect,
  BSidebar,
  BSwitch
} from '@ntohq/buefy-next'

export default defineComponent({
  components: {
    BField,
    BMenu,
    BMenuItem,
    BMenuList,
    BSelect,
    BSidebar,
    BSwitch
  },
  data() {
    return {
      expandOnHover: false,
      expandWithDelay: false,
      mobile: "reduce",
      reduce: false
    };
  }
})
</script>

<style lang="scss">
.p-1 {
  padding: 1em;
}
.sidebar-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    // min-height: 100vh;
    .sidebar-layout {
        display: flex;
        flex-direction: row;
        min-height: 100%;
        // min-height: 100vh;
    }
}
@media screen and (max-width: 1023px) {
    .b-sidebar {
        .sidebar-content {
            &.is-mini-mobile {
                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: none;
                                }
                            }
                            ul {
                                padding-left: 0;
                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }
                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
@media screen and (min-width: 1024px) {
    .b-sidebar {
        .sidebar-content {
            &.is-mini {
                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover):not(.is-mini-delayed) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: none;
                                }
                            }
                            ul {
                                padding-left: 0;
                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }
                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
.is-mini-expand {
    .menu-list a {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
