<script>
    import classNames from 'classnames'

    export default {
        name: 'bTooltip',
        props: {
            type: {
                type: String,
                default: 'primary'
            },
            size: {
                type: String,
                default: 'auto',
                validator: value => ['auto', 'small', 'medium', 'large'].includes(value)
            },
            always: Boolean,
            noAnimate: {
                type: Boolean,
                default: true
            },
            rounded: {
                type: Boolean,
                default: true
            },
            content: {
                type: String,
                default: ''
            },
            placement: {
                type: String,
                default: 'top'
            }
        },

        render() {
            let children = this.$slots.default
            if (!children) {
                return
            }

            // filter out text nodes (possible whitespaces)
            children = children.filter(c => c.tag)
            /* istanbul ignore if */
            if (!children.length) {
                return
            }

            const rawChild = children[0]

            rawChild.data.attrs = {
                'aria-label': this.content
            }

            rawChild.data.class = classNames(
                'tooltip',
                `tooltip--${this.placement}`, {
                    [`tooltip--${this.type}`]: this.type,
                    [`tooltip--${this.size}`]: this.size !== 'auto' ? this.size : 'auto',
                    'tooltip--rounded': this.rounded,
                    'tooltip--always': this.always,
                    'tooltip--no-animate': this.noAnimate
                }
            )

            return rawChild
        },

        watch: {
            content(val) {
                this.$el.setAttribute('aria-label', val)
            }
        }

    }

</script>

<style lang="scss">
    @import '~assets/styles/main';
    $hintPrefix: 'tooltip--';
    $hintFontFamily: $family-sans-serif;
    $hintTextShadowDarkenAmount: 0;
    $hintWarningColor: $warning;
    $hintInfoColor: $info;
    $hintSuccessColor: $success;
    @import '~hint.css/src/hint';
    .tooltip--warning:after {
        color: $warning-invert;
    }
    .#{$hintPrefix}primary {
        @include hint-type($primary);
    }
    .#{$hintPrefix}danger {
        @include hint-type($danger);
    }
    .#{$hintPrefix}rounded:after {
        border-radius: $radius;
    }
    [class*="#{$hintPrefix}"]:after {
        box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
    }
</style>
