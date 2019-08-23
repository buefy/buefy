<template>
    <section>
        <div class="block">
            <b-icon
                pack="cap-icon"
                icon="user"
                size="is-small">
            </b-icon>
            <b-icon
                pack="cap-icon"
                icon="home"
                size="is-small">
            </b-icon>
            <b-icon
                pack="cap-icon"
                icon="gear"
                size="is-small">
            </b-icon>
        </div>

        <div class="block">
            <b-icon
                pack="cap-icon"
                icon="user">
            </b-icon>
            <b-icon
                pack="cap-icon"
                icon="home">
            </b-icon>
            <b-icon
                pack="cap-icon"
                icon="gear">
            </b-icon>
        </div>

        <div class="block">
            <b-icon
                pack="cap-icon"
                icon="user"
                size="is-medium">
            </b-icon>
            <b-icon
                pack="cap-icon"
                icon="home"
                size="is-medium">
            </b-icon>
            <b-icon
                pack="cap-icon"
                icon="gear"
                size="is-medium">
            </b-icon>
        </div>

        <div class="block">
            <b-icon
                pack="cap-icon"
                icon="user"
                size="is-large"
                type="is-success">
            </b-icon>
            <b-icon
                pack="cap-icon"
                icon="home"
                size="is-large"
                type="is-info">
            </b-icon>
            <b-icon
                pack="cap-icon"
                icon="gear"
                size="is-large"
                type="is-primary">
            </b-icon>
        </div>

        <button class="button is-dark">
            <b-icon pack="cap-icon" icon="check"></b-icon>
            <span>Finish</span>
        </button>

        <button class="button is-warning">
            <b-icon pack="cap-icon" icon="check"></b-icon>
            <span>Finish</span>
        </button>

        <button class="button is-warning">
            <b-icon
                pack="cap-icon"
                icon="refresh">
            </b-icon>
            <span>Refresh</span>
        </button>
    </section>
</template>

<script>
    import config from "../../../../../src/utils/config"

    const customIconConfig = {
        customIconPacks: {
            'cap-icon': {
                sizes: {
                    'default': 'is-size-5',
                    'is-small': '',
                    'is-medium': 'is-size-3',
                    'is-large': 'is-size-1'
                },
                iconPrefix: 'ci-',
                internalIcons: {
                    'check': 'check',
                    'information': 'info',
                    'check-circle': 'info-circle',
                    'alert': 'info',
                    'alert-circle': 'info-circle',
                    'arrow-up': 'arrow-up',
                    'chevron-right': 'arrow-right',
                    'chevron-left': 'arrow-left',
                    'chevron-down': 'arrow-down',
                    'eye': 'eye',
                    'eye-off': 'unlock',
                    'menu-down': 'arrow-down-circled',
                    'menu-up': 'arrow-up-circled'
                }
            }
        }
    }
    export default {
        created() {
            this.$buefy.config.setOptions(Object.assign(config, customIconConfig))
        }
    }
</script>

<style scoped>
    @import "https://unpkg.com/captain-icons/dist/captain-icons.min.css";
</style>
