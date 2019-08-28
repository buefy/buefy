<template>
    <section>
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

        <button class="button is-dark">
            <b-icon pack="ionicons" icon="checkmark"></b-icon>
            <span>Finish</span>
        </button>

        <button class="button is-warning">
            <b-icon pack="ionicons" icon="checkmark"></b-icon>
            <span>Finish</span>
        </button>

        <button class="button is-warning">
            <b-icon
                pack="ionicons"
                icon="refresh">
            </b-icon>
            <span>Refresh</span>
        </button>

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

<script>
    import config from "../../../../../src/utils/config"

    const customIconConfig = {
        customIconPacks: {
            'fas': {
                sizes: {
                    'default': 'fa-sm',
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
                    'menu-up': 'arrow-dropup'
                }
            }
        }
    }
    export default {
        created() {
            this.$buefy.config.setOptions(customIconConfig)
        }
    }
</script>

<style scoped>
    @import "https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css";
</style>
