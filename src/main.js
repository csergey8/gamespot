import Vue from 'vue'
import App from './App.vue'
import router from './routes';

import Button from './components/UI/button.vue';

Vue.component('app-button', Button);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')