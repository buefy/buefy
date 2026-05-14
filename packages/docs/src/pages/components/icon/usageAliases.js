// Override specific icon aliases to use @fortawesome/vue-fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheck, faChevronLeft, faChevronRight)

import Buefy from 'buefy'
Vue.use(Buefy, {
    iconAliases: {
        check: {
            type: 'component',
            component: FontAwesomeIcon,
            icon: ['fas', 'check']
        },
        chevronLeft: {
            type: 'component',
            component: FontAwesomeIcon,
            icon: ['fas', 'chevron-left']
        },
        chevronRight: {
            type: 'component',
            component: FontAwesomeIcon,
            icon: ['fas', 'chevron-right']
        }
    }
})
