import Vue from 'vue'
import Dashboard from './views/Dashboard.vue'

import "@fortawesome/fontawesome-free/css/all.min.css";

Vue.config.productionTip = false

const routes = {
  '/dashboard': Dashboard
}

new Vue({
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || Dashboard
    }
  },
  render (h) { return h(this.ViewComponent) },
}).$mount('#app')
