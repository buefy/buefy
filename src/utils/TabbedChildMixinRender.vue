<template>
    <transition
        v-if="parent.animated"
        :name="parent.animated ? parent.animation || transitionName : null"
        @before-enter="parent.isTransitioning = true"
        @after-enter="parent.isTransitioning = false"
    >
        <div v-if="parent.destroyOnHide ? show : true" v-show="show" :class="elementClass">
            <slot />
        </div>
    </transition>
    <template v-else>
        <div v-if="parent.destroyOnHide ? show : true" v-show="show" :class="elementClass">
            <slot />
        </div>
    </template>
</template>
