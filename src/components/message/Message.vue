<template>
    <transition name="fade">
        <article
            v-if="isActive"
            class="message"
            :class="[type, size]">
            <header v-if="title" class="message-header">
                <p>{{ title }}</p>
                <button
                    v-if="closable"
                    type="button"
                    class="delete"
                    @click="close"
                />
            </header>
            <section class="message-body">
                <div class="media">
                    <div v-if="icon && hasIcon" class="media-left">
                        <b-icon
                            :icon="icon"
                            :pack="iconPack"
                            :class="type"
                            both
                            :size="newIconSize"/>
                    </div>
                    <div class="media-content">
                        <slot/>
                    </div>
                </div>
            </section>
        </article>
    </transition>
</template>

<script>
    import MessageMixin from '../../utils/MessageMixin.js'

    export default {
        name: 'BMessage',
        mixins: [MessageMixin],
        data() {
            return {
                newIconSize: this.iconSize || this.size || 'is-large'
            }
        }
    }
</script>
