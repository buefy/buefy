<template>
    <section class="example-section">
        <p class="title is-4">{{ title }}</p>
        <div class="content">
            <slot/>
        </div>

        <div
            v-if="code && component"
            class="example"
            :class="{ 'is-vertical': vertical }">
            <div class="button-container">
                <CodepenEdit :code="code" :title="title"/>
            </div>
            <div class="example-component" :class="{ 'is-paddingless': paddingless }">
                <component :is="component"/>
            </div>
            <CodeView
                :code="code"
                bordered
                codepen
            />
        </div>
        <hr class="is-medium">
    </section>
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
            title: String,
            paddingless: Boolean,
            vertical: Boolean
        }
    }
</script>
