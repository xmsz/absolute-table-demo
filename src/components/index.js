import Vue from 'vue';
import $Dialog from './Dialog/index';
import $Toast from './Toast/index';

const baseComps = {
  // BasePopPage: () => import(/* webpackChunkName: "comp_base_pop_vendor" */ './PopPage/index'),
  // // eslint-disable-next-line
  // BasePopBottom: () => {
  //   return import(/* webpackChunkName: "comp_base_pop_vendor" */ './PopBottom/index.vue');
  // },
  // // eslint-disable-next-line
  // BasePopNormal: () => {
  //   return import(/* webpackChunkName: "comp_base_pop_vendor" */ './PopNormal/index.vue');
  // },
  // BaseQrcode: () => import(/* webpackChunkName: "comp_base_pop_vendor" */ './Qrcode/index.vue'),
  // BaseButton: () => import(/* webpackChunkName: "comp_base" */ './Button/index'),
  // BaseIcon: () => import(/* webpackChunkName: "comp_base" */ './Icon/index'),
};

const baseCompsServices = {
  $Dialog,
  $Toast,
};

function install(vue) {
  // STEP: 注册全局组件
  Object.keys(baseComps).forEach((key, index) => vue.component(key, baseComps[key]));

  // STEP: 直接调用法
  Object.keys(baseCompsServices).forEach(key => {
    // eslint-disable-next-line
    vue.prototype[key] = baseCompsServices[key];
  });
}

Vue.use(install);

export default install;
