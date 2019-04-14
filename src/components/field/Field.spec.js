import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BField from '@components/field/Field'
import BFieldBody from '@components/field/FieldBody'
import BInput from '@components/input/Input'

const localVue = createLocalVue()
localVue.component('b-field', BField)
localVue.component('b-field-body', BFieldBody)
localVue.component('b-input', BInput)

describe('BField', () => {
    it('is called', () => {
        const wrapper = shallowMount(BField)
        expect(wrapper.name()).toBe('BField')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('sets fieldLabelSize to "is-normal" when horizontal==true and input elements are inside', () => {
        const wrapper = mount(BField, {
            localVue,
            propsData: { horizontal: true },
            slots: { default: [BInput] }
        })

        expect(wrapper.vm._data).toEqual(expect.objectContaining({fieldLabelSize: 'is-normal'}))
    })

    describe('class names for the root div.field', () => {
        it('contains "is-expanded" when prop "expanded" is set', () => {
            const wrapper = shallowMount(BField, { propsData: { expanded: true } })
            expect(wrapper.find('.field').classes()).toContain('is-expanded')
        })

        it('contains "is-grouped-multiline" when prop "groupMultiline" is set', () => {
            const wrapper = shallowMount(BField, { propsData: { groupMultiline: true } })
            expect(wrapper.find('.field').classes()).toContain('is-grouped-multiline')
        })
    })

    describe('Passing a message prop', () => {
        const generateMountOptions = ({message}) => {
            return {
                propsData: {message},
                localVue,
                slots: {
                    default: [BInput, '<button class="button">Button</button>']
                }
            }
        }

        it('adds a help <p> element in the root div.field when "message" prop is passed', () => {
            const message = 'Some string message'
            const mountOptions = generateMountOptions({message})
            const wrapper = shallowMount(BField, mountOptions)
            expect(wrapper.find('.field').find('p.help').text()).toEqual(message)
        })

        it('given an array of string as message, it joins the messages with line breaks', () => {
            const message = [
                'Some string message 1',
                'Some string message 2',
                'Some string message 3',
                'Some string message 4',
                'Some string message 5'
            ]
            const mountOptions = generateMountOptions({message})
            const wrapper = shallowMount(BField, mountOptions)
            expect(wrapper.find('p.help').html()).toContain(message.join(' <br> '))
        })

        it('given an object as message, it grabs the keys and joins them with line breaks', () => {
            const message = {
                message1: 'Some string message 1',
                message2: 'Some string message 2',
                message3: 'Some string message 3',
                message4: 'Some string message 4',
                message5: 'Some string message 5'
            }
            const mountOptions = generateMountOptions({message})
            const wrapper = shallowMount(BField, mountOptions)
            expect(wrapper.find('p.help').html()).toContain(Object.keys(message).join(' <br> '))
        })

        it(`given an array of string with an object as one of the elements as message, it grabs the
        keys of the object and joins them with the messages with line breaks`, () => {
            const message = [
                'Some string message 1',
                {
                    message2: 'Some string message 2',
                    message3: 'Some string message 3'
                },
                'Some string message 4',
                'Some string message 5'
            ]
            const mountOptions = generateMountOptions({message})
            const wrapper = shallowMount(BField, mountOptions)
            expect(wrapper.find('p.help').html()).toContain([
                message[0],
                'message2',
                'message3',
                message[2],
                message[3]
            ].join(' <br> '))
        })
    })

    describe('Passing true for grouped prop', () => {
        const mountOptions = {
            propsData: {
                grouped: true
            },
            localVue,
            slots: {
                default: [BInput, '<button class="button">Button</button>']
            }
        }

        it('groups the children together', () => {
            const wrapper = shallowMount(BField, mountOptions)
            expect(wrapper.find('.field').classes()).toContain('is-grouped')
        })

        it('appends the classname with value of position when "position" prop is passed', () => {
            const {propsData} = mountOptions
            const wrapper = shallowMount(BField, {
                ...mountOptions,
                propsData: {
                    ...propsData,
                    position: 'is-centered'
                }
            })
            expect(wrapper.find('.field').classes()).toContain('is-grouped')
            expect(wrapper.find('.field').classes()).toContain('is-grouped-centered')
        })

        it('adds a label element under the root div.field when "label" prop is passed', () => {
            const {propsData} = mountOptions
            const wrapper = shallowMount(BField, {
                ...mountOptions,
                propsData: {
                    ...propsData,
                    label: 'Some label'
                }
            })
            expect(wrapper.find('.field').find('label').isVisible()).toBe(true)
        })
    })

    describe('Passing true for horizontal prop', () => {
        const generateMountOptions = (props) => {
            return {
                propsData: {
                    horizontal: true,
                    ...props
                },
                localVue,
                slots: {
                    default: BField
                }
            }
        }

        it('adds "is-horizontal" to root div.field', () => {
            const mountOptions = generateMountOptions()
            const wrapper = shallowMount(BField, mountOptions)
            expect(wrapper.find('.field').classes()).toContain('is-horizontal')
        })

        it('produces a div.field-label + .field-body', () => {
            const mountOptions = generateMountOptions()
            const wrapper = mount(BField, mountOptions)
            expect(wrapper.find('.field').find('.field-label').isVisible()).toBe(true)
            expect(wrapper.find('.field').find('.field-label + .field-body').isVisible()).toBe(true)
        })

        it('adds a label element under .field-label when "label" prop is passed', () => {
            const mountOptions = generateMountOptions({label: 'Some label'})
            const wrapper = mount(BField, mountOptions)
            expect(wrapper.find('.field-label').find('label.label').isVisible()).toBe(true)
        })

        it('adds a help <p> element in the div.field-body when "message" prop is passed', () => {
            const message = 'Some message'
            const mountOptions = generateMountOptions({message})
            const wrapper = mount(BField, mountOptions)
            const helpWrapper = wrapper.find('.field').find('.field-body').find('.help')
            expect(helpWrapper.isVisible()).toBe(true)
            expect(helpWrapper.text()).toEqual(message)
        })
    })
})
