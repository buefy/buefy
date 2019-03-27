<template>
    <div>
        <div class="buttons">
            <a
                class="button"
                href="https://github.com/baianat/vee-validate"
                target="_blank">
                Website
            </a>
            <a
                class="button"
                href="https://baianat.github.io/vee-validate"
                target="_blank">
                Docs
            </a>
        </div>

        <Example :component="ExSimple" :code="ExSimpleCode" vertical>
            <b-message type="is-info">
                <p><strong>VeeValidate is not included in Buefy</strong>, you have to install it:</p>
                <CodeView code="npm install vee-validate" expanded/>
            </b-message>
        </Example>
    </div>
</template>

<script>
    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    export default {
        data() {
            return {
                ExSimple,
                ExSimpleCode
            }
        }
    }
</script>
