import { createApp } from 'vue'

// Import Buefy
import Buefy from 'buefy'


// Import Buefy Styles
import './styles/buefy.scss'

// Import ICON Librarys
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.min.css'


// Import ICON Librarys
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.min.css'

import App from './App.vue'

const app = createApp(App)
app.use(Buefy)
app.mount('#app')
