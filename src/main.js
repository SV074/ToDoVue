import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import components from './components/UI'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(ElementPlus)
app.mount('#app')
