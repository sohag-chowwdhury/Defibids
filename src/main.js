// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf
// with an alias. Loading occurs via babel; set in webpack.base.conf.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import wysiwyg from 'vue-wysiwyg'
Vue.use(wysiwyg, {
  hideModules: { 'image': true, 'code': true, 'table': true, 'separator': true, 'justifyLeft': true, 'justifyCenter': true, 'justifyRight': true, 'headings': true }
}) // config is optional. more below

Vue.use(BootstrapVue)

import AOS from 'aos'
import 'aos/dist/aos.css'

import VueSocialSharing from 'vue-social-sharing'

Vue.use(VueSocialSharing)

import VueCountdown from '@chenfengyuan/vue-countdown'

Vue.component(VueCountdown.name, VueCountdown)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  created () {
    AOS.init()
  },
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
