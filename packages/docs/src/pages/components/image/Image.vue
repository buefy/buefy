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
                You can reload the page to see what is happening.
            </p>
            <p>
                In the first example, you will see a blurred Buefy logo appear upon <code>src</code> is loaded.<br>
                In the second example, you will see the lqip effect while a smaller blurred version of the image upon <code>src</code> is loaded.<br>
                In the third example, you will see Buefy skeleton appear upon <code>src</code> is loaded.
            </p>
        </Example>

        <Example :component="ExSrcset" :code="ExSrcsetCode" title="srcset" vertical>
            <p>
                You can use <code>srcset</code> attribute or the <code>srcsetSizes</code> prop to generate one for you.
            </p>
            <p>
                When using <code>srcsetSizes</code>, it will generate a string like <code>"`${srcFilename}-${size}.${srcExt} ${size}w`"</code> for each sizes. You can control this format using the <code>srcsetFormatter</code> prop
            </p>
        </Example>

        <Example :component="ExError" :code="ExErrorCode" title="Fallback on error" vertical>
            <p>
                You can use <code>alt</code> to display an alternative text if the <code>src</code> fails to load.
            </p>
            <p>
                You can also use <code>src-fallback</code> to display another image if the original fails to load.
            </p>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/image'
    import variables from './variables/image'
    import { shallowFields } from '@/utils'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from './examples/ExSimple.vue?raw'
    import ExWebp from './examples/ExWebp'
    import ExWebpCode from './examples/ExWebp.vue?raw'
    import ExPlaceholder from './examples/ExPlaceholder'
    import ExPlaceholderCode from './examples/ExPlaceholder.vue?raw'
    import ExSrcset from './examples/ExSrcset'
    import ExSrcsetCode from './examples/ExSrcset.vue?raw'
    import ExError from './examples/ExError'
    import ExErrorCode from './examples/ExError.vue?raw'

    export default {
        data() {
            return {
                api,
                variables,
                ...shallowFields({
                    ExSimple,
                    ExWebp,
                    ExPlaceholder,
                    ExSrcset,
                    ExError
                }),
                ExSimpleCode,
                ExWebpCode,
                ExPlaceholderCode,
                ExSrcsetCode,
                ExErrorCode
            }
        }
    }
</script>
