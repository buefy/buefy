<template>
    <div class="tags" :class="{ 'has-addons': attached }">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'bTaglist',
        props: {
            attached: Boolean
        }
    }
</script>
