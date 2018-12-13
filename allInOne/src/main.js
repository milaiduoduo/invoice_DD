import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

//custom plugins
import m_axiosRequest from '@/utils/axiosRequest';
import m_message from '@/utils/message.js';
import m_storage from '@/utils/storage.js';

Vue.use(m_axiosRequest);
Vue.use(m_message);
Vue.use(m_storage);

Vue.use(ElementUI, {
  locale
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
