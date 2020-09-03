import { useFakeTimers } from 'sinon'
import debounce from './debounce'

let clock
let func
beforeEach(() => {
    clock = useFakeTimers()
    func = jest.fn()
})

afterEach(() => {
    clock.restore()
})

describe('debounce', () => {
    it('is not called immediately', () => {
        const debouncedFunc = debounce(func, 1000)
        debouncedFunc()
        expect(func).toHaveBeenCalledTimes(0)
    })

    it('is not called upon several rapid calls', () => {
        const debouncedFunc = debounce(func, 1000)
        for (let i = 0; i < 10; i++) {
            clock.tick(500)
            debouncedFunc()
        }
        expect(func).toHaveBeenCalledTimes(0)
    })

    it('is called after debounce time', () => {
        const debouncedFunc = debounce(func, 1000)
        debouncedFunc()
        clock.tick(1000)
        expect(func).toHaveBeenCalledTimes(1)
    })

    it('is called immediately if immediate is true', () => {
        const debouncedFunc = debounce(func, 1000, true)
        debouncedFunc()
        expect(func).toHaveBeenCalledTimes(1)
    })

    it('is called once upon several rapid calls if immediate is true', () => {
        const debouncedFunc = debounce(func, 1000, true)
        for (let i = 0; i < 10; i++) {
            clock.tick(500)
            debouncedFunc()
        }
        expect(func).toHaveBeenCalledTimes(1)
    })
})
