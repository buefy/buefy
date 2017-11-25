import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import TheSidebar from '@/components/TheSidebar'

export default {
    components: {
        TheHeader,
        TheFooter,
        TheSidebar
    },
    data() {
        return {
            menu: null
        }
    },
    beforeRouteUpdate(to, from, next) {
        document.documentElement.scrollTop = 0
        this.$refs.header.closeMenu()
        next()
    },
    beforeRouteLeave(to, from, next) {
        document.documentElement.scrollTop = 0
        this.$refs.header.closeMenu()
        next()
    },
    beforeRouteEnter(to, from, next) {
        document.documentElement.scrollTop = 0
        next((vm) => {
            vm.$refs.header.closeMenu()
        })
    },
    mounted() {
        this.menu = this.$refs.header[this.menuName]
    }
}
