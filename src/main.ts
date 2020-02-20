import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'
import '@/styles/main.sass'
import vButton from '@/components/common/v-button.vue'

Vue.component('v-icon', Icon)
Vue.component('v-button', vButton)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
