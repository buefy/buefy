<template>
    <div>
        <div class="content">
            <p>
                Buefy inherits Bulma's complete typography system — a set of utility classes, CSS
                custom properties, and a consistent type scale. This guide covers how to use it
                effectively in Vue 3, how to load and apply custom fonts, and how to extend the
                system with fluid and responsive sizing.
            </p>
        </div>

        <!-- ─── 1. Title & Subtitle Classes ─────────────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">1</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Title &amp; Subtitle Classes</h3>
                <p class="content">
                    Bulma's <code>.title</code> and <code>.subtitle</code> classes create a clear,
                    semantic heading hierarchy. Pair them with <code>.is-1</code>–<code>.is-6</code>
                    size modifiers. When placed next to each other, Bulma automatically collapses
                    the margin between them — add <code>.is-spaced</code> to the title to keep them
                    separate.
                </p>

                <Example :component="ExTitles" :code="ExTitlesCode" title="Titles and Subtitles" vertical />

                <CodeView :code="preformat(titleSubtitleExample)" lang="html" expanded />

                <b-message type="is-info">
                    <div class="content">
                        <p>
                            <strong>Semantic tip:</strong> prefer semantic HTML elements
                            (<code>&lt;h1&gt;</code>–<code>&lt;h6&gt;</code>) with Bulma classes
                            rather than <code>&lt;p&gt;</code> — it keeps your document outline correct
                            for accessibility and SEO while still applying the visual style you want.
                        </p>
                    </div>
                </b-message>
            </div>
        </div>

        <!-- ─── 2. Font Size Helpers ─────────────────────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">2</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Font Size Helpers</h3>
                <p class="content">
                    <code>.is-size-1</code> through <code>.is-size-7</code> apply Bulma's seven-step
                    type scale to <em>any</em> element — not just headings. They also have responsive
                    variants: <code>.is-size-4-mobile</code>, <code>.is-size-2-tablet</code>, etc.
                </p>

                <Example :component="ExSizes" :code="ExSizesCode" title="Size Helpers" vertical />

                <CodeView :code="preformat(sizeHelpersExample)" lang="html" expanded />
            </div>
        </div>

        <!-- ─── 3. Font Weights ───────────────────────────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">3</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Font Weights</h3>
                <p class="content">
                    Bulma exposes five weight utilities. They map to numeric values you can
                    override via CSS variables:
                </p>

                <Example :component="ExWeights" :code="ExWeightsCode" title="Font Weights" vertical />

                <CodeView :code="preformat(weightExample)" lang="html" expanded />

                <b-message type="is-warning">
                    <div class="content">
                        <p>
                            <strong>Font-loading caveat:</strong> helper classes only produce the
                            correct visual weight if the loaded font provides that variant.
                            DM Sans (used on this site) supports weights 100–900 as a variable font —
                            all five utilities will render correctly with no extra font files.
                        </p>
                    </div>
                </b-message>
            </div>
        </div>

        <!-- ─── 4. Alignment & Transformation ───────────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">4</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Alignment &amp; Transformation</h3>
                <p class="content">
                    Combine alignment helpers (<code>.has-text-left</code>,
                    <code>.has-text-centered</code>, <code>.has-text-right</code>,
                    <code>.has-text-justified</code>) with transformation and decoration helpers.
                    All of these have responsive breakpoint variants (<code>-mobile</code>,
                    <code>-tablet</code>, <code>-desktop</code>).
                </p>

                <Example :component="ExAlignment" :code="ExAlignmentCode" title="Alignment &amp; Transformation" vertical />

                <CodeView :code="preformat(alignmentExample)" lang="html" expanded />
            </div>
        </div>

        <!-- ─── 5. Text Colors ────────────────────────────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">5</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Text Colors</h3>
                <p class="content">
                    <code>.has-text-*</code> classes apply semantic and neutral text colors. They
                    respect Bulma's CSS variable system so a theme change at <code>:root</code>
                    automatically propagates.
                </p>

                <Example :component="ExTextColors" :code="ExTextColorsCode" title="Text Colors" vertical />
            </div>
        </div>

        <!-- ─── 6. Custom Fonts ───────────────────────────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">6</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Custom Fonts in Vue 3</h3>
                <p class="content">
                    The recommended approach is to self-host font files as
                    <code>.woff2</code> in <code>public/fonts/</code> and declare them with
                    <code>@font-face</code> in a dedicated SCSS file (e.g.
                    <code>_fonts.scss</code>). This avoids external network requests, respects
                    privacy regulations, and eliminates the render-blocking Google Fonts
                    <code>&lt;link&gt;</code>.
                </p>
                <CodeView :code="preformat(fontFaceLocalExample)" lang="scss" expanded />

                <p class="content mt-4">
                    Then override Bulma's font-family variables to activate your custom fonts
                    across all components:
                </p>
                <CodeView :code="preformat(fontFamilyExample)" lang="css" expanded />

                <b-message type="is-success">
                    <div class="content">
                        <p>
                            <strong>Variable fonts</strong> — fonts like DM Sans ship as a single
                            <code>.woff2</code> file covering a weight range (e.g. 100–900).
                            Declare the range in <code>font-weight</code> and the browser picks the
                            exact weight automatically. No need to download separate files per weight.
                        </p>
                    </div>
                </b-message>
            </div>
        </div>

        <!-- ─── 7. Fluid / Responsive Typography ─────────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">7</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Fluid &amp; Responsive Typography</h3>
                <p class="content">
                    <code>clamp(min, preferred, max)</code> creates type that scales smoothly between
                    a minimum and maximum size with no JavaScript and no media-query breakpoints. Use
                    CSS custom properties for the scale so it's easy to tune from one place:
                </p>
                <CodeView :code="preformat(fluidTypographyExample)" lang="css" expanded />

                <b-message type="is-info">
                    <div class="content">
                        <p>
                            The preferred value is a <code>vw</code>-based expression (e.g.
                            <code>5vw</code>). At viewport widths between the breakpoints where
                            <code>min</code> and <code>max</code> would be hit, the size scales
                            linearly. Choose values so the transition feels natural — typically
                            a 2–3× size ratio across the mobile-to-desktop range.
                        </p>
                    </div>
                </b-message>
            </div>
        </div>

        <!-- ─── 8. Line-Height & the content Class ───────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">8</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Line-Height &amp; the <code>.content</code> Class</h3>
                <p class="content">
                    For long-form prose (documentation, blog posts, marketing copy), wrap your
                    markup in <code>.content</code>. It applies comfortable line-height, margin,
                    and styled lists, blockquotes, and tables automatically.
                </p>
                <CodeView :code="preformat(lineHeightExample)" lang="html" expanded />
            </div>
        </div>

        <!-- ─── 9. Dark Mode Text ─────────────────────────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">9</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Dark Mode Text Colors</h3>
                <p class="content">
                    Maintain two text-color tokens — one for light surfaces and one for dark — and
                    swap them via a <code>data-theme</code> attribute or class.
                    Never hard-code colors: always reference a CSS variable so the swap is
                    effortless.
                </p>
                <CodeView :code="preformat(darkModeTypographyExample)" lang="css" expanded />
            </div>
        </div>

        <!-- ─── 10. Using in Vue Components ──────────────────────────────────── -->
        <div class="media">
            <div class="media-left">
                <h3 class="subtitle">10</h3>
            </div>
            <div class="media-content">
                <h3 class="subtitle">Applying Typography in Vue Components</h3>
                <p class="content">
                    Combine Bulma utility classes in the template with minimal scoped CSS for
                    component-specific overrides. Keep the scoped block small — rely on Bulma's
                    utilities rather than re-implementing them:
                </p>
                <CodeView :code="preformat(vueComponentExample)" lang="html" expanded />

                <b-message type="is-success">
                    <div class="content">
                        <ul>
                            <li>
                                Use Bulma classes (<code>.title</code>, <code>.content</code>,
                                <code>.has-text-*</code>) for layout and color — they're covered
                                by the global theme.
                            </li>
                            <li>
                                Use scoped CSS only for structural tweaks unique to this component
                                (e.g. overriding a margin inside a card).
                            </li>
                            <li>
                                Avoid inline <code>style</code> for colors — always go through a
                                CSS variable so dark mode and theming work automatically.
                            </li>
                        </ul>
                    </div>
                </b-message>
            </div>
        </div>

        <!-- ─── Reference Tables ─────────────────────────────────────────────── -->
        <div class="content mt-6">
            <h4 class="title is-4">CSS Variable Reference</h4>
            <p>
                All Bulma typography variables that can be overridden. Set them on
                <code>:root</code> or any ancestor selector to apply changes globally or
                within a scoped section.
            </p>
        </div>

        <b-tabs>
            <b-tab-item label="Type Scale">
                <b-table
                    :mobile-cards="false"
                    :data="typeScaleVariables"
                    :columns="referenceColumns"
                />
            </b-tab-item>
            <b-tab-item label="Font Weight">
                <b-table
                    :mobile-cards="false"
                    :data="fontWeightVariables"
                    :columns="referenceColumns"
                />
            </b-tab-item>
            <b-tab-item label="Font Family">
                <b-table
                    :mobile-cards="false"
                    :data="fontFamilyVariables"
                    :columns="referenceColumns"
                />
            </b-tab-item>
            <b-tab-item label="Line Height">
                <b-table
                    :mobile-cards="false"
                    :data="lineHeightVariables"
                    :columns="referenceColumns"
                />
            </b-tab-item>
        </b-tabs>

        <b-message type="is-info" class="mt-4">
            <div class="content">
                <p>
                    For Bulma's complete typography documentation and all available helper classes,
                    see the
                    <a href="https://bulma.io/documentation/helpers/typography-helpers/" target="_blank" rel="noopener">
                        Bulma Typography Helpers
                    </a>
                    and
                    <a href="https://bulma.io/documentation/elements/title/" target="_blank" rel="noopener">
                        Bulma Title element
                    </a>
                    documentation.
                </p>
            </div>
        </b-message>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { BMessage, BTabs, BTabItem, BTable } from 'buefy'

import CodeView from '@/components/CodeView.vue'
import Example from '@/components/Example.vue'
import { preformat, shallowFields } from '@/utils'

import {
    titleSubtitleExample,
    fontFamilyExample,
    fontFaceLocalExample,
    sizeHelpersExample,
    weightExample,
    alignmentExample,
    fluidTypographyExample,
    darkModeTypographyExample,
    vueComponentExample,
    lineHeightExample
} from './usage/typography'

import {
    typeScaleVariables,
    fontWeightVariables,
    fontFamilyVariables,
    lineHeightVariables
} from './variables/typography'

import ExTitles from './examples/ExTitles.vue'
import ExTitlesCode from './examples/ExTitles.vue?raw'

import ExSizes from './examples/ExSizes.vue'
import ExSizesCode from './examples/ExSizes.vue?raw'

import ExWeights from './examples/ExWeights.vue'
import ExWeightsCode from './examples/ExWeights.vue?raw'

import ExAlignment from './examples/ExAlignment.vue'
import ExAlignmentCode from './examples/ExAlignment.vue?raw'

import ExTextColors from './examples/ExTextColors.vue'
import ExTextColorsCode from './examples/ExTextColors.vue?raw'

export default defineComponent({
    components: {
        BMessage,
        BTabs,
        BTabItem,
        BTable,
        CodeView,
        Example,
    },
    data() {
        return {
            referenceColumns: [
                { label: 'Variable', field: 'css', renderHtml: true },
                { label: 'Description', field: 'name', renderHtml: true },
                { label: 'Default', field: 'default', renderHtml: true },
            ],
            titleSubtitleExample,
            fontFamilyExample,
            fontFaceLocalExample,
            sizeHelpersExample,
            weightExample,
            alignmentExample,
            fluidTypographyExample,
            darkModeTypographyExample,
            vueComponentExample,
            lineHeightExample,
            typeScaleVariables,
            fontWeightVariables,
            fontFamilyVariables,
            lineHeightVariables,
            ExTitlesCode,
            ExSizesCode,
            ExWeightsCode,
            ExAlignmentCode,
            ExTextColorsCode,
            ...shallowFields({
                ExTitles,
                ExSizes,
                ExWeights,
                ExAlignment,
                ExTextColors,
            }),
        }
    },
    methods: { preformat },
})
</script>
