<template>
    <section>
        <div class="block">
            <p>
                <a href="https://ionicons.com" target="_blank">ionicons</a>
            </p>
            <div class="block">
                <b-icon
                    pack="ionicons"
                    icon="person"
                    size="is-small">
                </b-icon>
                <b-icon
                    pack="ionicons"
                    icon="home"
                    size="is-small">
                </b-icon>
                <b-icon
                    pack="ionicons"
                    icon="apps"
                    size="is-small">
                </b-icon>
            </div>
            <div class="block">
                <b-icon
                    pack="ionicons"
                    icon="person">
                </b-icon>
                <b-icon
                    pack="ionicons"
                    icon="home">
                </b-icon>
                <b-icon
                    pack="ionicons"
                    icon="apps">
                </b-icon>
            </div>
            <div class="block">
                <b-icon
                    pack="ionicons"
                    icon="person"
                    size="is-medium">
                </b-icon>
                <b-icon
                    pack="ionicons"
                    icon="home"
                    size="is-medium">
                </b-icon>
                <b-icon
                    pack="ionicons"
                    icon="apps"
                    size="is-medium">
                </b-icon>
            </div>
            <div class="block">
                <b-icon
                    pack="ionicons"
                    icon="person"
                    size="is-large"
                    type="is-success">
                </b-icon>
                <b-icon
                    pack="ionicons"
                    icon="home"
                    size="is-large"
                    type="is-info">
                </b-icon>
                <b-icon
                    pack="ionicons"
                    icon="apps"
                    size="is-large"
                    type="is-primary">
                </b-icon>
            </div>

            <div class="buttons">
                <b-button
                    label="Finish"
                    type="is-dark"
                    icon-pack="ionicons"
                    icon-left="checkmark" />
                <b-button
                    label="Finish"
                    type="is-warning"
                    icon-pack="ionicons"
                    icon-left="checkmark" />
                <b-button
                    label="Refresh"
                    type="is-warning"
                    icon-pack="ionicons"
                    icon-left="refresh" />
            </div>
        </div>

        <div class="block">
            <p>
                <a href="https://iconscout.com/unicons" target="_blank">unicons</a>
            </p>
            <div class="block">
                <b-icon
                    pack="uil"
                    icon="user"
                    size="is-small">
                </b-icon>
                <b-icon
                    pack="uil"
                    icon="home"
                    size="is-small">
                </b-icon>
                <b-icon
                    pack="uil"
                    icon="apps"
                    size="is-small">
                </b-icon>
            </div>
            <div class="block">
                <b-icon
                    pack="uil"
                    icon="user">
                </b-icon>
                <b-icon
                    pack="uil"
                    icon="home">
                </b-icon>
                <b-icon
                    pack="uil"
                    icon="apps">
                </b-icon>
            </div>
            <div class="block">
                <b-icon
                    pack="uil"
                    icon="user"
                    size="is-medium">
                </b-icon>
                <b-icon
                    pack="uil"
                    icon="home"
                    size="is-medium">
                </b-icon>
                <b-icon
                    pack="uil"
                    icon="apps"
                    size="is-medium">
                </b-icon>
            </div>
            <div class="block">
                <b-icon
                    pack="uil"
                    icon="user"
                    size="is-large"
                    type="is-success">
                </b-icon>
                <b-icon
                    pack="uil"
                    icon="home"
                    size="is-large"
                    type="is-info">
                </b-icon>
                <b-icon
                    pack="uil"
                    icon="apps"
                    size="is-large"
                    type="is-primary">
                </b-icon>
            </div>

            <div class="buttons">
                <b-button
                    label="Finish"
                    type="is-dark"
                    icon-pack="uil"
                    icon-left="check" />
                <b-button
                    label="Finish"
                    type="is-warning"
                    icon-pack="uil"
                    icon-left="check" />
                <b-button
                    label="Refresh"
                    type="is-warning"
                    icon-pack="uil"
                    icon-left="refresh" />
            </div>
        </div>

        <div class="block">
            <p>
                Can also customize some properties of the default icon packs. In this example, default sizes for FontAwesome have been modified.
            </p>
            <b-icon
                pack="fas"
                icon="user"
                size="is-small"
                type="is-success">
            </b-icon>
            <b-icon
                pack="fas"
                icon="user"
                type="is-info">
            </b-icon>
            <b-icon
                pack="fas"
                icon="user"
                size="is-medium"
                type="is-danger">
            </b-icon>
            <b-icon
                pack="fas"
                icon="user"
                size="is-large"
                type="is-primary">
            </b-icon>
        </div>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BIcon } from '@ntohq/buefy-next'

    const customIconConfig = {
        customIconPacks: {
            'fas': {
                sizes: {
                    'default': '',
                    'is-small': 'fa-xs',
                    'is-medium': 'fa-lg',
                    'is-large': 'fa-2x'
                }
            },
            'ionicons': {
                sizes: {
                    'default': 'is-size-5',
                    'is-small': '',
                    'is-medium': 'is-size-3',
                    'is-large': 'is-size-1'
                },
                iconPrefix: 'ion-md-',
                internalIcons: {
                    'check': 'checkmark',
                    'information': 'information',
                    'check-circle': 'checkmark-circle-outline',
                    'alert': 'alert',
                    'alert-circle': 'alert',
                    'arrow-up': 'arrow-up',
                    'chevron-right': 'arrow-forward',
                    'chevron-left': 'arrow-back',
                    'chevron-down': 'arrow-down',
                    'eye': 'eye',
                    'eye-off': 'eye-off',
                    'menu-down': 'arrow-dropdown',
                    'menu-up': 'arrow-dropup',
                    'close-circle': 'close-circle-outline'
                }
            },
            'uil': {
                sizes: {
                    'default': 'is-size-5',
                    'is-small': '',
                    'is-medium': 'is-size-3',
                    'is-large': 'is-size-1'
                },
                iconPrefix: 'uil-',
                internalIcons: {
                    'check': 'check',
                    'information': 'information',
                    'check-circle': 'checkmark-circle',
                    'alert': 'exclamation',
                    'alert-circle': 'exclamation-circle',
                    'arrow-up': 'arrow-up',
                    'chevron-right': 'angle-right',
                    'chevron-left': 'angle-left',
                    'chevron-down': 'arrow-down',
                    'eye': 'eye',
                    'eye-off': 'eye-slash',
                    'menu-down': 'angle-down',
                    'menu-up': 'angle-up',
                    'close-circle': 'times-circle'
                }
            }
        }
    }
    export default defineComponent({
        components: { BIcon },
        created() {
            this.$buefy.config.setOptions(customIconConfig)
        }
    })
</script>

<style scoped>
    @import "https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css";
    @import "https://unicons.iconscout.com/release/v2.1.11/css/unicons.css";
</style>
