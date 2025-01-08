import { defineComponent } from 'vue'
import type { ComponentPublicInstance } from 'vue'

/* eslint-disable @typescript-eslint/ban-types */
export type IMenuItem = ComponentPublicInstance<
    {}, // P(rops)
    {}, // B (raw bindings)
    {
        _isMenu?: boolean,
        menuItems: IMenuItem[],
        newExpanded: boolean,
        newActive: boolean
    },
    {}, // C(omputed)
    {
        appendMenuItem: (item: IMenuItem) => void,
        removeMenuItem: (item: IMenuItem) => void
    }, // M(ethods)
    {
        'update:modelValue': (_isActive: boolean) => boolean,
        'update:expanded': (_isExpanded: boolean) => boolean
    } // E(mits)
> & {
    // injected field
    parent?: unknown
}

export type MenuItemContainer = Omit<ComponentPublicInstance<
    {}, // P(rops)
    {}, // B (raw bindings)
    {
        _isMenu?: boolean,
        menuItems: IMenuItem[]
    }, // D(ata)
    {}, // C(omputed)
    {
        appendMenuItem: (item: IMenuItem) => void,
        removeMenuItem: (item: IMenuItem) => void
    }, // M(ethods)
    {} // E(mits). note that this ends up with the following $emit signature:
       //   $emit(event: string, ...args: any[])
       // we have to omit $emit to make IMenuItem a subtype of MenuItemContainer
       // this may not be intuitive, but here contravariance comes into play
>, '$emit'> & {
    // injected field
    parent?: unknown
}
/* eslint-enable @typescript-eslint/ban-types */

export default defineComponent({
    provide() {
        return {
            BMenuItemContainer: this
        }
    },
    data() {
        return {
            menuItems: [] as IMenuItem[]
        }
    },
    methods: {
        appendMenuItem(item: IMenuItem) {
            this.menuItems.push(item)
        },
        removeMenuItem(item: IMenuItem) {
            const index = this.menuItems.indexOf(item)
            if (index !== -1) {
                this.menuItems.splice(index, 1)
            }
        }
    }
})
