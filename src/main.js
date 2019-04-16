import Vue from 'vue'
import App from './App.vue'
import router from './routes';

import { MdCard } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';

import Button from './components/UI/button.vue';

Vue.component('app-button', Button);

Vue.use(MdCard);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
