import { mount } from '@vue/test-utils'
import BSkeleton from '@components/skeleton/Skeleton'

let wrapper

describe('BSkeleton', () => {
    beforeEach(() => {
        wrapper = mount(BSkeleton)
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
