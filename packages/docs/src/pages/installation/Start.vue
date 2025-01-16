<template>
    <div>
        <p :id="slugifyTitle('Icons')" class="title">
            <router-link :to="`#${slugifyTitle('Icons')}`">#</router-link>
            Icons
        </p>
        <p class="subtitle">Several components use icons, you might want to add a pack</p>
        <CodeView title="Material Design Icons CDN" :code="materialIcons" expanded />
        <CodeView title="Font Awesome 5 CDN" :code="fontAwesome5" expanded />
        <div class="content">
            <blockquote>
                <p>Refer to its documentation for latest release / CDN.</p>
                <p>Please note that Buefy doesn't include icon packs. You have to import it as you prefer (NPM, CDN,
                    etc.).</p>
                <p>
                    If you opted for Font Awesome, you should update your
                    <router-link to="/documentation/constructor-options">constructor options</router-link>.
                </p>
            </blockquote>
        </div>

        <hr>

        <b-message type="is-warning" size="is-medium">
            For any installation and usage method, you need
            <strong><a href="https://vuejs.org" target="_blank">Vue.js</a> version 2.6+</strong>.
            <strong><a href="https://github.com/ntohq/buefy-next/" target="_blank">Vue.js version 3+ is supported here
                    (official fork in development).</a></strong>
        </b-message>

        <div class="media">
            <div class="media-left">
                <p :id="slugifyTitle('NPM or Yarn')" class="title">
                    <router-link :to="`#${slugifyTitle('NPM or Yarn')}`">#</router-link>
                    1
                </p>
            </div>
            <div class="media-content">
                <p class="title">NPM or Yarn <em>(recommended)</em></p>
                <p class="subtitle is-spaced">After creating a project with vue-cli or custom-made (usually Webpack)</p>
                <p class="title is-4">Installation</p>
                <CodeView code="npm install buefy" lang="bash" expanded />

                <hr>

                <div class="title is-4">Usage</div>
                <b-message type="is-success">
                    <div class="content">
                        Even though this is going to import <strong>ALL</strong> components to your application,
                        Buefy full bundle is optimized and still pretty small:
                        <ul>
                            <li><strong>script</strong> is <strong>48KB</strong> min+gzip</li>
                            <li><strong>style</strong> is <strong>39KB</strong> min+gzip (with bulma included)</li>
                        </ul>
                    </div>
                </b-message>
                <CodeView title="Full bundle" :code="preformat(importingBundle)" lang="javascript" expanded />
                <CodeView title="Individual components as Vue plugins"
                    :code="preformat(importingComponentsAsVuePlugins)" lang="javascript" expanded />
                <b-message type="is-info">
                    To include individual styles, see <router-link
                        to="/documentation/customization">Customization</router-link>
                    section.
                </b-message>
            </div>
        </div>

        <div class="media">
            <div class="media-left">
                <p :id="slugifyTitle('Standalone')" class="title">
                    <router-link :to="`#${slugifyTitle('Standalone')}`">#</router-link>
                    2
                </p>
            </div>
            <div class="media-content">
                <p class="title">Standalone</p>
                <p class="subtitle is-spaced">Using CDN or downloading files to serve local</p>
                <p class="title is-4">Installation</p>
                <div class="content">
                    <p>Just download or use these as CDN:</p>
                    <ul>
                        <li>Script: <a href="https://unpkg.com/buefy/dist/buefy.min.js"
                                target="_blank">https://unpkg.com/buefy/dist/buefy.min.js</a></li>
                        <li>Style: <a href="https://unpkg.com/buefy/dist/buefy.min.css"
                                target="_blank">https://unpkg.com/buefy/dist/buefy.min.css</a></li>
                    </ul>
                </div>

                <hr>

                <p class="title is-4">Usage example</p>
                <CodeView :code="preformat(importingCDNHtml)" expanded />
            </div>
        </div>

        <hr>

        <div class="media">
            <div class="media-left">
                <p :id="slugifyTitle('Nuxt.js')" class="title">
                    <router-link :to="`#${slugifyTitle('Nuxt.js')}`">#</router-link>
                    3
                </p>
            </div>
            <div class="media-content">
                <p class="title">Nuxt.js</p>
                <p class="subtitle is-spaced">Registering @ntohq/buefy-next as a plugin in Nuxt.js</p>
                <p class="title is-4">Installation</p>
                <CodeView :code="preformat(installNuxtBuefy)" lang="bash" expanded />

                <p class="title is-4">Usage</p>
                <p class="content">
                    Add <a href="https://www.npmjs.com/package/@ntohq/buefy-next">@ntohq/buefy-next</a> to
                    <code>plugins/buefy.js</code>:
                </p>
                <CodeView :code="preformat(importingNuxtBuefy)" lang="javascript" expanded />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    import { BMessage } from '@ntohq/buefy-next'

    import CodeView from '@/components/CodeView.vue'
    import { preformat } from '@/utils'

    import {
        fontAwesome5,
        importingBundle,
        importingCDNHtml,
        importingComponentsAsVuePlugins,
        importingNuxtBuefy,
        importingSSR,
        installNuxtBuefy,
        materialIcons
    } from './usage/start'

    export default defineComponent({
        components: {
            BMessage,
            CodeView
        },
        data() {
            return {
                importingBundle,
                importingComponentsAsVuePlugins,
                importingSSR,
                installNuxtBuefy,
                importingNuxtBuefy,
                importingCDNHtml,
                materialIcons,
                fontAwesome5
            }
        },
        methods: {
            preformat,
            slugifyTitle(title: string) {
                if (!title) return ''
                return title.toLowerCase()
                    .replace(/\s+/g, '-') // Replace spaces with -
                    .replace(/[^\w-]+/g, '') // Remove all non-word chars
                    .replace(/--+/g, '-') // Replace multiple - with single -
                    .replace(/^-+/, '') // Trim - from start of text
                    .replace(/-+$/, '') // Trim - from end of text
            }
        }
    })
</script>
