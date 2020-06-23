export default (parentItemName, needsSorted = true) => {
    const mixin = {
        inject: {parent: {from: 'b' + parentItemName, default: false}},
        created() {
            if (!this.parent) {
                this.$destroy()
                throw new Error('You should wrap ' + this.$options.name + ' in a b' + parentItemName + 's')
            } else if (this.parent._registerItem) {
                this.parent._registerItem(this)
            }
        },
        beforeDestroy() {
            if (this.parent && this.parent._unregisterItem) {
                this.parent._unregisterItem(this)
            }
        }
    }
    if (needsSorted) {
        mixin.data = () => {
            return {
                index: null
            }
        }
    }
    return mixin
}
