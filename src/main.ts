import Vue from 'vue';
import App from './app';

// 插件
import './plugins/composition-api';
import './plugins/router';
import './components/index';
import './plugins/appLoading';

// 路由
import router from './router/index';

export default new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
