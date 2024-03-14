import { shallowMount, mount } from '@vue/test-utils'
import BField from '@components/field/Field'
import BFieldBody from '@components/field/FieldBody'
import BInput from '@components/input/Input'

const components = {
    'b-field': BField,
    'b-field-body': BFieldBody,
    'b-input': BInput
}

describe('BField', () => {
    it('is called', () => {
        const wrapper = shallowMount(BField)
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BField')
    })

    it('render correctly', () => {
        const wrapper = shallowMount(BField)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('sets fieldLabelSize to "is-normal" when horizontal==true and input elements are inside', () => {
        const wrapper = mount(BField, {
            props: { horizontal: true },
            slots: { default: [BInput] },
            global: {
                components
            }
        })

        expect(wrapper.vm.$data).toEqual(expect.objectContaining({ fieldLabelSize: 'is-normal' }))
    })

    it('sets input class with type value when prop "type" is changed dynamically', async () => {
        const type = 'is-danger'
        const wrapper = mount(BField, {
            slots: { default: [BInput] },
            global: {
                components
            }
        })
        await wrapper.setProps({ type })
        expect(wrapper.find('.input').classes()).toContain(type)
    })

    describe('class names for the root div.field', () => {
        it('contains "is-expanded" when prop "expanded" is set', () => {
            const wrapper = shallowMount(BField, { props: { expanded: true } })
            expect(wrapper.find('.field').classes()).toContain('is-expanded')
        })
    })

    describe('Passing a message prop', () => {
        const generateMountOptions = ({ message, slot }) => {
            return {
                props: { message },
                slots: {
                    default: [BInput, '<button class="button">Button</button>'],
                    ...(slot ? { message: slot } : {})
                },
                global: {
                    components
                }
            }
        }

        it('adds a help <p> element in the root div.field when "message" prop is passed', () => {
            const message = 'Some string message'
            const mountOptions = generateMountOptions({ message })
            const wrapper = shallowMount(BField, mountOptions)
            expect(wrapper.find('.field').find('p.help').text()).toEqual(message)
        })

        it('changes the <p> element content in the root div.field when "message" prop is changed dynamically', async () => {
            const message = 'Some string message'
            const mountOptions = generateMountOptions({ message: 'initial message' })
            const wrapper = shallowMount(BField, mountOptions)
            await wrapper.setProps({ message })
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
            const mountOptions = generateMountOptions({ message })
            const wrapper = shallowMount(BField, mountOptions)
            expect(wrapper.find('p.help').html().split('<br>').length).toEqual(message.length)
        })

        it('given an object as message, it grabs the keys and joins them with line breaks', () => {
            const message = {
                message1: 'Some string message 1',
                message2: 'Some string message 2',
                message3: 'Some string message 3',
                message4: 'Some string message 4',
                message5: 'Some string message 5'
            }
            const mountOptions = generateMountOptions({ message })
            const wrapper = shallowMount(BField, mountOptions)
            expect(wrapper.find('p.help').html().split('<br>').length).toEqual(Object.keys(message).length)
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
            const mountOptions = generateMountOptions({ message })
            const wrapper = shallowMount(BField, mountOptions)
            expect(wrapper.find('p.help').html().split('<br>').length).toEqual(5)
        })

        it('messages are passed down to the message slot', () => {
            const message = 'Some string message'
            const slot = '<template #message="{ messages }">{{ messages.join("") }}</template>'
            const mountOptions = generateMountOptions({ message, slot })
            const wrapper = shallowMount(BField, mountOptions)
            expect(wrapper.find('p.help').text()).toEqual(message)
        })
    })

    describe('managing groups', () => {
        const mountOptions = {
            props: {
                grouped: true
            },
            slots: {
                default: [BInput, '<button class="button">Button</button>']
            },
            global: {
                components
            }
        }

        it('groups the children together in an inner field', () => {
            const wrapper = mount(BField, mountOptions)
            const innerField = wrapper.find('.field-body').find('.field')
            expect(innerField.classes()).toContain('is-grouped')
        })

        it('appends the classname with value of position when "position" prop is passed', () => {
            const { props } = mountOptions
            const wrapper = mount(BField, {
                ...mountOptions,
                props: {
                    ...props,
                    position: 'is-centered'
                }
            })
            const innerField = wrapper.find('.field-body').find('.field')
            expect(innerField.classes()).toContain('is-grouped')
            expect(innerField.classes()).toContain('is-grouped-centered')
        })

        it('contains "is-grouped-multiline" when prop "groupMultiline" is set', () => {
            const { props } = mountOptions
            const wrapper = mount(BField, {
                ...mountOptions,
                props: {
                    ...props,
                    groupMultiline: true
                }
            })
            const innerField = wrapper.find('.field-body').find('.field')
            expect(innerField.classes()).toContain('is-grouped-multiline')
        })

        it('adds a label element under the root div.field when "label" prop is passed', () => {
            const { props } = mountOptions
            const wrapper = shallowMount(BField, {
                ...mountOptions,
                props: {
                    ...props,
                    label: 'Some label'
                }
            })
            expect(wrapper.find('.field').find('label').isVisible()).toBe(true)
        })

        it('should reflect validation status of wrapped input unless type is specified', async () => {
            const wrapper = mount(BField, mountOptions)
            const input = wrapper.findComponent(BInput)

            input.vm.setInvalid()
            await wrapper.vm.$nextTick()
            await wrapper.vm.$nextTick() // setInvalid takes effect on the first $nextTick
            expect(wrapper.vm.newType).toBe('is-danger')

            input.vm.setValidity(null, null)
            await wrapper.vm.$nextTick()
            await wrapper.vm.$nextTick() // setValidity takes effect on the first $nextTick
            expect(wrapper.vm.newType).toBeFalsy()

            await wrapper.setProps({ type: 'is-warning' })

            input.vm.setInvalid()
            await wrapper.vm.$nextTick()
            await wrapper.vm.$nextTick() // setInvalid takes effect on the first $nextTick
            expect(wrapper.vm.newType).toBe('is-warning')

            input.vm.setValidity(null, null)
            await wrapper.vm.$nextTick()
            await wrapper.vm.$nextTick() // setValidity takes effect on the first $nextTick
            expect(wrapper.vm.newType).toBe('is-warning')
        })
    })

    describe('Passing true for horizontal prop', () => {
        const generateMountOptions = (props) => {
            return {
                props: {
                    horizontal: true,
                    ...props
                },
                slots: {
                    default: BField
                },
                global: {
                    components
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
            const mountOptions = generateMountOptions({ label: 'Some label' })
            const wrapper = mount(BField, mountOptions)
            expect(wrapper.find('.field-label').find('label.label').isVisible()).toBe(true)
        })

        it('adds a help <p> element in the div.field-body when "message" prop is passed', () => {
            const message = 'Some message'
            const mountOptions = generateMountOptions({ message })
            const wrapper = mount(BField, mountOptions)
            const helpWrapper = wrapper.find('.field').find('.field-body').find('.help')
            expect(helpWrapper.isVisible()).toBe(true)
            expect(helpWrapper.text()).toEqual(message)
        })
    })

    describe('with grouped and horizontal true', () => {
        let wrapper

        beforeEach(() => {
            wrapper = mount(BField, {
                props: {
                    grouped: true,
                    horizontal: true
                },
                slots: {
                    default: [BInput, BInput]
                },
                global: {
                    components
                }
            })
        })

        it('should wrap each child in a field under a field-body', () => {
            const body = wrapper.findComponent(BFieldBody)
            expect(body.exists()).toBe(true)
            const childFields = body.findAllComponents(BField)
            expect(childFields.length).toBe(2)
            expect(childFields[0].findComponent(BInput).exists()).toBe(true)
            expect(childFields[1].findComponent(BInput).exists()).toBe(true)
        })

        describe('when validation fails', () => {
            let childFields

            beforeEach(async () => {
                await wrapper.setData({
                    newType: 'is-danger',
                    newMessage: 'error message'
                })
                const body = wrapper.findComponent(BFieldBody)
                childFields = body.findAllComponents(BField)
            })

            it('should set message only to the first child field', () => {
                expect(childFields[0].props('message')).toEqual(['error message'])
                expect(childFields[1].props('message')).toBeUndefined()
            })

            it('should set type to all the child fields', () => {
                expect(childFields[0].props('type')).toBe('is-danger')
                expect(childFields[1].props('type')).toBe('is-danger')
            })
        })
    })
})
