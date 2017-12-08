<template>
    <div
        v-if="!column"
        key="row"
        class="example">
        <div class="example-component" :class="{ 'is-paddingless': paddingless }">
            <component :is="component"/>
        </div>
        <CodeView :code="code" bordered/>
    </div>
    <div
        v-else
        key="column"
        class="columns is-example">
        <div class="column">
            <div class="example">
                <div class="example-component" :class="{ 'is-paddingless': paddingless }">
                    <component :is="component"/>
                </div>
            </div>
        </div>
        <div class="column">
            <CodeView :code="code"/>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            component: [Object, Function],
            code: String,
            paddingless: Boolean,
            column: Boolean
        }
    }
</script>

