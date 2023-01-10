import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BFieldBody from '@components/field/FieldBody'
import BField from '@components/field/Field'
import BInput from '@components/input/Input'

const localVue = createLocalVue()
localVue.component('b-field', BField)

describe('BFieldBody', () => {
    it('is called', () => {
        const wrapper = shallowMount(BFieldBody, {
            slots: {
                default: 'content'
            }
        })
        expect(wrapper.name()).toBe('BFieldBody')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(BFieldBody, {
            slots: {
                default: 'content'
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should render the text when the child is a text', () => {
        const text = 'text'
        const wrapper = shallowMount(BFieldBody, {
            slots: {
                default: text
            }
        })
        expect(wrapper.text()).toBe(text)
    })

    describe('when child is an element', () => {
        it('should wrap the element in a b-field', () => {
            const wrapper = mount(BFieldBody, {
                slots: {
                    default: BInput
                },
                localVue
            })
            expect(wrapper.exists(BField)).toBe(true)
        })

        it('should pass type prop to the b-field element', () => {
            const type = 'is-success'
            const wrapper = mount(BFieldBody, {
                slots: {
                    default: BInput
                },
                propsData: {
                    type
                },
                localVue
            })
            expect(wrapper.find(BField).find('input').classes()).toContain(type)
        })

        it('should render the message when message prop is passed', () => {
            const message = 'some message yo'
            const type = 'is-danger'
            const wrapper = mount(BFieldBody, {
                slots: {
                    default: BInput
                },
                propsData: {
                    type,
                    message
                },
                localVue
            })
            expect(wrapper.find('p.help').classes()).toContain(type)
            expect(wrapper.find('p.help').text()).toBe(message)
        })
    })
})
