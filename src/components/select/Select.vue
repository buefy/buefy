<template>
    <div class="select">
        <slot></slot>
        <slot name="list"></slot>
    </div>
</template>

<script>
    import Icon from '../icon'

    export default {
        name: 'bSelect',
        components: {
            [Icon.name]: Icon
        },
        props: {

        }
    }
</script>
