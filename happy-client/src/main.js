import Vue from 'vue';
import MuseUI from 'muse-ui';
import Loading from 'muse-ui-loading';
import VueLazyload from 'vue-lazyload';
import Main from './main.vue';
import router from './router';
import LoadingImg from './assets/loading.png';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import './style/main.less';

Vue.use(MuseUI);
Vue.use(Loading, {
  overlayColor: 'rgba(0,0,0,.6)',
});
Vue.use(VueLazyload, {
  loading: LoadingImg,
});

new Vue({
  router,
  render: h => h(Main),
}).$mount('#app');
