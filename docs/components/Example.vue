<template>
    <div class="example" :class="{ 'is-vertical': vertical }">
        <div class="example-component" :class="{ 'is-paddingless': paddingless }">
            <component :is="component"/>
        </div>
        <CodeView :code="code" bordered/>
    </div>
</template>

<script>
    export default {
        props: {
            component: [Object, Function],
            code: String,
            paddingless: Boolean,
            vertical: Boolean
        }
    }
</script>

