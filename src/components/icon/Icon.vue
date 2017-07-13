<template>
    <span class="icon" :class="[type, size]">
        <i :class="[newPack.name, newPack.style === 'fa' ? `${newPack.prefix}${newIcon}` : '']">{{ newPack.style === 'mdi' ? newIcon : null }}</i>
    </span>
</template>

<script>
    import config from '../../utils/config'
    const faPack = {
      name: 'fa', prefix: 'fa-', style: 'fa', buefyicons: {
        done: 'check',
        info: 'info-circle',
        check_circle: 'check-circle',
        warning: 'exclamation-triangle',
        error: 'exclamation-circle',
        arrow_upward: 'arrow-up',
        chevron_right: 'angle-right',
        chevron_left: 'angle-left',
        keyboard_arrow_down: 'angle-down',
        visibility: 'eye',
        visibility_off: 'eye-slash',
        arrow_drop_down: 'caret-down',
      }
    };
    const mdiPack = {
      name: 'mdi', prefix: '', style: 'mdi', buefyicons: {
        done: 'done',
        info: 'info',
        check_circle: 'check_circle',
        warning: 'warning',
        error: 'error',
        arrow_upward: 'arrow_upward',
        chevron_right: 'chevron_right',
        chevron_left: 'chevron_left',
        keyboard_arrow_down: 'keyboard_arrow_down',
        visibility: 'visibility',
        visibility_off: 'visibility_off',
        arrow_drop_down: 'arrow_drop_down',
      }
    };
    const fontelloPack = {
      name: 'fontello', prefix: 'icon-', style: 'fa', buefyicons: {
        done: 'ok',
        info: 'info-circle',
        check_circle: 'ok-circle',
        warning: 'exclamation-triangle',
        error: 'attention-circled',
        arrow_upward: 'up-big',
        chevron_right: 'angle-right',
        chevron_left: 'angle-left',
        keyboard_arrow_down: 'angle-down',
        visibility: 'eye',
        visibility_off: 'eye-off',
        arrow_drop_down: 'sort-down',
      }
    };
    const packs = {fa: faPack, fontello: fontelloPack, mdi: mdiPack}


    export default {
        name: 'bIcon',
        props: {
            type: String,
            pack: String,
            icon: String,
            both: Boolean, // This is used internally to show both MDI and FA icon
            size: String
        },
        data() {
            return {
                newPack: packs[this.pack || config.defaultIconPack],
            }
        },
        computed: {
            /**
             * Internal icon name based on the pack.
             * If pack is 'fa', gets the equivalent FA icon name of the MDI,
             * internal icons are always MDI.
             */
            newIcon() {
                if (this.both) {
                    return this.newPack.buefyicons[this.icon]
                } else {
                    return this.icon
                }
            }
        },
        methods: {
        }
    }
</script>
