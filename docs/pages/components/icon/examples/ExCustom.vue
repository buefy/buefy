<template>
    <section>
        <div class="block">
            <b-icon
                pack="icon"
                icon="person"
                size="is-small">
            </b-icon>
            <b-icon
                pack="icon"
                icon="home"
                size="is-small">
            </b-icon>
            <b-icon
                pack="icon"
                icon="apps"
                size="is-small">
            </b-icon>
        </div>

        <div class="block">
            <b-icon
                pack="icon"
                icon="person">
            </b-icon>
            <b-icon
                pack="icon"
                icon="home">
            </b-icon>
            <b-icon
                pack="icon"
                icon="apps">
            </b-icon>
        </div>

        <div class="block">
            <b-icon
                pack="icon"
                icon="person"
                size="is-medium">
            </b-icon>
            <b-icon
                pack="icon"
                icon="home"
                size="is-medium">
            </b-icon>
            <b-icon
                pack="icon"
                icon="apps"
                size="is-medium">
            </b-icon>
        </div>

        <div class="block">
            <b-icon
                pack="icon"
                icon="person"
                size="is-large"
                type="is-success">
            </b-icon>
            <b-icon
                pack="icon"
                icon="home"
                size="is-large"
                type="is-info">
            </b-icon>
            <b-icon
                pack="icon"
                icon="apps"
                size="is-large"
                type="is-primary">
            </b-icon>
        </div>

        <button class="button is-dark">
            <b-icon pack="icon" icon="checkmark"></b-icon>
            <span>Finish</span>
        </button>

        <button class="button is-warning">
            <b-icon pack="icon" icon="checkmark"></b-icon>
            <span>Finish</span>
        </button>

        <button class="button is-warning">
            <b-icon
                pack="icon"
                icon="refresh">
            </b-icon>
            <span>Refresh</span>
        </button>
    </section>
</template>

<script>
    const customIconConfig = {
        customIconPacks: {
            'icon': {
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
