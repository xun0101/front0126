import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/axios.js'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/style.scss'
// import 'swiper/swiper-bundle.css'
import 'swiper/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLine } from '@fortawesome/free-brands-svg-icons'
import mixin from './mixin.js'

library.add(faLine, faCartPlus)
Vue.mixin(mixin)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueAwesomeSwiper)
Vue.use(VueSweetalert2)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
