import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import router from './routes';
import store from './components/Store/store';

import { MdCard } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';

import Button from './components/UI/button.vue';

Vue.component('app-button', Button);

Vue.use(VueResource);
Vue.http.options.root = "";

Vue.use(MdCard);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
