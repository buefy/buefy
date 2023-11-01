// http://eslint.org/docs/user-guide/configuring

module.exports = {
    env: {
        jest: true,
        browser: true
    },
    extends: [
        'standard',
        'plugin:vue/vue3-recommended'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
    // from eslint-config-buefy {
    // eslint
    // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        indent: ['error', 4, { SwitchCase: 1 }],
        'space-before-function-paren': ['error', {
            anonymous: 'always',
            named: 'never'
        }],
        'max-len': ['error', {
            code: 100,
            tabWidth: 4,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true
        }],
        'no-console': ['warn'],
        'arrow-parens': ['error', 'always'],
        'vue/html-indent': ['error', 4],
        'vue/max-attributes-per-line': [2, {
            singleline: 2,
            multiline: 1
        }],

        // vue
        'vue/require-v-for-key': ['warn'],
        'vue/order-in-components': ['error', {
            order: [
                'el',
                'name',
                'parent',
                'functional',
                ['delimiters', 'comments'],
                ['components', 'directives', 'filters'],
                'extends',
                'mixins',
                'inheritAttrs',
                'model',
                ['props', 'propsData'],
                'data',
                'computed',
                'watch',
                'methods',
                'LIFECYCLE_HOOKS',
                ['template', 'render'],
                'renderError'
            ]
        }],
        'vue/no-reserved-keys': 0,
        'vue/require-default-prop': 0,

        // import
        'import/no-webpack-loader-syntax': 0,
        // } from eslint-config-buefy

        'vue/attributes-order': 'off',
        'vue/html-self-closing': ['error', {
            html: {
                void: 'never',
                normal: 'always',
                component: 'always'
            },
            svg: 'always',
            math: 'always'
        }],
        'max-depth': 'off',

        'vue/multi-word-component-names': ['warn']
    }
}
