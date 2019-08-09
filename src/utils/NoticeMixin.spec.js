import { shallowMount } from '@vue/test-utils'
import NoticeMixin from '@utils/NoticeMixin'

let wrapper

describe('NoticeMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = jest.fn()
    beforeEach(() => {
        const component = {
            template: '<div class="b-component"></div>'
        }
        wrapper = shallowMount(component, {
            attachToDocument: true,
            mixins: [NoticeMixin]
        })
    })

    it('is active', () => {
        expect(wrapper.vm.isActive).toBeTruthy()
    })

    it('returns correct transition depending on position', () => {
        const topTransition = {
            enter: 'fadeInDown',
            leave: 'fadeOut'
        }
        const bottomTransition = {
            enter: 'fadeInUp',
            leave: 'fadeOut'
        }
        const expected = {
            'is-top': topTransition,
            'is-top-right': topTransition,
            'is-top-left': topTransition,
            'is-bottom': bottomTransition,
            'is-bottom-right': bottomTransition,
            'is-bottom-left': bottomTransition
        }
        for (let [key, value] of Object.entries(expected)) {
            wrapper.setProps({position: key})
            expect(wrapper.vm.transition).toEqual(value)
        }

        expect(wrapper.vm.isActive).toBeTruthy()
    })

    it('reset isActive on close', () => {
        wrapper.vm.close()
        expect(wrapper.vm.isActive).toBeFalsy()
    })
})
