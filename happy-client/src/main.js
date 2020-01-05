import Vue from 'vue';
import Main from './main.vue';
import router from './router';
import './style/main.less';

new Vue({
  router,
  render: h => h(Main),
}).$mount('#app');
