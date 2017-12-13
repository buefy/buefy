<template>
    <div class="example" :class="{ 'is-vertical': vertical }">
        <div class="button-container">
            <CodepenEdit :code="code"/>
        </div>
        <div class="example-component" :class="{ 'is-paddingless': paddingless }">
            <component :is="component"/>
        </div>
        <CodeView :code="code" bordered codepen/>
    </div>
</template>

<script>
    import CodepenEdit from './CodepenEdit'

    export default {
        components: {
            CodepenEdit
        },
        props: {
            component: [Object, Function],
            code: String,
            paddingless: Boolean,
            vertical: Boolean
        }
    }
</script>

