export default [
    {
        question: 'Does Buefy support Vue 2?',
        answer: 'No. Buefy 3.x targets Vue 3 exclusively. If you need Vue 2 support, use Buefy 0.9.x (legacy, unmaintained).'
    },
    {
        question: 'How do I install Buefy?',
        answer: 'Install via your package manager (npm install buefy, yarn add buefy, etc.), then register the plugin in your Vue app:\n\nimport { createApp } from "vue"\nimport Buefy from "buefy"\nimport "buefy/dist/buefy.css"\ncreateApp(App).use(Buefy).mount("#app")\n\nIndividual components can also be imported tree-shakably directly from "buefy".'
    },
    {
        question: 'How do I customize Buefy\'s styles?',
        answer: 'Buefy is built on Bulma CSS variables. Override variables in your SCSS before importing Buefy\'s stylesheet, or use CSS custom properties at runtime. See the Customization page in the docs for a full variable reference.'
    }
]
