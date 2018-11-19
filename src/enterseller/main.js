import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'mint-ui/lib/style.css'
Vue.config.productionTip = false

import { InfiniteScroll } from 'mint-ui'

Vue.use(InfiniteScroll)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
