<template>
    <span>
        <span ref="trigger">
            <slot>
            </slot>
        </span>
        <transition :name="effect">
            <div
                :class="classObj"
                ref="popover"
                v-show="isShow">

                <div class="b-popover-arrow"></div>
                <h3 class="b-popover-title" v-show="title">{{title}}</h3>
                <div class="b-popover-content" ref="content">
                    <slot name="content">{{ content }}</slot>
                </div>
            </div>
        </transition>
    </span>
</template>

<script>
const EventListener = {
    /**
      * Listen to DOM events during the bubble phase.
      *
      * @param {DOMEventTarget} target DOM element to register listener on.
      * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
      * @param {function} callback Callback function.
      * @return {object} Object with a `remove` method.
      */
    listen(target, eventType, callback) {
        target.addEventListener(eventType, callback, false);

        return {
            remove: () => target.removeEventListener(eventType, callback, false),
        };
    },
};

export default {
    name: 'bPopover',
    props: {
        trigger: {
            type: String,
            default: 'click',
        },
        effect: {
            type: String,
            default: 'scale',
        },
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        placement: {
            type: String,
            default: 'top',
        },
        noresize: {
            type: Boolean,
            default: false,
        },
        show: {
            type: Boolean,
            default: false,
        },
        onClick: {
            type: Function,
        },
    },
    data() {
        return {
            isShow: this.show,
            position: {
                top: 0,
                left: 0,
            },
        };
    },
    watch: {
        isShow(val) {
            if (val && !this.noresize) {
                this.$nextTick(() => {
                    this.resize();
                });
            }
        },
    },
    computed: {
        classObj() {
            const { placement } = this;
            return {
                'b-popover': true,
                'b-popover-top': placement === 'top',
                'b-popover-left': placement === 'left',
                'b-popover-right': placement === 'right',
                'b-popover-bottom': placement === 'bottom',
            };
        },
    },
    methods: {
        toggle() {
            this.isShow = !this.isShow;
        },
        resize() {
            const popover = this.$refs.popover;
            const arrow = popover.children[0];
            const trigger = this.$refs.trigger.children[0];
            const bodyRect = document.body.getBoundingClientRect();
            const margin = 10;

            popover.style.display = 'block';
            trigger.style.position = 'relative';
            this.arrowposition = {};

            if (popover.offsetParent === null) {
                return;
            }

            const offsetParentRect = popover.offsetParent.getBoundingClientRect();

            if (this.placement === 'top' || this.placement === 'bottom') {
                const triggerHorizontalCenter = trigger.offsetLeft + trigger.offsetWidth / 2;
                const left = triggerHorizontalCenter - popover.offsetWidth / 2;
                const parentLeft = offsetParentRect.left - bodyRect.left;

                this.position.left = Math.max(left, 0);

                const rightEdge = this.position.left + popover.offsetWidth;
                const horizontalOverflow = rightEdge - document.documentElement.clientWidth;

                if (horizontalOverflow > 0) {
                    this.position.left -= (horizontalOverflow + parentLeft + margin);
                }

                if (this.placement === 'top') {
                    this.position.top = trigger.offsetTop - popover.offsetHeight;
                } else {
                    this.position.top = trigger.offsetTop + trigger.offsetHeight;
                }

                const deltaLeft = trigger.offsetLeft - this.position.left;
                this.arrowposition.left = deltaLeft + trigger.offsetWidth / 2;
            } else {
                const triggerVerticalCenter = trigger.offsetTop + trigger.offsetHeight / 2;
                const top = triggerVerticalCenter - popover.offsetHeight / 2;
                const parentTop = offsetParentRect.top - bodyRect.top;

                this.position.top = Math.max(top, 0);

                const bottomEdge = this.position.top + popover.offsetHeight;
                const verticalOverflow = bottomEdge - document.documentElement.clientHeight;

                if (verticalOverflow > 0) {
                    this.position.top -= (verticalOverflow + parentTop + margin);
                }

                if (this.placement === 'left') {
                    this.position.left = trigger.offsetLeft - popover.offsetWidth;
                } else {
                    this.position.left = trigger.offsetLeft + trigger.offsetWidth;
                }

                const deltaTop = trigger.offsetTop - this.position.top;
                this.arrowposition.top = deltaTop + trigger.offsetHeight / 2;
            }

            popover.style.top = `${this.position.top}px`;
            popover.style.left = `${this.position.left}px`;

            if (this.arrowposition.left) {
                arrow.style.left = `${this.arrowposition.left}px`;
            }

            if (this.arrowposition.top) {
                arrow.style.top = `${this.arrowposition.top}px`;
            }
        },
    },
    mounted() {
        if (!this.$refs.popover) return;

        this.$nextTick(() => {
            const popover = this.$refs.popover;
            const trigger = this.$refs.trigger.children[0];

            if (this.trigger === 'hover') {
                this.mouseenterEvent = EventListener.listen(trigger, 'mouseenter', () => {
                    this.isShow = true;
                });

                this.mouseleaveEvent = EventListener.listen(trigger, 'mouseleave', () => {
                    this.isShow = false;
                });
            } else if (this.trigger === 'focus') {
                const input = this.$refs.trigger.querySelector('input');

                if (input) {
                    this.focusEvent = EventListener.listen(input, 'focus', () => {
                        this.isShow = true;
                    });

                    this.blurEvent = EventListener.listen(input, 'blur', () => {
                        this.isShow = false;
                    });
                }
            } else if (this.trigger === 'mouse') {
                this.mousedownEvent = EventListener.listen(trigger, 'mousedown', () => {
                    this.isShow = true;
                });

                this.mouseupEvent = EventListener.listen(window, 'mouseup', () => {
                    this.isShow = false;
                });
            } else {
                // This is the default - trigger on click

                // Needed for testing when mounting a component that uses b-popover
                let topNode = popover;
                while (topNode.parentNode) {
                    topNode = topNode.parentNode;
                }

                const isFunction = arg => typeof arg === 'function';

                this.clickEvent = EventListener.listen(trigger, 'click', this.toggle);
                this.closeEvent = EventListener.listen(topNode, 'click', (e) => {
                    if (!this.$el.contains(e.target)) {
                        this.isShow = false;
                    }

                    const clickedContent = this.$refs.content &&
                        this.$refs.content.contains(e.target);

                    if (clickedContent && isFunction(this.onClick)) {
                        this.onClick(e, this);
                    }
                });
            }

            this.resize();
            popover.style.display = this.show ? 'block' : 'none';
            this.isShow = this.show;
        });
    },
    beforeDestroy() {
        if (this.blurEvent) {
            this.blurEvent.remove();
            this.focusEvent.remove();
        }

        if (this.mouseenterEvent) {
            this.mouseenterEvent.remove();
            this.mouseleaveEvent.remove();
        }

        if (this.clickEvent) {
            this.clickEvent.remove();
            this.closeEvent.remove();
        }

        if (this.mousedownEvent) {
            this.mousedownEvent.remove();
            this.mouseupEvent.remove();
        }
    },
};
</script>

<style lang="scss">
@import "../../../node_modules/bulma/sass/utilities/variables";

$popoverArrow: 6px;

.b-popover {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1060;
    display: none;
    padding: 1px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: left;
    white-space: normal;
    background-color: $background;
    background-clip: padding-box;
    border: 0;
    border-radius: 6px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);

    &-top {
        margin-top: -10px;
    }
    &-right {
        margin-left: 10px;
    }
    &-bottom {
        margin-top: 10px;
    }
    &-left {
        margin-left: -10px;
    }

    &-title {
        padding: 8px 14px;
        margin: 0;
        border-bottom: 1px solid $border;
        border-radius: 5px 5px 0 0;
    }

    &-content {
        padding: 9px 14px;
    }

    &-arrow,
    &-arrow:after {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }

    &-arrow {
        border-width: $popoverArrow;
    }

    &-arrow:after{
        content: "";
        border-width: 10px;
    }

    &-top > &-arrow {
        bottom: -$popoverArrow;
        left: 50%;
        margin-left: -$popoverArrow;
        border-top-color: rgba(0, 0, 0, 0.25);
        border-bottom-width: 0;

        &:after {
            bottom: 1px;
            margin-left: -10px;
            content: " ";
            border-top-color: $background;
            border-bottom-width: 0;
        }
    }

    &-right > &-arrow {
        top: 50%;
        left: -$popoverArrow;
        margin-top: -$popoverArrow;
        border-right-color: $border;
        border-left-width: 0;

        &:after {
          bottom: -10px;
          left: 1px;
          content: " ";
          border-right-color: $background;
          border-left-width: 0;
        }
    }

    &-bottom > &-arrow {
        top: -$popoverArrow;
        left: 50%;
        margin-left: -$popoverArrow;
        border-top-width: 0;
        border-bottom-color: $border;

        &:after {
            top: 1px;
            margin-left: -10px;
            content: " ";
            border-bottom-color: $background;
            border-top-width: 0;
        }
    }

    &-left > &-arrow {
        top: 50%;
        right: -$popoverArrow;
        margin-top: -$popoverArrow;
        border-right-width: 0;
        border-left-color: $border;

        &:after {
            right: 1px;
            bottom: -10px;
            content: " ";
            border-left-color: $background;
            border-right-width: 0;
        }
    }
}
</style>
