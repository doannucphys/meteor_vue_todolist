import { Meteor } from 'meteor/meteor'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import { VuexAltPlugin } from 'vuex-alt'

import VueMeteorTracker from 'vue-meteor-tracker'
Vue.use(VueMeteorTracker)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Vuex from 'vuex'
Vue.use(Vuex)

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'
Vue.use(BootstrapVue);

import { Plugin } from 'vue-fragment'
Vue.use(Plugin)

import Toasted from 'vue-toasted';
Vue.use(Toasted, {position:'top-center', duration: 3000, theme: 'outline', fullWidth: ((screen.width < 768) ? true : false) });


import { createRouter as createRouterOriginal } from '/src/imports/modules/router/router.js'
import { createStore as createStoreOriginal } from '/src/imports/modules/store/store.js'

import App from './App.vue'

export const setupVue = ({
    createStore = createStoreOriginal,
    createRouter = createRouterOriginal
} = {}) => {
  const store = createStore()
  const router = createRouter();

  Vue.use(VuexAltPlugin, { store });
  sync(store, router)
  return { store, router}
}

setTimeout(function() {
  Meteor.startup(() => {
    const {store, router} = setupVue()
    const appInstance = new Vue({
      render: h => h(App),
      router,
      store
    })
    appInstance.$mount('#app')
  })
}, 100)
  