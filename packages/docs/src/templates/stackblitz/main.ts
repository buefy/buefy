import { createApp } from 'vue'

// Import Buefy
import Buefy from 'buefy'

// Import ICON Librarys
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.min.css'

// Import Buefy Styles
import 'buefy/dist/buefy.css'
import App from './App.vue'

const app = createApp(App)
app.use(Buefy)
app.mount('#app')
