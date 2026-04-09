import type { Project } from "@stackblitz/sdk";

export type StarterId = "vue" | "nuxt" | "astro";

export interface StarterExample {
    id: StarterId;
    title: string;
    subtitle: string;
    description: string;
    points: string[];
}

type StarterProject = Project & { openFile: string };

export const starterExamples: StarterExample[] = [
    {
        id: "vue",
        title: "Vue + Vite",
        subtitle: "Fast SPA setup",
        description:
            "A standard Vue 3 + Vite project with Buefy installed globally.",
        points: [
            "Vue 3 + Vite baseline",
            "Buefy plugin registration",
            "Bulma + Buefy styles included",
        ],
    },
    {
        id: "nuxt",
        title: "Nuxt",
        subtitle: "SSR-ready setup",
        description:
            "A Nuxt project with a client plugin that registers Buefy for Vue components.",
        points: [
            "Nuxt plugin registration",
            "Global Buefy stylesheet",
            "Ready for pages and layouts",
        ],
    },
    {
        id: "astro",
        title: "Astro + Vue",
        subtitle: "Content-first with islands",
        description:
            "An Astro project using the Vue integration, with a hydrated Buefy component example.",
        points: [
            "Astro Vue integration enabled",
            "Buefy component in a Vue island",
            "Bulma + Buefy styles wired in",
        ],
    },
];

function jsonFile(content: object): string {
    return `${JSON.stringify(content, null, 2)}\n`;
}

export function createStarterProject(id: StarterId): StarterProject {
    switch (id) {
        case "vue":
            return createVueStarterProject();
        case "nuxt":
            return createNuxtStarterProject();
        case "astro":
            return createAstroStarterProject();
    }
}

function createVueStarterProject(): StarterProject {
    return {
        title: "Buefy + Vue Starter",
        description: "Starter project for using Buefy with Vue 3 and Vite.",
        template: "node",
        openFile: "src/main.ts",
        files: {
            "package.json": jsonFile({
                name: "buefy-vue-starter",
                private: true,
                version: "0.0.0",
                type: "module",
                scripts: {
                    dev: "vite",
                    build: "vite build",
                    preview: "vite preview",
                },
                dependencies: {
                    buefy: "latest",
                    bulma: "latest",
                    vue: "latest",
                },
                devDependencies: {
                    "@vitejs/plugin-vue": "latest",
                    typescript: "latest",
                    vite: "latest",
                },
            }),
            "index.html": `<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Buefy + Vue</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
            "vite.config.ts": `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
`,
            "src/main.ts": `import { createApp } from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/css/buefy.css'

import App from './App.vue'

createApp(App).use(Buefy).mount('#app')
`,
            "src/App.vue": `<template>
  <section style="padding: 2rem; max-width: 760px; margin: 0 auto;">
    <h1 class="title">Buefy + Vue Starter</h1>
    <p class="content">Your project is ready. Replace this page and start building.</p>
    <b-button type="is-primary">Buefy button</b-button>
  </section>
</template>
`,
        },
    };
}

function createNuxtStarterProject(): StarterProject {
    return {
        title: "Buefy + Nuxt Starter",
        description: "Starter project for using Buefy with Nuxt.",
        template: "node",
        openFile: "plugins/buefy.client.ts",
        files: {
            "package.json": jsonFile({
                name: "buefy-nuxt-starter",
                private: true,
                version: "0.0.0",
                scripts: {
                    dev: "nuxt dev",
                    build: "nuxt build",
                    preview: "nuxt preview",
                },
                dependencies: {
                    buefy: "latest",
                    bulma: "latest",
                    nuxt: "latest",
                },
            }),
            "nuxt.config.ts": `export default defineNuxtConfig({
  css: ['buefy/dist/css/buefy.css']
})
`,
            "plugins/buefy.client.ts": `import { defineNuxtPlugin } from '#app'
import Buefy from 'buefy'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Buefy)
})
`,
            "app.vue": `<template>
  <main style="padding: 2rem; max-width: 760px; margin: 0 auto;">
    <h1 class="title">Buefy + Nuxt Starter</h1>
    <p class="content">Nuxt plugin is already configured for Buefy.</p>
    <b-button type="is-primary">Buefy button</b-button>
  </main>
</template>
`,
        },
    };
}

function createAstroStarterProject(): StarterProject {
    return {
        title: "Buefy + Astro Starter",
        description:
            "Starter project for using Buefy in Astro with Vue islands.",
        template: "node",
        openFile: "src/pages/index.astro",
        files: {
            "package.json": jsonFile({
                name: "buefy-astro-starter",
                private: true,
                version: "0.0.0",
                scripts: {
                    dev: "astro dev",
                    build: "astro build",
                    preview: "astro preview",
                },
                dependencies: {
                    "@astrojs/vue": "latest",
                    astro: "latest",
                    buefy: "latest",
                    bulma: "latest",
                    vue: "latest",
                },
            }),
            "astro.config.mjs": `import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'

export default defineConfig({
  integrations: [vue()]
})
`,
            "src/layouts/Layout.astro": `---
import 'buefy/dist/css/buefy.css'
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Buefy + Astro</title>
  </head>
  <body>
    <slot />
  </body>
</html>
`,
            "src/components/ButtonDemo.vue": `<template>
  <section style="padding: 2rem; max-width: 760px; margin: 0 auto;">
    <h1 class="title">Buefy + Astro Starter</h1>
    <p class="content">Vue island with a locally registered Buefy component.</p>
    <b-button type="is-primary">Buefy button</b-button>
  </section>
</template>

<script>
import { BButton } from 'buefy'

export default {
  components: {
    BButton
  }
}
</script>
`,
            "src/pages/index.astro": `---
import Layout from '../layouts/Layout.astro'
import ButtonDemo from '../components/ButtonDemo.vue'
---

<Layout>
  <ButtonDemo client:load />
</Layout>
`,
        },
    };
}
