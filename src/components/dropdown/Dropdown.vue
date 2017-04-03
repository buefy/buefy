<template>
    <div class="dropdown">
        <slot></slot>
        <slot name="list"></slot>
    </div>
</template>

<script>
    import Icon from '../icon'

    export default {
        name: 'bDropdown',
        components: {
            [Icon.name]: Icon
        },
        props: {

        }
    }
</script>
