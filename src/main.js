import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import svgIcon from '@/components/Svgicon'

import "@/styles/index.scss"

const app = createApp(App)

//element
import installElementPlus from './plugs/element'
installElementPlus(app)

app.component('svg-icon', svgIcon)
app.use(router)
app.mount('#app')

