import { shallowMount } from '@vue/test-utils'
import BPaginationButton from '@components/pagination/PaginationButton'

let wrapper
let page = 5
let defaultProps = {
    page: {
        number: page,
        isCurrent: false,
        click: jest.fn(),
        disabled: false,
        class: '',
        'aria-label': ''
    }
}

describe('BPagination', () => {
    beforeEach(() => {
        wrapper = shallowMount(BPaginationButton, {
            propsData: defaultProps
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BPaginationButton')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('returns href as expected', () => {
        expect(wrapper.vm.href).toBe('#')

        wrapper.setProps({ tag: 'button' })
        expect(wrapper.vm.href).toBeUndefined()
    })
})
