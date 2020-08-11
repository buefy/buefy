<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode" vertical/>

        <Example :component="ExWebp" :code="ExWebpCode" title="webp" vertical>
            <p>You can use the new webp format for your image. Do not forget to set a fallback for browsers that do not supports this format yet.</p>
            <p>
                If you specify only an extension as a fallback, only the extension will be replaced. It is useful if your image is at the same location and have the same filename.
                You can also specify a full URL as a fallback.
            </p>
            <p>You will see the same pictures twice in browsers that do support webp format. The second image will be different in browsers that do not support it.</p>
        </Example>

        <Example :component="ExPlaceholder" :code="ExPlaceholderCode" title="Placeholder" vertical>
            <p>
                You can use a placeholder image that will be loaded at start and will be displayed until the <code>src</code> gets loaded.
                If you reload this page, you will see a blurred Buefy logo appear upon <code>src</code> is loaded.
            </p>
            <p>Can be useful if you want to use the LQIP technique for example.</p>
        </Example>

        <Example :component="ExSrcset" :code="ExSrcsetCode" title="srcset" vertical>
            <p>
                You can use <code>srcset</code> attribute or the <code>srcsetSizes</code> prop to generate one for you.
            </p>
            <p>
                When using <code>srcsetSizes</code>, it will generate a string like <code>"`${srcFilename}-${size}.${srcExt} ${size}w`"</code> for each sizes. You can control this format using the <code>srcsetFormatter</code> prop
            </p>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/image'
    import variables from './variables/image'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'
    import ExWebp from './examples/ExWebp'
    import ExWebpCode from '!!raw-loader!./examples/ExWebp'
    import ExPlaceholder from './examples/ExPlaceholder'
    import ExPlaceholderCode from '!!raw-loader!./examples/ExPlaceholder'
    import ExSrcset from './examples/ExSrcset'
    import ExSrcsetCode from '!!raw-loader!./examples/ExSrcset'

    export default {
        data() {
            return {
                api,
                variables,
                ExSimple,
                ExSimpleCode,
                ExWebp,
                ExWebpCode,
                ExPlaceholder,
                ExPlaceholderCode,
                ExSrcset,
                ExSrcsetCode,
            }
        }
    }
</script>
