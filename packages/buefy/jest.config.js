module.exports = {
    roots: [
        '<rootDir>/src'
    ],
    moduleFileExtensions: [
        'js',
        'vue'
    ],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '.*\\.(vue)$': '@vue/vue3-jest'
    },
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@utils/(.*)$': '<rootDir>/src/utils/$1'
    },
    snapshotSerializers: [
        'jest-serializer-vue'
    ],
    setupFiles: [
        './jest-setup.js'
    ],
    coverageDirectory: './coverage/',
    collectCoverage: true,
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        customExportConditions: [
            'node',
            'node-addons'
        ],
        url: 'http://localhost/'
    }
}
