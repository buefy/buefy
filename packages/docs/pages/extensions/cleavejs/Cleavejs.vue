<template>
    <div>
        <div class="buttons">
            <a
                class="button"
                href="https://nosir.github.io/cleave.js"
                target="_blank">
                Website
            </a>
            <a
                class="button"
                href="https://github.com/nosir/cleave.js/blob/master/doc/options.md"
                target="_blank">
                Docs
            </a>
        </div>

        <Example :component="ExFormat" :code="ExFormatCode" vertical>
            <b-message type="is-info">
                <p><strong>Cleave.js is not included in Buefy</strong>, you have to install it:</p>
                <CodeView code="npm install cleave.js" expanded/>
            </b-message>
        </Example>
    </div>
</template>

<script>
    import ExFormat from './examples/ExFormat'
    import ExFormatCode from '!!raw-loader!./examples/ExFormat'

    export default {
        data() {
            return {
                ExFormat,
                ExFormatCode
            }
        }
    }
</script>
