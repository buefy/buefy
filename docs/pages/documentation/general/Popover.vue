<template>
    <div class="container">
        <h1 class="title is-spaced">Popover</h1>
        <h2 class="subtitle">
            Display any content you want in a popover. Just like tooltips
            popovers can appear above (top), to the right, below (bottom) or
            to the left. Popovers can be triggered on click, hover or focus
        </h2>
        <hr>

        <div class="columns">
            <div class="column">
                <b-popover content="Some content">
                    <button class="button">Default popover</button>
                </b-popover>

                <b-popover show>
                    <p slot="content">Slot content</p>
                    <button class="button">Start visible</button>
                </b-popover>

                <b-popover placement="right">
                    <p slot="content">Slot content</p>
                    <button class="button">Appear to the right</button>
                </b-popover>

                <b-popover title="Popover Title">
                    <p slot="content">Slot content</p>
                    <button class="button">With a title</button>
                </b-popover>

                <b-popover trigger="hover">
                    <p slot="content">Slot content</p>
                    <span>Trigger on hover</span>
                </b-popover>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template1 | pre }}</code></pre>
            </div>
        </div>

        <hr>

        <h3 class="title is-spaced">Placement</h3>
        <section class="description">
            <p>The popover can be configured to showup above (top), to the right, below (bottom) or to the left of the trigger element</p>
            <p>The default is to place the popover above the trigger</p>
        </section>

        <div class="columns">
            <div class="column">
                <b-popover placement="top">
                    <p slot="content">Some content</p>
                    <button class="button">Appear above</button>
                </b-popover>

                <b-popover placement="right">
                    <p slot="content">Some content</p>
                    <button class="button">Appear to the right</button>
                </b-popover>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template2 | pre }}</code></pre>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                props: [],
                template1: `
                    <b-popover content="Some content">
                        <button class="button">Default popover</button>
                    </b-popover>

                    <b-popover show>
                        <p slot="content">Slot content</p>
                        <button class="button">Start visible</button>
                    </b-popover>

                    <b-popover placement="right">
                        <p slot="content">Slot content</p>
                        <button class="button">Appear to the right</button>
                    </b-popover>

                    <b-popover title="Popover Title">
                        <p slot="content">Slot content</p>
                        <button class="button">With a title</button>
                    </b-popover>

                    <b-popover trigger="hover">
                        <p slot="content">Slot content</p>
                        <span>Trigger on hover</span>
                    </b-popover>`,
                template2: `
                    <b-popover placement="top">
                        <p slot="content">Some content</p>
                        <button class="button">Appear above</button>
                    </b-popover>

                    <b-popover placement="right">
                        <p slot="content">Some content</p>
                        <button class="button">Appear to the right</button>
                    </b-popover>`
            }
        }
    }
</script>

<style scoped>
.description {
    margin-bottom: 2rem;
}
</style>
