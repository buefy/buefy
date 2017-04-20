<template>
    <transition
        appear
        appear-active-class="fadeIn"
        enter-active-class="fadeIn"
        leave-active-class="fadeOut">

        <div class="dialog modal is-active" >
            <div class="modal-background"  @click="$emit('close')"></div>

            <transition
                appear
                appear-active-class="zoomIn"
                enter-active-class="zoomIn">

                <div class="modal-card">
                    <slot name="header">
                        <header class="modal-card-head">
                            <p class="modal-card-title">default header</p>
                        </header>
                    </slot>
                    <slot>
                        <section class="modal-card-body">
                            default body
                        </section>
                    </slot>
                    <slot name="footer">
                        <footer class="modal-card-foot">
                            <button class="button is-primary" @click="$emit('close')">Close</button>
                        </footer>
                    </slot>
                </div>

            </transition>

        </div>

    </transition>
</template>

<script>
export default {
    name: 'bModal',
    data() {
        return {
            isActive: false
        }
    }
}
</script>
