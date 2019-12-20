import Vue from 'vue'
import Profile from './views/Profile.vue'

import "@fortawesome/fontawesome-free/css/all.min.css";

Vue.config.productionTip = false

const routes = {
  '/profile': Profile
}

new Vue({
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || Profile
    }
  },
  render (h) { return h(this.ViewComponent) },
}).$mount('#app')
