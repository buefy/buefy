<template>
    <section class="example-section">
        <p :id="`${slugifiedTitle}`" class="title is-4">
            <router-link :to="`#${slugifiedTitle}`">#</router-link>
            {{ title }}
        </p>
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
    },
    computed: {
        slugifiedTitle() {
            return this.title.toLowerCase()
                .replace(/\s+/g, '-') // Replace spaces with -
                .replace(/[^\w-]+/g, '') // Remove all non-word chars
                .replace(/--+/g, '-') // Replace multiple - with single -
                .replace(/^-+/, '') // Trim - from start of text
                .replace(/-+$/, '') // Trim - from end of text
        }
    }
}
</script>
