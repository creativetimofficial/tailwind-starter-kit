import Vue from 'vue'
import Login from './views/Login.vue'

import "@fortawesome/fontawesome-free/css/all.min.css";

Vue.config.productionTip = false

const routes = {
  '/login': Login
}

new Vue({
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || Login
    }
  },
  render (h) { return h(this.ViewComponent) },
}).$mount('#app')
