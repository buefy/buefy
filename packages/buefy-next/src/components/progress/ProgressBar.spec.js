import { mount } from '@vue/test-utils'
import { PROGRESS_INJECTION_KEY } from '@components/progress/Progress'
import BProgressBar from '@components/progress/ProgressBar'

let wrapper
const BProgress = {
    template: '<div><slot /></div>',
    provide() {
        return {
            [PROGRESS_INJECTION_KEY]: this
        }
    },
    data() {
        return { max: 100 }
    }
}

describe('BProgressBar', () => {
    beforeEach(() => {
        wrapper = mount(BProgress, {
            slots: {
                default: '<BProgressBar :value="20" />'
            },
            global: {
                components: { BProgressBar }
            }
        }).findComponent(BProgressBar)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BProgressBar')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should calculate bar width', () => {
        expect(wrapper.vm.barWidth).toBe('20%')
    })
})
