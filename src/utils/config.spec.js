import config, { setOptions } from '@utils/config'

describe('Config', () => {
    describe('Test options', () => {
        test('defaultToastDuration option should be 1000', () => {
            setOptions(Object.assign(config, {defaultToastDuration: 1000}))
            expect(config.defaultToastDuration).toBe(1000)
        })
    })
})
