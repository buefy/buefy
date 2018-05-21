<template>
    <div class="default-container">
        <h1 class="title is-spaced">Cleave.js </h1>
        <h2 class="subtitle">Format input text while you type — as a Vue directive</h2>
        <div class="buttons">
            <b-button
                text="Website"
                href="https://nosir.github.io/cleave.js"
                target="_blank"
            />

            <b-button
                text="Docs"
                href="https://github.com/nosir/cleave.js/blob/master/doc/options.md"
                target="_blank"
            />
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
